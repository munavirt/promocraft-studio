import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@/hooks/useTheme';

function AnimatedShape({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();
  const { viewport } = useThree();

  const isLight = theme === 'light';
  
  // Theme-based colors
  const primaryColor = isLight ? '#0066FF' : '#FFB800';
  const emissiveColor = isLight ? '#0044AA' : '#CC9500';
  
  // Animation speed based on theme
  const rotationSpeed = isLight ? 0.008 : 0.004;
  const distortSpeed = isLight ? 0.6 : 0.3;

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Smooth mouse follow
    const targetX = (mouse.current.x * viewport.width) / 8;
    const targetY = (mouse.current.y * viewport.height) / 8;
    
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      targetX,
      isLight ? 0.05 : 0.02
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      targetY,
      isLight ? 0.05 : 0.02
    );
    
    // Rotation
    meshRef.current.rotation.x += rotationSpeed;
    meshRef.current.rotation.y += rotationSpeed * 1.2;
  });

  return (
    <Float
      speed={isLight ? 2 : 1}
      rotationIntensity={isLight ? 0.5 : 0.3}
      floatIntensity={isLight ? 1 : 0.5}
    >
      <mesh ref={meshRef} scale={isLight ? 2.2 : 2.4}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color={primaryColor}
          emissive={emissiveColor}
          emissiveIntensity={isLight ? 0.2 : 0.4}
          roughness={isLight ? 0.3 : 0.2}
          metalness={isLight ? 0.4 : 0.7}
          distort={isLight ? 0.4 : 0.25}
          speed={distortSpeed}
        />
      </mesh>
    </Float>
  );
}

function Scene({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <>
      <ambientLight intensity={isLight ? 0.6 : 0.2} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={isLight ? 1.2 : 0.8} 
        color={isLight ? '#ffffff' : '#FFB800'}
      />
      <pointLight 
        position={[-5, -5, -5]} 
        intensity={isLight ? 0.5 : 0.3}
        color={isLight ? '#0066FF' : '#FFB800'}
      />
      <AnimatedShape mouse={mouse} />
      <Environment preset={isLight ? 'city' : 'night'} />
    </>
  );
}

export default function FloatingShape() {
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  };

  return (
    <div 
      className="absolute inset-0 z-0"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  );
}
