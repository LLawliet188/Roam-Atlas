"use client";

/**
 * M2 — Interactive 3D globe (React Three Fiber).
 * Stylised dotted-land Earth: land masses are sampled into a point cloud from
 * Natural Earth data (fetched from /data/land-110m.json), destinations become
 * glowing pins. Drag to orbit, scroll to zoom, click a pin to open its story.
 */

import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MapPin, Star, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { geoContains } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import type { FeatureCollection, Geometry } from "geojson";
import { asset } from "@/lib/asset";
import { formatMonthYear } from "@/lib/utils";
import type { Destination } from "@/lib/types";

const R = 1.5;

function latLngToVec3(lat: number, lng: number, r: number) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

/* ------------------------------ land dots ------------------------------ */

function LandDots({ land }: { land: FeatureCollection<Geometry> | null }) {
  const positions = useMemo(() => {
    if (!land) return null;
    const pts: number[] = [];
    const step = 1.6;
    for (let lat = -58; lat <= 84; lat += step) {
      for (let lng = -180; lng < 180; lng += step) {
        if (geoContains(land, [lng, lat])) {
          const v = latLngToVec3(lat, lng, R * 1.002);
          pts.push(v.x, v.y, v.z);
        }
      }
    }
    return new Float32Array(pts);
  }, [land]);

  if (!positions) return null;
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#9db8d6"
        size={0.016}
        sizeAttenuation
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </points>
  );
}

/* --------------------------------- pins -------------------------------- */

function Pin({
  destination,
  selected,
  onSelect,
}: {
  destination: Destination;
  selected: boolean;
  onSelect: (slug: string) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const pos = useMemo(
    () => latLngToVec3(destination.coordinates.lat, destination.coordinates.lng, R * 1.01),
    [destination.coordinates.lat, destination.coordinates.lng]
  );

  useFrame(({ clock }) => {
    if (!ring.current) return;
    const t = clock.getElapsedTime();
    const s = 1 + 0.25 * (0.5 + 0.5 * Math.sin(t * 2.2 + pos.x * 5));
    ring.current.scale.setScalar(s);
    const mat = ring.current.material as THREE.MeshBasicMaterial;
    mat.opacity = selected || hovered ? 0.9 : 0.35 + 0.2 * Math.sin(t * 2.2 + pos.x * 5);
  });

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [hovered]);

  const color = destination.visited ? destination.accentColor : "#8b5cf6";
  const click = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onSelect(destination.slug);
  };

  return (
    <group ref={group} position={pos} onClick={click}>
      {/* larger invisible hit target */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[selected || hovered ? 0.032 : 0.024, 16, 16]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <mesh ref={ring} onUpdate={(m) => m.lookAt(pos.clone().multiplyScalar(2))}>
        <ringGeometry args={[0.042, 0.052, 32]} />
        <meshBasicMaterial color={color} transparent side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* -------------------------------- scene -------------------------------- */

function GlobeScene({
  destinations,
  selected,
  onSelect,
  land,
}: {
  destinations: Destination[];
  selected: string | null;
  onSelect: (slug: string) => void;
  land: FeatureCollection<Geometry> | null;
}) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 3, 5]} intensity={1.1} />
      <Stars radius={40} depth={30} count={2500} factor={3} saturation={0} fade speed={0.6} />

      {/* ocean sphere */}
      <mesh>
        <sphereGeometry args={[R, 64, 64]} />
        <meshStandardMaterial color="#0b1526" roughness={0.75} metalness={0.15} />
      </mesh>
      {/* faint atmosphere */}
      <mesh scale={1.12}>
        <sphereGeometry args={[R, 32, 32]} />
        <meshBasicMaterial color="#3f83c9" transparent opacity={0.07} side={THREE.BackSide} />
      </mesh>

      <LandDots land={land} />
      {destinations.map((d) => (
        <Pin key={d.id} destination={d} selected={selected === d.slug} onSelect={onSelect} />
      ))}

      <OrbitControls
        enablePan={false}
        minDistance={2.4}
        maxDistance={6}
        autoRotate
        autoRotateSpeed={0.55}
        enableDamping
        dampingFactor={0.08}
      />
    </>
  );
}

/* ------------------------------ experience ------------------------------ */

export function GlobeExperience({ destinations }: { destinations: Destination[] }) {
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [land, setLand] = useState<FeatureCollection<Geometry> | null>(null);

  useEffect(() => {
    setMounted(true);
    let alive = true;
    fetch(asset("/data/land-110m.json"))
      .then((r) => r.json())
      .then((topo: Topology) => {
        if (!alive) return;
        setLand(
          feature(topo, topo.objects.land) as unknown as FeatureCollection<Geometry>
        );
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const current = destinations.find((d) => d.slug === selected) ?? null;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-[#060b14]">
      <div className="h-[62svh] min-h-[460px] w-full">
        {mounted && (
          <Canvas camera={{ position: [0, 1.2, 3.4], fov: 45 }} dpr={[1, 2]}>
            <GlobeScene
              destinations={destinations}
              selected={selected}
              onSelect={(slug) => setSelected(slug)}
              land={land}
            />
          </Canvas>
        )}
      </div>

      {/* legend */}
      <div className="pointer-events-none absolute left-4 top-4 flex flex-col gap-2 text-xs text-white/70">
        <span className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-gold" /> Visited
        </span>
        <span className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-[#8b5cf6]" /> Wishlist
        </span>
      </div>
      <p className="pointer-events-none absolute bottom-4 left-4 text-xs text-white/50">
        Drag to orbit · scroll to zoom · click a pin
      </p>

      {/* selected destination card */}
      <AnimatePresence>
        {current && (
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-4 right-4 w-72 rounded-2xl border border-white/10 bg-black/70 p-4 text-white backdrop-blur-md"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setSelected(null)}
              className="absolute right-3 top-3 grid size-7 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <X className="size-4" />
            </button>
            <p className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-white/60">
              <MapPin className="size-3.5" />
              {current.country}
            </p>
            <h3 className="mt-1 text-xl font-semibold">{current.name}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-white/70">{current.tagline}</p>
            <div className="mt-2 flex items-center gap-3 text-xs text-white/60">
              {current.visited && current.visitDate ? (
                <>
                  <span className="flex items-center gap-1">
                    <Star className="size-3.5 fill-gold text-gold" />
                    {current.rating.toFixed(1)}
                  </span>
                  <span>{formatMonthYear(current.visitDate)}</span>
                </>
              ) : (
                <span>On the wishlist</span>
              )}
            </div>
            <Link
              href={`/destinations/${current.slug}`}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:underline"
            >
              Open the story
              <ArrowRight className="size-4" />
            </Link>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
