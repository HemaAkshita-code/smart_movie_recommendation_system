import React, { useState } from "react";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";
import Textarea from "../../components/ui/textarea";
import Badge from "../../components/ui/badge";
import Avatar from "../../components/ui/avatar";
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../components/ui/card";
import Dialog from "../../components/ui/dialog";
import AlertDialog from "../../components/ui/alert-dialog";
import Skeleton from "../../components/ui/skeleton";
import Spinner from "../../components/ui/spinner";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import MovieCard from "../../components/movie/MovieCard";
import MovieGrid from "../../components/movie/MovieGrid";
import MoviePoster from "../../components/movie/MoviePoster";
import MovieCarousel from "../../components/movie/MovieCarousel";
import RatingStars from "../../components/movie/RatingStars";
import CompatibilityScore from "../../components/movie/CompatibilityScore";
import AIRecommendationBox from "../../components/recommendation/AIRecommendationBox";
import TasteDNAChart from "../../components/recommendation/TasteDNAChart";
import CompatibilityMeter from "../../components/recommendation/CompatibilityMeter";
import RecommendationCard from "../../components/recommendation/RecommendationCard";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Sidebar from "../../components/layout/Sidebar";
import { Info, Film } from "lucide-react";

const ComponentShowcase = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const mockMovies = [
    {
      id: 1,
      title: "Arrival",
      releaseYear: 2016,
      genres: ["Sci-Fi", "Drama"],
      matchScore: 94,
      rating: 4.7,
      posterPath: null,
    },
    {
      id: 2,
      title: "In the Mood for Love",
      releaseYear: 2000,
      genres: ["Romance", "Drama"],
      matchScore: 89,
      rating: 4.8,
      posterPath: null,
    },
    {
      id: 3,
      title: "Blade Runner 2049",
      releaseYear: 2017,
      genres: ["Sci-Fi", "Action"],
      matchScore: 91,
      rating: 4.6,
      posterPath: null,
    },
  ];

  const mockRecommendation = {
    movie: mockMovies[0],
    matchReasons: [
      "Matches your preference for atmospheric Denis Villeneuve cinematography.",
      "Similar theme and pacing to Interstellar which you rated highly.",
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      <div className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="border-b border-border/10 pb-6 mb-12">
          <h1 className="text-4xl font-heading font-bold text-foreground">
            CineCompass Design System
          </h1>
          <p className="text-muted-foreground mt-2">
            Component Showcase and Preview sandbox.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Components Showcase */}
          <div className="lg:col-span-9 space-y-16">
            
            {/* 1. Buttons */}
            <section className="space-y-6">
              <h2 className="text-xl font-heading font-semibold border-b border-border/10 pb-2">
                1. Buttons
              </h2>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="danger">Danger Button</Button>
                <Button variant="primary" isLoading>Loading</Button>
                <Button variant="primary" disabled>Disabled</Button>
              </div>
            </section>

            {/* 2. Inputs */}
            <section className="space-y-6">
              <h2 className="text-xl font-heading font-semibold border-b border-border/10 pb-2">
                2. Inputs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
                    Normal input
                  </span>
                  <Input placeholder="Enter username..." />
                </div>
                <div className="space-y-4">
                  <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
                    Input with error
                  </span>
                  <Input placeholder="Enter email..." error="Invalid email address" />
                </div>
                <div className="col-span-1 md:col-span-2 space-y-4">
                  <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
                    Textarea
                  </span>
                  <Textarea placeholder="Write a short biography..." rows={3} />
                </div>
              </div>
            </section>

            {/* 3. Cards */}
            <section className="space-y-6">
              <h2 className="text-xl font-heading font-semibold border-b border-border/10 pb-2">
                3. Cards
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Card Title</CardTitle>
                    <CardDescription>Visual description tag</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      This is a core container card primitive utilizing the CineCompass border radius system (12px).
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm">Action</Button>
                  </CardFooter>
                </Card>

                {/* Recommendation Card */}
                <RecommendationCard recommendation={mockRecommendation} />
              </div>
            </section>

            {/* 4. Movie Components */}
            <section className="space-y-6">
              <h2 className="text-xl font-heading font-semibold border-b border-border/10 pb-2">
                4. Movie Components
              </h2>
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Poster */}
                  <div className="space-y-2">
                    <span className="text-xs text-muted-foreground uppercase font-bold">
                      MoviePoster
                    </span>
                    <MoviePoster title="Arrival" />
                  </div>
                  {/* Single Card */}
                  <div className="space-y-2">
                    <span className="text-xs text-muted-foreground uppercase font-bold">
                      MovieCard
                    </span>
                    <MovieCard movie={mockMovies[1]} />
                  </div>
                  {/* Stars / Compatibility info */}
                  <div className="space-y-4 flex flex-col justify-center">
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground uppercase font-bold block">
                        RatingStars
                      </span>
                      <RatingStars rating={4.5} />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground uppercase font-bold block">
                        CompatibilityScore
                      </span>
                      <CompatibilityScore score={94} />
                    </div>
                  </div>
                </div>

                {/* Grid */}
                <div className="space-y-2">
                  <span className="text-xs text-muted-foreground uppercase font-bold block">
                    MovieGrid
                  </span>
                  <MovieGrid movies={mockMovies} />
                </div>

                {/* Carousel */}
                <div className="space-y-2">
                  <span className="text-xs text-muted-foreground uppercase font-bold block">
                    MovieCarousel
                  </span>
                  <MovieCarousel title="Trending Now" movies={mockMovies} />
                </div>
              </div>
            </section>

            {/* 5. Recommendation Components */}
            <section className="space-y-6">
              <h2 className="text-xl font-heading font-semibold border-b border-border/10 pb-2">
                5. Recommendation Components
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <AIRecommendationBox />
                <div className="space-y-6 flex flex-col items-center">
                  <div className="bg-card p-6 rounded-card border border-border/40 w-full">
                    <h3 className="font-heading font-semibold text-sm mb-4 text-center">
                      Radar Preference Chart
                    </h3>
                    <TasteDNAChart />
                  </div>
                  <div className="bg-card p-6 rounded-card border border-border/40 w-full flex items-center justify-center">
                    <CompatibilityMeter value={89} />
                  </div>
                </div>
              </div>
            </section>

            {/* 6. Common Components */}
            <section className="space-y-6">
              <h2 className="text-xl font-heading font-semibold border-b border-border/10 pb-2">
                6. Common Components
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <EmptyState
                  icon={Film}
                  title="Watchlist is empty"
                  description="Add films to your list to track progress."
                  actionText="Explore Discover"
                  onAction={() => alert("Action clicked")}
                />
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs text-muted-foreground uppercase font-bold block">
                      Badge Variants
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="primary">Lavender</Badge>
                      <Badge variant="success">Sage Green</Badge>
                      <Badge variant="accent">Dusty Coral</Badge>
                      <Badge variant="info">Powder Blue</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs text-muted-foreground uppercase font-bold block">
                      Skeleton shimmer Loader
                    </span>
                    <Skeleton className="h-20 w-full" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs text-muted-foreground uppercase font-bold block">
                      Loader spinner
                    </span>
                    <Loader className="bg-card rounded-card border border-border/40" />
                  </div>
                </div>
              </div>
            </section>

            {/* 8. Dialogs */}
            <section className="space-y-6">
              <h2 className="text-xl font-heading font-semibold border-b border-border/10 pb-2">
                7. Dialogs & Modals
              </h2>
              <div className="flex gap-4">
                <Button onClick={() => setIsDialogOpen(true)}>Open Basic Dialog</Button>
                <Button variant="danger" onClick={() => setIsAlertOpen(true)}>Open Alert Dialog</Button>
              </div>

              {/* Basic Dialog */}
              <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <div className="space-y-4 text-left">
                  <h3 className="font-heading font-bold text-lg">Curated Film Entry</h3>
                  <p className="text-sm text-muted-foreground">
                    This is an overlay dialog primitive using a 16px corner radius and a transparent backdrop blur.
                  </p>
                  <Button onClick={() => setIsDialogOpen(false)} className="w-full">
                    Acknowledge
                  </Button>
                </div>
              </Dialog>

              {/* Alert Dialog */}
              <AlertDialog
                isOpen={isAlertOpen}
                onClose={() => setIsAlertOpen(false)}
                onConfirm={() => alert("Confirmed action")}
                title="Clear watchlist?"
                description="This action cannot be undone. All curated bookmarks will be permanently removed from your watchlist profile."
              />
            </section>

          </div>

          {/* Right Column: Layout Preview Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
              Sidebar Layout Component
            </h2>
            <div className="border border-border/10 rounded-container overflow-hidden bg-card">
              <Sidebar className="md:flex w-full sticky top-0 h-auto" />
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ComponentShowcase;
export { ComponentShowcase };
