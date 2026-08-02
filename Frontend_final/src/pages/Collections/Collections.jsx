import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Plus, FolderHeart } from "lucide-react";
import CollectionCard from "../../components/library/CollectionCard";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";
import Card, { CardContent } from "../../components/ui/card";

import { addCollection } from "../../redux/library/librarySlice";

const Collections = () => {
  const dispatch = useDispatch();
  const collections = useSelector((state) => state.library.collections);

  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTitle.trim()) {
      dispatch(addCollection({ title: newTitle.trim(), description: newDesc.trim() }));
      setNewTitle("");
      setNewDesc("");
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-8 font-sans select-none pb-12 text-left">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
            My Collections
          </h1>
          <p className="text-xs text-muted-foreground">
            Curate and group films into custom cinema boards.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsAdding(!isAdding)}
          className="gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>New Collection</span>
        </Button>
      </div>

      {/* New Collection Form Drawer */}
      {isAdding && (
        <Card className="border-border/40 animate-in fade-in slide-in-from-top-2 duration-200">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
              <h3 className="font-heading font-bold text-sm text-foreground">
                Create Collection
              </h3>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
                  Title
                </label>
                <Input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Noir Masterpieces"
                  required
                  className="h-10 text-xs border-border/40"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
                  Description
                </label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Supporting notes explaining this curation boards theme..."
                  className="w-full min-h-[80px] bg-muted/40 border border-border/40 hover:border-border/60 rounded-btn text-xs p-3 focus:outline-none focus:border-primary/50 text-foreground resize-none leading-relaxed"
                />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <Button variant="outline" size="sm" onClick={() => setIsAdding(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Create
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Collections Grid layout */}
      {collections.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col) => (
            <CollectionCard
              key={col.id}
              title={col.title}
              description={col.description}
              movieCount={col.movieCount}
              onClick={() => alert(`Opening "${col.title}" details.`)}
            />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-xs text-muted-foreground bg-card border border-border/40 rounded-btn">
          No collections created. Click "New Collection" to begin.
        </div>
      )}
    </div>
  );
};

export default Collections;
export { Collections };
