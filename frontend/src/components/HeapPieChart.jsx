import {
  PieChart,
  Pie,
  Cell,
  Tooltip
} from "recharts";

export default function HeapPieChart({
  used,
  max
}) {

  const data = [
    {
      name: "Used",
      value: used,
    },
    {
      name: "Free",
      value: max - used,
    },
  ];

  const colors = [
    "#22c55e",
    "#334155",
  ];

  return (
    <PieChart width={350} height={300}>
      <Pie
        data={data}
        dataKey="value"
        outerRadius={90}
      >
        {data.map((e, i) => (
          <Cell
            key={i}
            fill={colors[i]}
          />
        ))}
      </Pie>

      <Tooltip />
    </PieChart>
  );
}