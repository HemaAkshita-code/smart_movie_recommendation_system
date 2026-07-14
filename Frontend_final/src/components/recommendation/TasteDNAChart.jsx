import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const TasteDNAChart = ({ data }) => {
  const defaultData = [
    { subject: "Visual Style", value: 85 },
    { subject: "Dialogue", value: 65 },
    { subject: "Pacing", value: 90 },
    { subject: "Sound & Score", value: 75 },
    { subject: "Concept Depth", value: 80 },
    { subject: "Emotionality", value: 70 },
  ];

  const chartData = data || defaultData;

  return (
    <div className="w-full h-[280px] sm:h-[320px] flex items-center justify-center font-sans">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
          <PolarGrid stroke="currentColor" className="text-border/40" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "currentColor", fontSize: 10, fontWeight: 500 }}
            className="text-muted-foreground"
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: "currentColor", fontSize: 8 }}
            className="text-muted-foreground/40"
          />
          <Radar
            name="Taste DNA"
            dataKey="value"
            stroke="#9E9BE3"
            fill="#9E9BE3"
            fillOpacity={0.2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TasteDNAChart;
export { TasteDNAChart };
