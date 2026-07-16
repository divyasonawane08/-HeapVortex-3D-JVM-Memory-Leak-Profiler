import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Node({ position, color }) {

    return (

        <mesh position={position}>

            <sphereGeometry args={[0.12, 8, 8]} />

            <meshStandardMaterial color={color} />

        </mesh>

    );

}

export default function HeapGraph({ metrics }) {

    const heapPercent = metrics.heapUsagePercent;

    let color = "green";

    if (heapPercent > 70)
        color = "orange";

    if (heapPercent > 90)
        color = "red";

    const nodes = [];

    const count = Math.max(
        10,
        Math.floor(heapPercent * 100)
    );

    for (let i = 0; i < count; i++) {

        nodes.push(

            <Node

                key={i}

                color={color}

                position={[
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10
                ]}

            />

        );

    }

    return (

        <div
            style={{
                height: "600px"
            }}
        >

            <Canvas
                camera={{
                    position: [0, 0, 15]
                }}
            >

                <ambientLight />

                <pointLight position={[10, 10, 10]} />

                {nodes}

                <OrbitControls />

            </Canvas>

        </div>

    );

}