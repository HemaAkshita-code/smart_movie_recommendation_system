import React from "react";
import { Link } from "react-router-dom";
import Card, { CardHeader, CardTitle, CardContent } from "../ui/card";
import EmptyState from "../common/EmptyState";
import { Bookmark, ArrowRight } from "lucide-react";

const WatchlistPreview = ({ watchlistItems = [] }) => {
  const defaultItems = [
    { id: 1, title: "Her", releaseYear: 2013, posterPath: null },
    { id: 2, title: "Blade Runner 2049", releaseYear: 2017, posterPath: null },
    { id: 3, title: "Arrival", releaseYear: 2016, posterPath: null },
  ];

  const items = watchlistItems.length > 0 ? watchlistItems : defaultItems;
  const completedCount = 4;
  const totalCount = items.length + completedCount;
  const completionPercentage = (completedCount / totalCount) * 100;

  return (
    <Card className="border-border/40 h-full font-sans text-left shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border/10 pb-4">
        <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-1.5">
          <Bookmark className="w-4 h-4 text-primary" />
          Watchlist Preview
        </CardTitle>
        <Link
          to="/watchlist"
          className="text-xs text-primary hover:underline font-semibold flex items-center gap-1"
        >
          View All
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {items.length > 0 ? (
          <div className="space-y-6">
            {/* Progress tracker */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-foreground">
                <span>Queue Progress</span>
                <span className="text-muted-foreground">
                  {completedCount} of {totalCount} Watched
                </span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  style={{ width: `${completionPercentage}%` }}
                  className="h-full bg-secondary rounded-full"
                />
              </div>
            </div>

            {/* Recently added items list */}
            <div className="space-y-3.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
                Recently Added
              </span>
              <div className="divide-y divide-border/10">
                {items.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <span className="font-semibold text-xs text-foreground truncate block">
                        {item.title}
                      </span>
                      <span className="text-[9px] text-muted-foreground block mt-0.5">
                        {item.releaseYear}
                      </span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                      Pending
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <EmptyState
            icon={Bookmark}
            title="Your watchlist is waiting."
            description="Start discovering films you'll never forget."
            actionText="Browse Discover"
            onAction={() => {}}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default WatchlistPreview;
export { WatchlistPreview };
