import React from "react";
import Button from "../ui/button";

const EmptyState = ({
  icon: Icon,
  title = "No items found",
  description = "There is nothing to display here at the moment.",
  actionText,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 max-w-md mx-auto space-y-6">
      {/* Icon Wrapper */}
      {Icon && (
        <div className="p-4 bg-muted rounded-btn text-muted-foreground">
          <Icon className="w-8 h-8" strokeWidth={1.25} />
        </div>
      )}

      {/* Messages */}
      <div className="space-y-2">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {/* Optional CTA */}
      {actionText && onAction && (
        <Button variant="outline" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
export { EmptyState };
