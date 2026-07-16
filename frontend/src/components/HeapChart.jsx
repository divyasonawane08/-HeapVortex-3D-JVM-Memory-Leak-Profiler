import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

export default function HeapChart({ data }) {

  return (

    <ResponsiveContainer width="100%" height={320}>

      <LineChart data={data}>

        <CartesianGrid stroke="#334155" />

        <XAxis dataKey="time" stroke="#ffffff" />

        <YAxis stroke="#ffffff" />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="heap"
          stroke="#22c55e"
          strokeWidth={4}
          dot={false}
          isAnimationActive={true}
        />

      </LineChart>

    </ResponsiveContainer>

  );

}