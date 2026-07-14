import React from "react";
import Badge from "../ui/badge";

const GenreBadge = ({ genre, ...props }) => {
  const genreVariants = {
    "sci-fi": "info",
    science: "info",
    romance: "accent",
    drama: "primary",
    thriller: "destructive",
    action: "destructive",
    mystery: "primary",
    comedy: "success",
    fantasy: "info",
  };

  const nameKey = (genre || "").toLowerCase();
  const variant = genreVariants[nameKey] || "primary";

  return (
    <Badge variant={variant} {...props}>
      {genre}
    </Badge>
  );
};

export default GenreBadge;
export { GenreBadge };
