import React from "react";
import CastCard from "./CastCard";

const CastCarousel = ({ cast = [], director = "", writers = [] }) => {
  // Composes director/writers as crew card targets alongside actors
  const composeCrew = () => {
    const list = [];
    if (director) {
      list.push({ id: "dir-1", name: director, character: "Director", profilePath: null });
    }
    writers.forEach((w, index) => {
      list.push({ id: `writer-${index}`, name: w, character: "Writer", profilePath: null });
    });
    return list;
  };

  const crew = composeCrew();
  const castList = cast.map((c, idx) => ({
    id: `cast-${idx}`,
    name: c,
    character: "Actor",
    profilePath: null,
  }));

  const allPeople = [...crew, ...castList];

  return (
    <div className="space-y-4 font-sans select-none text-left">
      <h3 className="font-heading font-semibold text-sm tracking-widest uppercase text-muted-foreground/60 px-1">
        Cast & Crew
      </h3>
      
      {/* Horizontal row */}
      <div className="flex gap-6 overflow-x-auto scrollbar-none pb-2 select-none">
        {allPeople.map((person) => (
          <CastCard
            key={person.id}
            name={person.name}
            character={person.character}
            profilePath={person.profilePath}
            className="w-[120px] sm:w-[140px] shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

export default CastCarousel;
export { CastCarousel };
