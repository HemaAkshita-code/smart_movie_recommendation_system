import React from "react";
import Card, { CardContent } from "../ui/card";
import Avatar from "../ui/avatar";
import CompatibilityMeter from "../recommendation/CompatibilityMeter";
import Button from "../ui/button";
import { Users, UserMinus } from "lucide-react";

const FriendCard = ({ friend, onCompare, onRemove }) => {
  if (!friend) return null;

  return (
    <Card className="border-border/40 hover:border-muted-foreground/30 transition-all font-sans select-none text-left shadow-sm">
      <CardContent className="p-5 flex flex-col justify-between h-full min-h-[160px]">
        {/* Info row */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar fallback={friend.avatar} className="w-10 h-10 bg-primary/10 border border-primary/20 text-primary font-bold text-sm" />
            <div className="min-w-0">
              <span className="font-semibold text-xs text-foreground block truncate">
                {friend.name}
              </span>
              <span className="text-[10px] text-muted-foreground block truncate mt-0.5">
                @{friend.username}
              </span>
            </div>
          </div>

          <CompatibilityMeter value={friend.compatibility} size={50} strokeWidth={4.5} />
        </div>

        {/* Shared items note */}
        <p className="text-[10px] text-muted-foreground leading-normal mt-4 line-clamp-2">
          Shared Favorites: <span className="text-foreground font-semibold">{friend.shared.join(", ")}</span>
        </p>

        {/* Actions panel */}
        <div className="flex items-center gap-2 pt-4 border-t border-border/10 mt-4">
          <Button
            variant="primary"
            size="sm"
            onClick={() => onCompare && onCompare(friend)}
            className="w-full text-[10px] h-8"
          >
            Compare Taste
          </Button>
          <button
            onClick={() => onRemove && onRemove(friend.id)}
            className="p-2 rounded-btn border border-border/40 text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-colors focus:outline-none"
            title="Remove Friend"
          >
            <UserMinus className="w-3.5 h-3.5" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FriendCard;
export { FriendCard };
