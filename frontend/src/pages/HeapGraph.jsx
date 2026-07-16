import { useEffect, useState } from "react";
import api from "../services/graphApi";

function HeapGraph() {

    const [graph, setGraph] = useState({ nodes: [], edges: [] });

    useEffect(() => {

        api.get("/api/graph")
            .then(res => setGraph(res.data))
            .catch(err => console.log(err));

    }, []);

    return (
        <div>
            <h1>Heap Graph</h1>

            {graph.nodes.map(node => (
                <div key={node.id}>
                    {node.className} ({node.size})
                </div>
            ))}
        </div>
    );
}

export default HeapGraph;