import React, { useEffect, useRef } from "react";
import Spinner from "../ui/spinner";

const InfiniteScroll = ({ hasMore, onLoadMore, isLoading }) => {
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, onLoadMore, isLoading]);

  return (
    <div className="w-full flex items-center justify-center p-4">
      {hasMore && (
        <div ref={triggerRef} className="h-10">
          {isLoading && <Spinner className="w-6 h-6 text-primary" />}
        </div>
      )}
    </div>
  );
};

export default InfiniteScroll;
export { InfiniteScroll };
