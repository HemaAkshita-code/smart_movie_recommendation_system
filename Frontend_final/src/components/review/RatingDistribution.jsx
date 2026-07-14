import React from "react";

const RatingDistribution = ({ distribution }) => {
  const defaultDistribution = {
    5: 120,
    4: 85,
    3: 42,
    2: 12,
    1: 4,
  };

  const data = distribution || defaultDistribution;
  const total = Object.values(data).reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="p-6 bg-card border border-border/40 rounded-card space-y-3 font-sans text-left shadow-sm">
      <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
        Rating Distribution
      </h4>
      <div className="space-y-2.5">
        {[5, 4, 3, 2, 1].map((stars) => {
          const count = data[stars] || 0;
          const percentage = total > 0 ? (count / total) * 100 : 0;
          return (
            <div key={stars} className="flex items-center gap-3 text-xs">
              <span className="w-12 font-medium text-foreground">{stars} Stars</span>
              {/* Bar track */}
              <div className="flex-grow h-2 bg-muted rounded-full overflow-hidden">
                <div
                  style={{ width: `${percentage}%` }}
                  className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                />
              </div>
              <span className="w-8 text-right text-muted-foreground font-semibold">
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RatingDistribution;
export { RatingDistribution };
