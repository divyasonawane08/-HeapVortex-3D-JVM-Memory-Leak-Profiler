import { Canvas } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";

function Node({ position, color }) {
    return (
        <mesh position={position}>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
}

export default function MemoryScene() {

    return (
        <Canvas style={{ height: "500px" }} camera={{ position: [0, 0, 6] }}>

            <ambientLight intensity={2} />

            <pointLight position={[10, 10, 10]} />

            <Node position={[-2, 1, 0]} color="red" />

            <Node position={[0, 0, 0]} color="green" />

            <Node position={[2, -1, 0]} color="blue" />

            <Line
                points={[
                    [-2, 1, 0],
                    [0, 0, 0]
                ]}
                color="white"
                lineWidth={2}
            />

            <Line
                points={[
                    [0, 0, 0],
                    [2, -1, 0]
                ]}
                color="white"
                lineWidth={2}
            />

            <OrbitControls />

        </Canvas>
    );

}