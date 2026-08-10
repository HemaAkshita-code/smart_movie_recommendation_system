import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProfileHeader from "../../components/profile/ProfileHeader";
import AchievementsSection from "../../components/profile/AchievementsSection";
import MoviePoster from "../../components/movie/MoviePoster";
import Badge from "../../components/ui/badge";
import Button from "../../components/ui/button";
import Card, { CardContent } from "../../components/ui/card";
import Input from "../../components/ui/input";

import { updateProfile } from "../../redux/profile/profileSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, achievements } = useSelector((state) => state.profile);

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(profile.name);
  const [editedBio, setEditedBio] = useState(profile.bio);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ name: editedName.trim(), bio: editedBio.trim() }));
    setIsEditing(false);
  };

  return (
    <div className="space-y-10 font-sans select-none pb-12 text-left">
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
          My Profile
        </h1>
        <p className="text-xs text-muted-foreground">
          Manage your personal cinema credentials, bio, and visual collections.
        </p>
      </div>

      {/* 1. Profile Header Banner */}
      <ProfileHeader profile={profile} onEditClick={() => setIsEditing(true)} />

      {/* 2. Edit Profile Modal Dialog */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center font-sans select-none">
          <div onClick={() => setIsEditing(false)} className="absolute inset-0 bg-background/60 backdrop-blur-xs transition-opacity" />
          <div className="relative bg-card border border-border/40 rounded-btn p-6 w-full max-w-md mx-4 space-y-4 shadow-elevation-3 z-10 animate-in zoom-in-95 duration-150 text-left">
            <h3 className="font-heading font-bold text-md text-foreground">Edit Profile</h3>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block">Name</label>
                <Input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  required
                  className="h-10 text-xs border-border/40"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block">Bio</label>
                <textarea
                  value={editedBio}
                  onChange={(e) => setEditedBio(e.target.value)}
                  className="w-full min-h-[100px] bg-muted/40 border border-border/40 hover:border-border/60 rounded-btn text-xs p-3 focus:outline-none focus:border-primary/50 text-foreground resize-none leading-relaxed"
                />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="sm">Save Changes</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grid: Left and Right splits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Favorites, Badges (8 columns) */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Favorite Movies */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-sm tracking-widest uppercase text-muted-foreground/60 px-1">
              Favorite Films
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-6">
              {profile.favorites.movies.map((film, index) => (
                <div key={index} className="space-y-2">
                  <MoviePoster title={film} />
                  <span className="font-semibold text-xs text-foreground truncate block px-1">
                    {film}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <AchievementsSection achievements={achievements} />

        </div>

        {/* Right Side: Crew, Genres details (4 columns) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Favorite Genres */}
          <Card className="border-border/40">
            <CardContent className="p-5 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
                Favorite Genres
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {profile.favorites.genres.map((g) => (
                  <Badge key={g} variant="primary" className="text-[10px] px-2.5 py-0.5">
                    {g}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Favorite Directors & Actors */}
          <Card className="border-border/40">
            <CardContent className="p-5 space-y-5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block mb-2">
                  Favorite Directors
                </span>
                <div className="flex flex-wrap gap-2">
                  {profile.favorites.directors.map((d) => (
                    <Badge key={d} variant="outline" className="text-[10px] px-2 py-0.5 border-secondary/35 text-secondary">
                      {d}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="border-t border-border/10 pt-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block mb-2">
                  Favorite Actors
                </span>
                <div className="flex flex-wrap gap-2">
                  {profile.favorites.actors.map((a) => (
                    <Badge key={a} variant="outline" className="text-[10px] px-2 py-0.5 border-accent/35 text-accent">
                      {a}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

      </div>

    </div>
  );
};

export default Profile;
export { Profile };
