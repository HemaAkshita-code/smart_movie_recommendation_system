import React from "react";
import TasteDNAChart from "../recommendation/TasteDNAChart";

const TasteGraph = ({ data }) => {
  return (
    <div className="bg-card p-6 rounded-card border border-border/40 space-y-4 shadow-sm text-left font-sans">
      <div className="space-y-1">
        <h3 className="font-heading font-semibold text-base text-foreground">
          Taste DNA Breakdown
        </h3>
        <p className="text-xs text-muted-foreground">
          Detailed visual mapping of your cinematic preferences.
        </p>
      </div>
      <TasteDNAChart data={data} />
    </div>
  );
};

export default TasteGraph;
export { TasteGraph };
