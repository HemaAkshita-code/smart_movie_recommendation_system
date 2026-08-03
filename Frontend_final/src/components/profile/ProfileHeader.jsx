import React from "react";
import Avatar from "../ui/avatar";
import Button from "../ui/button";
import { Edit2, Calendar, Link as LinkIcon } from "lucide-react";

const ProfileHeader = ({ profile = {}, onEditClick }) => {
  return (
    <div className="relative font-sans select-none text-left border border-border/20 rounded-btn overflow-hidden bg-card">
      {/* Editorial top tint banner */}
      <div className="h-28 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20" />
      
      {/* Content wrapper */}
      <div className="p-6 md:p-8 pt-0 relative flex flex-col sm:flex-row items-start justify-between gap-6">
        
        {/* Avatar overlay */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5 -mt-10">
          <Avatar fallback={profile.name[0]} className="w-20 h-20 bg-card border-4 border-card text-primary font-bold text-2xl shadow-elevation-2" />
          <div className="space-y-1 sm:mb-2">
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground leading-tight">
              {profile.name}
            </h2>
            <span className="text-xs text-muted-foreground font-semibold">@{profile.username}</span>
          </div>
        </div>

        {/* Edit Action */}
        <Button
          variant="outline"
          size="sm"
          onClick={onEditClick}
          className="gap-1.5 text-xs sm:mt-4"
        >
          <Edit2 className="w-3.5 h-3.5" />
          Edit Profile
        </Button>

      </div>

      {/* Bio, link details */}
      <div className="px-6 md:px-8 pb-6 md:pb-8 space-y-4">
        <p className="text-xs md:text-sm text-foreground/80 leading-relaxed max-w-xl">
          {profile.bio}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground font-medium">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{profile.joinDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <LinkIcon className="w-4 h-4" strokeWidth={1.5} />
            <a href="https://cinecompass.app/ria" target="_blank" rel="noreferrer" className="text-primary hover:underline">
              cinecompass.app/{profile.username}
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProfileHeader;
export { ProfileHeader };
