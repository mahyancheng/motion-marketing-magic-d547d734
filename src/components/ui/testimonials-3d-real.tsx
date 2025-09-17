import React, { useRef, useState } from 'react';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import * as THREE from 'three';

// Testimonials data
const testimonials = [
  {
    name: 'Ava Green',
    username: '@ava',
    body: 'Cascade AI made my workflow 10x faster!',
    img: 'https://randomuser.me/api/portraits/women/32.jpg',
    country: '🇦🇺 Australia',
  },
  {
    name: 'Ana Miller',
    username: '@ana',
    body: 'Vertical marquee is a game changer!',
    img: 'https://randomuser.me/api/portraits/women/68.jpg',
    country: '🇩🇪 Germany',
  },
  {
    name: 'Mateo Rossi',
    username: '@mat',
    body: 'Animations are buttery smooth!',
    img: 'https://randomuser.me/api/portraits/men/51.jpg',
    country: '🇮🇹 Italy',
  },
  {
    name: 'Maya Patel',
    username: '@maya',
    body: 'Setup was a breeze!',
    img: 'https://randomuser.me/api/portraits/women/53.jpg',
    country: '🇮🇳 India',
  },
  {
    name: 'Noah Smith',
    username: '@noah',
    body: 'Best marquee component!',
    img: 'https://randomuser.me/api/portraits/men/33.jpg',
    country: '🇺🇸 USA',
  },
  {
    name: 'Lucas Stone',
    username: '@luc',
    body: 'Very customizable and smooth.',
    img: 'https://randomuser.me/api/portraits/men/22.jpg',
    country: '🇫🇷 France',
  },
];

function TestimonialCard3D({ position, testimonial, index }: { 
  position: [number, number, number], 
  testimonial: typeof testimonials[0],
  index: number 
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotate around the Y axis
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 + (index * Math.PI * 2) / testimonials.length;
      // Gentle floating motion
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.2;
      // Scale on hover
      meshRef.current.scale.setScalar(hovered ? 1.1 : 1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <planeGeometry args={[2, 2.5]} />
      <meshStandardMaterial color={hovered ? "#fcd200" : "#ffffff"} transparent opacity={0.9} />
      
      {/* Name text */}
      <Text
        position={[0, 0.8, 0.01]}
        fontSize={0.15}
        color="#000000"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        {testimonial.name}
      </Text>
      
      {/* Country text */}
      <Text
        position={[0, 0.6, 0.01]}
        fontSize={0.1}
        color="#666666"
        anchorX="center"
        anchorY="middle"
      >
        {testimonial.country}
      </Text>
      
      {/* Body text */}
      <Text
        position={[0, 0, 0.01]}
        fontSize={0.08}
        color="#333333"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.8}
        textAlign="center"
      >
        "{testimonial.body}"
      </Text>
      
      {/* Username text */}
      <Text
        position={[0, -0.8, 0.01]}
        fontSize={0.08}
        color="#888888"
        anchorX="center"
        anchorY="middle"
      >
        {testimonial.username}
      </Text>
    </mesh>
  );
}

function TestimonialsCarousel() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1; // Slow automatic rotation
    }
  });

  const radius = 4;
  
  return (
    <group ref={groupRef}>
      {testimonials.map((testimonial, index) => {
        const angle = (index / testimonials.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = 0;

        return (
          <TestimonialCard3D
            key={testimonial.username}
            position={[x, y, z]}
            testimonial={testimonial}
            index={index}
          />
        );
      })}
    </group>
  );
}

export default function Testimonials3DReal() {
  return (
    <div className="h-96 w-full max-w-4xl mx-auto">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        
        {/* Testimonials carousel */}
        <TestimonialsCarousel />
        
        {/* Controls for user interaction */}
        <OrbitControls 
          enableZoom={true} 
          enablePan={false}
          minDistance={5}
          maxDistance={15}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}