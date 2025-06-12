
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Box, Text } from "@react-three/drei";
import { motion } from "framer-motion";

const FloatingBox = () => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Box args={[1, 1, 1]} position={[0, 0, 0]}>
        <meshNormalMaterial />
      </Box>
    </Float>
  );
};

const FloatingText = () => {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Text
        position={[-2, 0, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Portfolio
      </Text>
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
          <FloatingBox />
          <FloatingText />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
    </motion.section>
  );
};
