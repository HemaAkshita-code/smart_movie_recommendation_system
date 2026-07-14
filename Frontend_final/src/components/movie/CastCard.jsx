import React from "react";
import Avatar from "../ui/avatar";

const CastCard = ({ cast }) => {
  const { name, character, profilePath } = cast;

  return (
    <div className="flex items-center gap-3 p-3 bg-card border border-border/40 rounded-card select-none">
      <Avatar
        src={profilePath}
        alt={name}
        fallback={name ? name[0] : "?"}
        className="w-10 h-10 flex-shrink-0"
      />
      <div className="text-left font-sans min-w-0">
        <h4 className="font-semibold text-sm text-foreground truncate">{name}</h4>
        <p className="text-[11px] text-muted-foreground truncate mt-0.5">
          as {character}
        </p>
      </div>
    </div>
  );
};

export default CastCard;
export { CastCard };
