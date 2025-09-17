// Testimonials3DReal.tsx
import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, RoundedBox, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { leadzapTestimonials, LeadZapTestimonial } from '../leadzap-testimonials.ts';

const BRAND_BG = "#0b0b0b";
const BRAND_RING = "#facc15";     // yellow-400
const BRAND_TEXT = "#e5e7eb";     // gray-200
const BRAND_MUTE = "#9ca3af";     // gray-400

function TestimonialCard3D({
  position,
  testimonial,
  index,
}: {
  position: [number, number, number],
  testimonial: LeadZapTestimonial,
  index: number
}) {
  const boxRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!boxRef.current) return;
    boxRef.current.rotation.y = state.clock.elapsedTime * 0.18 + (index * Math.PI * 2) / 12;
    boxRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.2 + index) * 0.18;
    boxRef.current.scale.setScalar(hovered ? 1.12 : 1);
  });

  return (
    <group position={position}>
      <RoundedBox
        ref={boxRef}
        args={[2.6, 3.2, 0.08]} // 放大卡片
        radius={0.25}
        smoothness={8}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={BRAND_BG}
          metalness={0.1}
          roughness={0.9}
          emissive={hovered ? BRAND_RING : "#000000"}
          emissiveIntensity={hovered ? 0.12 : 0}
        />
      </RoundedBox>

      {/* hover 时更明显的外圈光晕 */}
      <mesh position={[0,0,0.045]}>
        <planeGeometry args={[2.7, 3.3]} />
        <meshBasicMaterial
          color={hovered ? BRAND_RING : "#ffffff"}
          transparent
          opacity={hovered ? 0.25 : 0.08}
        />
      </mesh>

      {/* 名字 */}
      <Text
        position={[0, 1.15, 0.06]}
        fontSize={0.19}
        color={BRAND_TEXT}
        anchorX="center"
        anchorY="middle"
      >
        {testimonial.name}
      </Text>

      {/* 国家 + 用户名 */}
      <Text
        position={[0, 0.9, 0.06]}
        fontSize={0.12}
        color={BRAND_MUTE}
        anchorX="center"
        anchorY="middle"
      >
        {testimonial.country} · {testimonial.username}
      </Text>

      {/* 正文 */}
      <Text
        position={[0, 0.23, 0.06]}
        fontSize={0.11}
        color={BRAND_TEXT}
        anchorX="center"
        anchorY="middle"
        maxWidth={2.2}
        textAlign="center"
      >
        “{testimonial.body}”
      </Text>

      {/* 指标 + 服务标签 */}
      <Text
        position={[0, -1.15, 0.06]}
        fontSize={0.095}
        color={hovered ? BRAND_RING : BRAND_MUTE}
        anchorX="center"
        anchorY="middle"
      >
        {testimonial.metrics ? `${testimonial.metrics}` : ""} {testimonial.service ? `• ${testimonial.service}` : ""}
      </Text>
    </group>
  );
}

function TestimonialsCarousel({ data }: { data: LeadZapTestimonial[] }) {
  const groupRef = useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08; // 缓慢自转
  });

  const radius = 5.3; // 放大半径，配合更大的卡片
  return (
    <group ref={groupRef}>
      {data.map((t, index) => {
        const angle = (index / data.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <TestimonialCard3D
            key={t.username}
            position={[x, 0, z]}
            testimonial={t}
            index={index}
          />
        );
      })}
    </group>
  );
}

export default function Testimonials3DReal({
  testimonials,
}: {
  testimonials?: LeadZapTestimonial[];
}) {
  const data = testimonials?.length ? testimonials : leadzapTestimonials;

  return (
    <div className="h-[36rem] w-full max-w-6xl mx-auto rounded-2xl shadow-[0_0_80px_-40px_rgba(250,204,21,0.5)] bg-[radial-gradient(1200px_800px_at_50%_-10%,rgba(250,204,21,0.08),transparent)] relative overflow-hidden">
      {/* Feather edges */}
      <div className="absolute inset-0 rounded-2xl" style={{
        background: `
          radial-gradient(ellipse at top, transparent 60%, rgba(0,0,0,0.1) 100%),
          radial-gradient(ellipse at bottom, transparent 60%, rgba(0,0,0,0.1) 100%),
          radial-gradient(ellipse at left, transparent 60%, rgba(0,0,0,0.1) 100%),
          radial-gradient(ellipse at right, transparent 60%, rgba(0,0,0,0.1) 100%)
        `
      }} />
      <Canvas
        camera={{ position: [0, 0, 9.2], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['transparent']} />
        {/* 更立体的光照 */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[12, 14, 8]} intensity={1.2} />
        <spotLight position={[-8, 6, 6]} angle={0.45} penumbra={0.5} intensity={0.7} />

        <Suspense fallback={null}>
          <TestimonialsCarousel data={data} />
          <Preload all />
        </Suspense>

        <OrbitControls
          enableZoom
          enablePan={false}
          minDistance={6}
          maxDistance={16}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
