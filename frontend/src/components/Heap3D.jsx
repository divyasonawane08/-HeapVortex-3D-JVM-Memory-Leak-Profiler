import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function HeapNode({ position, color }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.18, 24, 24]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default function Heap3D({ metrics }) {

  const nodes = [];

  const total = Math.max(
    30,
    Math.floor((metrics.usedHeap || 100) / 15)
  );

  for (let i = 0; i < total; i++) {

    let color = "#22c55e";

    if (i % 10 === 0)
      color = "#ef4444";

    else if (i % 5 === 0)
      color = "#eab308";

    nodes.push(
      <HeapNode
        key={i}
        color={color}
        position={[
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8,
        ]}
      />
    );
  }

  return (
    <Canvas style={{ height: 450 }}>
      <ambientLight intensity={1} />
      <pointLight position={[10,10,10]} />

      {nodes}

      <OrbitControls
        autoRotate
        autoRotateSpeed={1}
      />
    </Canvas>
  );
}