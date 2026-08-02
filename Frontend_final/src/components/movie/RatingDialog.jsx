import React, { useState } from "react";
import { Star, X } from "lucide-react";
import Button from "../ui/button";

const RatingDialog = ({ isOpen, initialRating = 0, onClose, onSave }) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  if (!isOpen) return null;

  const handleSave = () => {
    if (onSave) onSave(rating);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center font-sans select-none">
      {/* Backdrop blur */}
      <div onClick={onClose} className="absolute inset-0 bg-background/60 backdrop-blur-xs transition-opacity" />

      {/* Modal box */}
      <div className="relative bg-card border border-border/40 rounded-btn p-6 w-full max-w-sm mx-4 space-y-6 text-center shadow-elevation-3 z-10 animate-in zoom-in-95 duration-150">
        
        {/* Close triggers */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-btn hover:bg-muted/40 transition-colors focus:outline-none"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title details */}
        <div className="space-y-1">
          <h3 className="font-heading font-bold text-md text-foreground">
            Rate Movie
          </h3>
          <p className="text-xs text-muted-foreground">
            How would you rate this film?
          </p>
        </div>

        {/* Clickable Star row */}
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
              className="p-1 focus:outline-none transition-transform active:scale-95"
            >
              <Star
                className={`w-8 h-8 transition-colors ${
                  star <= (hoverRating || rating)
                    ? "text-amber-500 fill-amber-500"
                    : "text-muted-foreground/30"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Submit action */}
        <div className="flex items-center gap-3 pt-2">
          <Button variant="outline" onClick={onClose} className="w-full text-xs">
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave} className="w-full text-xs">
            Submit Rating
          </Button>
        </div>

      </div>
    </div>
  );
};

export default RatingDialog;
export { RatingDialog };
