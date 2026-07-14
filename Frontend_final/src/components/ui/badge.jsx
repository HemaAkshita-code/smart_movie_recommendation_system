import React from "react";
import { cn } from "../../utils/helpers";

const Badge = ({ className, variant = "primary", ...props }) => {
  const baseStyles =
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold select-none border tracking-wide transition-colors";

  const variants = {
    primary: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-secondary/10 text-secondary border-secondary/20",
    success: "bg-secondary/10 text-secondary border-secondary/20",
    accent: "bg-accent/10 text-accent border-accent/20",
    info: "bg-brand-blue/10 text-brand-blue border-brand-blue/20",
    destructive: "bg-destructive/10 text-destructive border-destructive/20",
  };

  return (
    <span
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    />
  );
};

export default Badge;
export { Badge };
