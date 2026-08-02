import React from "react";
import Card, { CardContent } from "../ui/card";
import { FolderHeart } from "lucide-react";

const CollectionCard = ({ title, description, movieCount, onClick }) => {
  return (
    <Card
      onClick={onClick}
      className="border-border/40 hover:border-primary/40 hover:shadow-elevation-1 transition-all cursor-pointer bg-card overflow-hidden h-full font-sans select-none text-left"
    >
      <CardContent className="p-6 flex flex-col justify-between h-full min-h-[160px] relative">
        {/* Background stack decoration */}
        <div className="absolute top-4 right-4 text-primary/10">
          <FolderHeart className="w-16 h-16 stroke-current" />
        </div>

        <div className="space-y-2 relative z-10">
          <h4 className="font-heading font-bold text-sm text-foreground tracking-tight">
            {title}
          </h4>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        <div className="relative z-10 pt-4 border-t border-border/10 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-primary">
          <span>Custom Collection</span>
          <span>{movieCount} Films</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CollectionCard;
export { CollectionCard };
