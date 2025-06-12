
import { Canvas } from "@react-three/fiber";
import { Float, Text3D, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";

const FloatingText = () => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.5}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        position={[-2, 0, 0]}
      >
        Portfolio
        <meshNormalMaterial />
      </Text3D>
    </Float>
  );
};

export const Portfolio3D = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="h-screen flex items-center justify-center"
    >
      <div className="w-full h-full">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <FloatingText />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
    </motion.section>
  );
};
