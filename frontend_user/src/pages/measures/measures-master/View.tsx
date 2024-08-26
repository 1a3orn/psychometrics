import { UseMeasuresMasterReturn } from "./use-measures-master";
import { MeasureDefinition } from "../types";

import { PageContent, BasicCard, Button } from "../../../components";
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

export const View = (props: UseMeasuresMasterReturn & { measure: MeasureDefinition }) => {
  const { userData } = props;

  const mappedData = userData.map((run, index) => {
    const base: Record<string, number | string> = { startedAt: new Date(run.startedAt).getTime() };
    run.measures.forEach((measure) => {
      base[measure.key] = measure.number;
    });
    return base;
  });

  return (
    <PageContent>
      <BasicCard title={props.measure.title} subtext={props.measure.description}>
        <div className="h-80 w-full">
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <LineChart data={mappedData}>
              <XAxis dataKey="startedAt" tickFormatter={dataFormatter} type="number" domain={["dataMin", "dataMax"]} />
              <YAxis />
              <Tooltip />
              <Legend />
              {props.measure.measures.map((measure, i) => (
                <Line type="monotone" dataKey={measure} stroke={COLORS[i]} activeDot={{ r: 8 }} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-4">
          <Button onClick={props.handleStartOne}>Do one exercise</Button>
          <Button onClick={props.handleStartMany}>Do {props.measure.numberPerDefault} in a row</Button>
        </div>
      </BasicCard>
    </PageContent>
  );
};
