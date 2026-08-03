import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "../../utils/helpers";

const Breadcrumb = ({ items, className }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn("flex py-2", className)}>
      <ol className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground select-none">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-1.5">
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 opacity-55" />}
              {isLast ? (
                <span className="text-foreground font-semibold">{item.name}</span>
              ) : (
                <Link
                  to={item.path}
                  className="hover:text-foreground transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
export { Breadcrumb };
