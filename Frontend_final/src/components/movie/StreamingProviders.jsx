import React from "react";
import Card, { CardContent } from "../ui/card";
import { Play } from "lucide-react";

const StreamingProviders = ({ providers = [] }) => {
  const defaultProviders = ["Netflix", "Prime Video", "Disney+", "Apple TV+", "Max", "Hulu"];
  const list = providers.length > 0 ? providers : defaultProviders;

  return (
    <div className="space-y-4 font-sans select-none text-left">
      <h3 className="font-heading font-semibold text-sm tracking-widest uppercase text-muted-foreground/60 px-1">
        Streaming Availability
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {list.map((plat) => (
          <Card key={plat} className="border-border/40 hover:border-primary/40 hover:bg-primary/5 transition-all select-none">
            <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
              {/* Mock Branded Stream Icon */}
              <div className="w-10 h-10 rounded-full bg-muted/60 flex items-center justify-center text-primary font-bold text-xs border border-border/25">
                <Play className="w-4.5 h-4.5 fill-current" />
              </div>
              <span className="text-[10px] font-bold text-foreground">
                {plat}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StreamingProviders;
export { StreamingProviders };
