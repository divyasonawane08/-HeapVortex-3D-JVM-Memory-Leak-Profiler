import { useEffect, useState } from "react";
import { connect } from "../services/websocket";

export default function Dashboard() {

    const [memory, setMemory] = useState(null);

    useEffect(() => {

        connect(data => {

            setMemory(data);

        });

    }, []);

    if (!memory)

        return <h2>Waiting for JVM...</h2>;

    return (

        <div style={{ padding: 30 }}>

            <h1>HeapVortex Dashboard</h1>

            <h2>Heap Used</h2>

            <p>{(memory.heapUsed / 1024 / 1024).toFixed(2)} MB</p>

            <h2>Heap Max</h2>

            <p>{(memory.heapMax / 1024 / 1024).toFixed(2)} MB</p>

            <h2>Threads</h2>

            <p>{memory.threadCount}</p>

            <h2>GC Count</h2>

            <p>{memory.gcCount}</p>

        </div>

    );

}