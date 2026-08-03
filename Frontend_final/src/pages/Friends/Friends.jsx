import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Users, Search, UserPlus, Check, X } from "lucide-react";
import FriendCard from "../../components/profile/FriendCard";
import CompatibilityComparison from "../../components/profile/CompatibilityComparison";
import Input from "../../components/ui/input";
import Card, { CardContent } from "../../components/ui/card";
import Button from "../../components/ui/button";

import { acceptFriendRequest, removeFriend } from "../../redux/profile/profileSlice";

const Friends = () => {
  const dispatch = useDispatch();
  const { friends, pendingRequests, suggestedFriends } = useSelector((state) => state.profile);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleAcceptRequest = (requestId) => {
    dispatch(acceptFriendRequest(requestId));
  };

  const handleRemoveFriend = (friendId) => {
    dispatch(removeFriend(friendId));
  };

  // Filter friends list
  const filteredFriends = friends.filter((f) => {
    if (searchQuery.trim()) {
      return f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             f.username.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  if (selectedFriend) {
    return (
      <CompatibilityComparison
        friend={selectedFriend}
        onClose={() => setSelectedFriend(null)}
      />
    );
  }

  return (
    <div className="space-y-8 font-sans select-none pb-12 text-left">
      
      {/* Header Info */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
          CineCompass Social
        </h1>
        <p className="text-xs text-muted-foreground">
          Compare film compatibility scores, shared favorite lists, and activity feeds with friends.
        </p>
      </div>

      {/* Grid splits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Friends list (8 columns) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Search bar */}
          <div className="relative w-full max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
              <Search className="w-4 h-4" />
            </div>
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search friends list..."
              className="pl-9 h-9 w-full bg-card border-border/40 text-xs"
            />
          </div>

          {/* Friends Card grid */}
          {filteredFriends.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredFriends.map((friend) => (
                <FriendCard
                  key={friend.id}
                  friend={friend}
                  onCompare={(f) => setSelectedFriend(f)}
                  onRemove={handleRemoveFriend}
                />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-muted-foreground bg-card border border-border/40 rounded-btn">
              No matching friends found. Add friends to start comparing tastes.
            </div>
          )}

        </div>

        {/* Right Side: Requests and Suggestions (4 columns) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Pending requests */}
          {pendingRequests.length > 0 && (
            <Card className="border-border/40">
              <CardContent className="p-5 space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
                  Friend Requests ({pendingRequests.length})
                </span>
                <div className="divide-y divide-border/10">
                  {pendingRequests.map((req) => (
                    <div key={req.id} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                      <div className="min-w-0">
                        <span className="font-semibold text-xs text-foreground block truncate">
                          {req.name}
                        </span>
                        <span className="text-[9px] text-muted-foreground block truncate mt-0.5">
                          @{req.username}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleAcceptRequest(req.id)}
                          className="p-1 rounded-btn bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-white transition-colors"
                          title="Accept Request"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Suggested friends */}
          <Card className="border-border/40">
            <CardContent className="p-5 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
                Suggested Curators
              </span>
              <div className="divide-y divide-border/10">
                {suggestedFriends.map((sug) => (
                  <div key={sug.id} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                    <div className="min-w-0">
                      <span className="font-semibold text-xs text-foreground block truncate">
                        {sug.name}
                      </span>
                      <span className="text-[9px] text-muted-foreground block truncate mt-0.5">
                        {sug.compatibility}% Compatibility
                      </span>
                    </div>
                    <button
                      onClick={() => alert(`Sent friend request to @${sug.username}`)}
                      className="p-1.5 rounded-btn border border-border/40 text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors focus:outline-none"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>

      </div>

    </div>
  );
};

export default Friends;
export { Friends };
