import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Convert to a date
const dataFormatter = (number: number) => new Date(number).toLocaleDateString();

const COLORS = [
  "indigo",
  "orange",
  "green",
  "red",
  "blue",
  "purple",
  "pink",
  "brown",
  "gray",
  "cyan",
  "magenta",
  "lime",
  "teal",
  "violet",
  "gold",
  "silver",
  "bronze",
  "black",
  "white",
  "gray",
  "cyan",
  "magenta",
  "lime",
  "teal",
  "violet",
  "gold",
  "silver",
  "bronze",
  "black",
  "white",
];

const yAxisDomain: [(dataMin: number) => number, string] = [(dataMin: number) => Math.max(0, dataMin - 10), "dataMax"];

interface MeasureChartProps {
  data: Record<string, number | string>[];
  xAxisDataKey: string;
  yAxisDataKeys: string[];
}

export const MeasureChart: React.FC<MeasureChartProps> = ({ data, xAxisDataKey, yAxisDataKeys }) => {
  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <LineChart data={data}>
        <XAxis dataKey={xAxisDataKey} tickFormatter={dataFormatter} type="number" domain={["dataMin", "dataMax"]} />
        <YAxis domain={yAxisDomain} />
        <Tooltip />
        <Legend />
        {yAxisDataKeys.map((measure, i) => (
          <Line key={measure} type="monotone" dataKey={measure} stroke={COLORS[i]} activeDot={{ r: 8 }} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
