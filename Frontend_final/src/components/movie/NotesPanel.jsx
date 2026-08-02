import React, { useState, useEffect } from "react";
import Card, { CardHeader, CardTitle, CardContent } from "../ui/card";
import Button from "../ui/button";
import { Edit2, Save } from "lucide-react";

const NotesPanel = ({ initialNote = "", onSave }) => {
  const [note, setNote] = useState(initialNote);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setNote(initialNote);
  }, [initialNote]);

  const handleSave = () => {
    if (onSave) {
      onSave(note);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  return (
    <Card className="border-border/40 font-sans text-left shadow-sm select-none">
      <CardHeader className="border-b border-border/10 pb-4">
        <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-1.5">
          <Edit2 className="w-4 h-4 text-primary" />
          Personal Notes
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 space-y-4">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Jot down your favorite dialogues, scenes to revisit, or personal thoughts on this film..."
          className="w-full min-h-[100px] bg-muted/40 border border-border/40 hover:border-border/60 rounded-btn text-xs p-3 focus:outline-none focus:border-primary/50 text-foreground resize-none leading-relaxed"
        />

        <div className="flex justify-end">
          <Button
            variant={isSaved ? "secondary" : "primary"}
            size="sm"
            onClick={handleSave}
            className="gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{isSaved ? "Saved!" : "Save Notes"}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotesPanel;
export { NotesPanel };
