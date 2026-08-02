import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function GlobeMesh({ mousePosition, isVisible }) {
  const globeRef = useRef<THREE.Group>(null);
  const arcLinesRef = useRef<THREE.Line[]>([]);
  const timeRef = useRef(0);

  // Create dotted sphere points
  const pointsGeometry = useMemo(() => {
    const points = [];
    const radius = 2.5;
    const dots = 800;
    
    for (let i = 0; i < dots; i++) {
      const phi = Math.acos(-1 + (2 * i) / dots);
      const theta = Math.sqrt(dots * Math.PI) * phi;
      
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      
      points.push(x, y, z);
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    return geometry;
  }, []);

  // Create connection arcs (curved lines between random points)
  const connectionArcs = useMemo(() => {
    const arcs = [];
    const numArcs = 12;
    const radius = 2.5;
    
    for (let i = 0; i < numArcs; i++) {
      const startPhi = Math.random() * Math.PI;
      const startTheta = Math.random() * Math.PI * 2;
      const endPhi = Math.random() * Math.PI;
      const endTheta = Math.random() * Math.PI * 2;
      
      const startPoint = new THREE.Vector3(
        radius * Math.cos(startTheta) * Math.sin(startPhi),
        radius * Math.sin(startTheta) * Math.sin(startPhi),
        radius * Math.cos(startPhi)
      );
      
      const endPoint = new THREE.Vector3(
        radius * Math.cos(endTheta) * Math.sin(endPhi),
        radius * Math.sin(endTheta) * Math.sin(endPhi),
        radius * Math.cos(endPhi)
      );
      
      // Create curved path between points
      const midPoint = startPoint.clone().add(endPoint).multiplyScalar(0.5).normalize().multiplyScalar(radius * 1.15);
      const curve = new THREE.QuadraticBezierCurve3(startPoint, midPoint, endPoint);
      const curvePoints = curve.getPoints(30);
      
      const arcGeometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
      arcs.push({
        geometry: arcGeometry,
        offset: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 0.5
      });
    }
    
    return arcs;
  }, []);

  // Extremely slow rotation (90-120 seconds per full revolution)
  useFrame((state, delta) => {
    if (!globeRef.current) return;

    timeRef.current += delta;
    const globe = globeRef.current;
    
    // Base rotation: extremely slow (one revolution every ~100 seconds)
    const baseRotationSpeed = (Math.PI * 2) / 100; // 2π radians per 100 seconds
    globe.rotation.y += baseRotationSpeed * delta;
    
    // Add tiny breathing variation (±5% speed variation)
    const breathingVariation = Math.sin(timeRef.current * 0.2) * 0.05;
    globe.rotation.y += breathingVariation * delta * 0.01;
    
    // Subtle mouse interaction - tilt only 2-4 degrees
    const targetRotationX = mousePosition.y * 0.035; // ~2 degrees max
    const targetRotationZ = mousePosition.x * 0.035; // ~2 degrees max
    
    globe.rotation.x += (targetRotationX - globe.rotation.x) * 0.02;
    globe.rotation.z += (targetRotationZ - globe.rotation.z) * 0.02;

    // Entrance animation - scale and opacity
    const targetScale = isVisible ? 1 : 0.95;
    globe.scale.x += (targetScale - globe.scale.x) * 0.015;
    globe.scale.y += (targetScale - globe.scale.y) * 0.015;
    globe.scale.z += (targetScale - globe.scale.z) * 0.015;

    // Animate connection arc opacity (pulse effect)
    arcLinesRef.current.forEach((line, index) => {
      if (line.material && 'opacity' in line.material) {
        const arc = connectionArcs[index];
        const pulse = Math.sin(timeRef.current * arc.speed + arc.offset) * 0.5 + 0.5;
        (line.material as THREE.LineBasicMaterial).opacity = isVisible ? 0.05 + pulse * 0.06 : 0;
      }
    });
  });

  const pointsMaterial = useMemo(() => 
    new THREE.PointsMaterial({
      color: 0x0077ee,
      size: 0.03,
      transparent: true,
      opacity: isVisible ? 0.1 : 0,
      sizeAttenuation: true
    }), [isVisible]
  );

  const arcMaterial = useMemo(() => 
    new THREE.LineBasicMaterial({
      color: 0x0077ee,
      transparent: true,
      opacity: isVisible ? 0.08 : 0,
      linewidth: 1
    }), [isVisible]
  );

  return (
    <group ref={globeRef}>
      {/* Dotted sphere */}
      <points geometry={pointsGeometry} material={pointsMaterial} />
      
      {/* Connection arcs */}
      {connectionArcs.map((arc, index) => (
        <primitive 
          key={index}
          ref={(el) => { if (el) arcLinesRef.current[index] = el as THREE.Line; }}
          object={new THREE.Line(arc.geometry, arcMaterial.clone())}
        />
      ))}
    </group>
  );
}

export default function GlobeBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse position for subtle interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x: normalizedX, y: normalizedY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection Observer for viewport detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 1.5]}
        frameloop={isVisible ? 'always' : 'never'}
      >
        {/* Soft ambient lighting */}
        <ambientLight intensity={0.5} />
        
        {/* The globe mesh */}
        <GlobeMesh mousePosition={mousePosition} isVisible={isVisible} />
      </Canvas>
    </div>
  );
}
