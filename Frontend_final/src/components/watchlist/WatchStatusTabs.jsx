import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

const WatchStatusTabs = ({ activeTab, onTabChange }) => {
  return (
    <Tabs defaultValue={activeTab} className="w-full">
      <TabsList className="w-full max-w-md justify-start bg-muted/60">
        <TabsTrigger
          value="all"
          onClick={() => onTabChange && onTabChange("all")}
          className="text-xs"
        >
          All
        </TabsTrigger>
        <TabsTrigger
          value="want to watch"
          onClick={() => onTabChange && onTabChange("want to watch")}
          className="text-xs"
        >
          Want to Watch
        </TabsTrigger>
        <TabsTrigger
          value="watching"
          onClick={() => onTabChange && onTabChange("watching")}
          className="text-xs"
        >
          Watching
        </TabsTrigger>
        <TabsTrigger
          value="completed"
          onClick={() => onTabChange && onTabChange("completed")}
          className="text-xs"
        >
          Completed
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default WatchStatusTabs;
export { WatchStatusTabs };
