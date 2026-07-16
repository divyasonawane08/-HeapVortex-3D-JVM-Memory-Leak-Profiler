import { useEffect, useState } from "react";
import MetricCard from "./MetricCard";
import { connect, disconnect } from "../services/websocket";


export default function Sidebar({ setParentMetrics }) {

    const [metrics, setMetrics] = useState({
        cpuUsage: 0,
        usedHeap: 0,
        maxHeap: 0,
        threadCount: 0,
        gcCount: 0,
        gcTime: 0
    });

    useEffect(() => {

        connect((data) => {
    setMetrics(data);

    if (setParentMetrics) {
        setParentMetrics(data);
    }
});
        return () => {
            disconnect();
        };

    }, [setParentMetrics]);

    const heapPercent =
        metrics.maxHeap > 0
            ? ((metrics.usedHeap / metrics.maxHeap) * 100).toFixed(1)
            : "0";

    return (
        <div
            style={{
                width: "300px",
                height: "100vh",
                background: "#0f172a",
                color: "white",
                padding: "20px",
                boxSizing: "border-box"
            }}
        >
            <h2 style={{ marginBottom: "20px" }}>
                HeapVortex
            </h2>

            <MetricCard
                title="CPU Usage"
                value={Number(metrics.cpuUsage).toFixed(1)}
                unit="%"
            />

            <MetricCard
                title="Heap Usage"
                value={heapPercent}
                unit="%"
            />

            <MetricCard
                title="Used Heap"
                value={metrics.usedHeap}
                unit="MB"
            />

            <MetricCard
                title="Max Heap"
                value={metrics.maxHeap}
                unit="MB"
            />

            <MetricCard
                title="Threads"
                value={metrics.threadCount}
            />

            <MetricCard
                title="GC Count"
                value={metrics.gcCount}
            />

            <MetricCard
                title="GC Time"
                value={metrics.gcTime}
                unit="ms"
            />

        </div>
    );
}