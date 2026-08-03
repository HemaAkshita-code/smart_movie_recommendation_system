import React, { useState } from "react";
import Button from "../ui/button";
import Textarea from "../ui/textarea";
import Switch from "../ui/switch";
import { Star } from "lucide-react";

const ReviewEditor = ({ onSubmit, onCancel, submitLabel = "Submit Review" }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [isSpoiler, setIsSpoiler] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a star rating first.");
      return;
    }
    if (!text.trim()) {
      alert("Please write a short review text.");
      return;
    }
    if (onSubmit) {
      onSubmit({ rating, text, isSpoiler });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-card border border-border/40 rounded-card space-y-6 text-left shadow-sm font-sans"
    >
      <h3 className="font-heading font-semibold text-base text-foreground">
        Write a Review
      </h3>

      {/* Star Selector */}
      <div className="space-y-2">
        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest block">
          Your Rating
        </span>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 rounded-full hover:bg-muted/40 transition-colors focus:outline-none"
              aria-label={`Rate ${star} stars`}
            >
              <Star
                className={`w-6 h-6 transition-colors ${
                  star <= (hoverRating || rating)
                    ? "text-primary fill-current"
                    : "text-muted-foreground/35"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Textarea */}
      <div className="space-y-2">
        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest block">
          Review Content
        </span>
        <Textarea
          placeholder="Share your thoughts about this movie..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
        />
      </div>

      {/* Spoiler toggle */}
      <div className="flex items-center justify-between py-2 border-y border-border/10">
        <div className="space-y-0.5">
          <span className="text-sm font-semibold text-foreground">
            Contains Spoilers
          </span>
          <p className="text-xs text-muted-foreground">
            Hide this review under a spoiler cover tag by default.
          </p>
        </div>
        <Switch checked={isSpoiler} onChange={setIsSpoiler} />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-2">
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button variant="primary" type="submit">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default ReviewEditor;
export { ReviewEditor };
