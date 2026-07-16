import "./MetricCard.css";

export default function MetricCard({
  title,
  value,
  unit,
  icon,
  color
}) {

  return (

    <div className="metric-card">

      <div className="metric-top">

        <div
          className="metric-icon"
          style={{ background: color }}
        >
          {icon}
        </div>

      </div>

      <p className="metric-title">{title}</p>

      <h2 className="metric-value">
        {value}
        <span>{unit}</span>
      </h2>

    </div>

  );

}