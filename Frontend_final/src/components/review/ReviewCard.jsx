import React from "react";
import Avatar from "../ui/avatar";
import RatingStars from "../movie/RatingStars";
import SpoilerTag from "./SpoilerTag";
import HelpfulVote from "./HelpfulVote";

const ReviewCard = ({ review }) => {
  const { authorName, authorProfile, dateString, rating, text, isSpoiler, helpfulCount } = review;

  return (
    <div className="p-6 bg-card border border-border/40 rounded-card space-y-4 font-sans text-left shadow-sm">
      {/* Reviewer Header info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar
            src={authorProfile}
            alt={authorName}
            fallback={authorName ? authorName[0] : "?"}
            className="w-10 h-10"
          />
          <div className="min-w-0">
            <h4 className="font-semibold text-sm text-foreground truncate">
              {authorName || "Anonymous Moviegoer"}
            </h4>
            <span className="text-[10px] text-muted-foreground block mt-0.5">
              {dateString}
            </span>
          </div>
        </div>

        {/* User Rating */}
        {rating && <RatingStars rating={rating} />}
      </div>

      {/* Review Body */}
      <div className="text-sm leading-relaxed text-foreground/90">
        {isSpoiler ? (
          <SpoilerTag>{text}</SpoilerTag>
        ) : (
          <p className="whitespace-pre-line">{text}</p>
        )}
      </div>

      {/* Footer Voting */}
      <div className="pt-3 border-t border-border/10 flex items-center justify-between">
        <HelpfulVote initialCount={helpfulCount} />
      </div>
    </div>
  );
};

export default ReviewCard;
export { ReviewCard };
