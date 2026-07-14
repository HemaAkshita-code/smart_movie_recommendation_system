import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Button from "../ui/button";

const BackButton = ({ label = "Back" }) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-2 text-muted-foreground hover:text-foreground pl-2"
      onClick={() => navigate(-1)}
      aria-label="Navigate back"
    >
      <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
      <span>{label}</span>
    </Button>
  );
};

export default BackButton;
export { BackButton };
