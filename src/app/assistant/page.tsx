import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = { title: "Travel assistant" };

export default function AssistantPage() {
  return (
    <ComingSoon
      title="AI travel assistant"
      description="A conversational companion that knows where you've been and helps plan where you go next — grounded in your own atlas."
      milestone="Milestone 5"
    />
  );
}
