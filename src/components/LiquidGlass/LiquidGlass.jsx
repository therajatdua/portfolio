import React, { Suspense, useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import vertexShader from './shaders/liquidGlassVertex.glsl?raw';
import fragmentShader from './shaders/liquidGlassFragment.glsl?raw';
import LiquidGlassFallback from './LiquidGlassFallback';

const Blob = ({ intensity = 0.3, speed = 0.4, color = '#6666ff', glossiness = 60 }) => {
  const mesh = useRef();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntensity: { value: intensity },
      uSpeed: { value: speed },
      uColor: { value: new THREE.Color(color) },
      uGlossiness: { value: glossiness }
    }),
    [intensity, speed, color, glossiness]
  );

  useFrame((state) => {
    const { clock } = state;
    if (mesh.current) {
      mesh.current.material.uniforms.uTime.value = clock.getElapsedTime();
      mesh.current.rotation.y += 0.002;
      mesh.current.rotation.z += 0.001;
    }
  });

  return (
    <mesh ref={mesh} scale={2.8}>
      <icosahedronGeometry args={[1, 128]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const LiquidGlass = ({ 
  intensity = 0.3, 
  speed = 0.4, 
  color = '#6666ff', 
  blur = '40px', 
  mode = 'auto',
  className = ''
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const shouldRender3D = mode === '3d' || (mode === 'auto' && !isMobile);

  if (!shouldRender3D) {
    return (
      <div className={`w-full h-full ${className}`} style={{ filter: `blur(${blur})` }}>
        <LiquidGlassFallback color={color} />
      </div>
    );
  }

  return (
    <div className={`w-full h-full relative ${className}`}>
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Suspense fallback={null}>
          <Blob intensity={intensity} speed={speed} color={color} />
        </Suspense>
      </Canvas>
      {/* Optional overlay for extra glassiness/blur integration */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, transparent 30%, rgba(255,255,255,0.05) 100%)',
          backdropFilter: 'blur(1px)' // Very subtle blur to integrate 3D with DOM
        }} 
      />
    </div>
  );
};

export default LiquidGlass;
