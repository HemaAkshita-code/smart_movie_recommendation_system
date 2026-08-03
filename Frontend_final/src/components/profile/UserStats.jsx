import React from "react";

const UserStats = ({ stats }) => {
  const defaultStats = {
    watchedCount: 142,
    reviewsCount: 38,
    watchlistCount: 14,
    hoursWatched: 284,
  };

  const data = stats || defaultStats;

  const statItems = [
    { label: "Films Watched", value: data.watchedCount },
    { label: "Reviews Written", value: data.reviewsCount },
    { label: "Watchlist Count", value: data.watchlistCount },
    { label: "Hours Logged", value: data.hoursWatched },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
      {statItems.map((item, idx) => (
        <div
          key={idx}
          className="bg-card p-6 rounded-card border border-border/40 text-center space-y-2 shadow-sm"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {item.label}
          </span>
          <div className="font-heading font-bold text-3xl text-foreground">
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserStats;
export { UserStats };
