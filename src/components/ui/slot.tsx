import * as React from "react";

/**
 * Minimal `asChild` Slot: merges the parent's props/className onto its single
 * child element instead of rendering a wrapper. Enough for our Button/Link use.
 */
export const Slot = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  function Slot({ children, ...props }, ref) {
    if (!React.isValidElement(children)) return null;
    const child = children as React.ReactElement<Record<string, unknown>>;
    const childProps = child.props;

    return React.cloneElement(child, {
      ...props,
      ...childProps,
      className: [
        (props as { className?: string }).className,
        (childProps as { className?: string }).className,
      ]
        .filter(Boolean)
        .join(" "),
      ref,
    } as Record<string, unknown>);
  }
);
