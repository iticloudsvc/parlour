import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Hero3DCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.2, 9);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff3e0, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const pinkPointLight = new THREE.PointLight(0xff3399, 3, 20);
    pinkPointLight.position.set(-3, 2, 4);
    scene.add(pinkPointLight);

    const goldPointLight = new THREE.PointLight(0xffd700, 3.5, 20);
    goldPointLight.position.set(3, -1, 3);
    scene.add(goldPointLight);

    // Group for objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // --- 1. LUXURY PERFUME BOTTLE ---
    const perfumeGroup = new THREE.Group();
    perfumeGroup.position.set(-1.6, 0.2, 0);

    // Glass Body
    const bottleGeo = new THREE.BoxGeometry(1.6, 2.2, 1.1);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.88,
      opacity: 1,
      transparent: true,
      roughness: 0.08,
      ior: 1.52,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const bottleMesh = new THREE.Mesh(bottleGeo, glassMat);
    bottleMesh.castShadow = true;
    perfumeGroup.add(bottleMesh);

    // Perfume Liquid Core
    const liquidGeo = new THREE.BoxGeometry(1.35, 1.8, 0.85);
    const liquidMat = new THREE.MeshStandardMaterial({
      color: 0xf472b6,
      roughness: 0.2,
      metalness: 0.1,
      transparent: true,
      opacity: 0.75,
    });
    const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
    liquidMesh.position.y = -0.15;
    perfumeGroup.add(liquidMesh);

    // Gold Collar / Sprayer
    const collarGeo = new THREE.CylinderGeometry(0.3, 0.35, 0.35, 32);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.2,
    });
    const collarMesh = new THREE.Mesh(collarGeo, goldMat);
    collarMesh.position.y = 1.25;
    perfumeGroup.add(collarMesh);

    // Crystal Cap
    const capGeo = new THREE.BoxGeometry(0.8, 0.7, 0.7);
    const capMat = new THREE.MeshPhysicalMaterial({
      color: 0xffe4e6,
      transmission: 0.85,
      transparent: true,
      roughness: 0.1,
      ior: 1.45,
    });
    const capMesh = new THREE.Mesh(capGeo, capMat);
    capMesh.position.y = 1.75;
    perfumeGroup.add(capMesh);

    mainGroup.add(perfumeGroup);

    // --- 2. LUXURY LIPSTICK ---
    const lipstickGroup = new THREE.Group();
    lipstickGroup.position.set(1.9, -0.2, 0.5);
    lipstickGroup.rotation.z = -0.25;
    lipstickGroup.rotation.x = 0.2;

    // Bottom Base Gold Tube
    const baseGeo = new THREE.CylinderGeometry(0.42, 0.42, 1.4, 32);
    const baseMesh = new THREE.Mesh(baseGeo, goldMat);
    lipstickGroup.add(baseMesh);

    // Inner Black Collar
    const innerSleeveGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.6, 32);
    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a2e,
      metalness: 0.8,
      roughness: 0.3,
    });
    const innerMesh = new THREE.Mesh(innerSleeveGeo, darkMat);
    innerMesh.position.y = 0.9;
    lipstickGroup.add(innerMesh);

    // Red Lipstick Bullet with angle cut
    const bulletGeo = new THREE.CylinderGeometry(0.34, 0.34, 1.0, 32);
    const bulletMat = new THREE.MeshStandardMaterial({
      color: 0xbe123c, // Ruby red
      roughness: 0.35,
      metalness: 0.15,
    });
    const bulletMesh = new THREE.Mesh(bulletGeo, bulletMat);
    bulletMesh.position.y = 1.6;
    bulletMesh.rotation.z = 0.18;
    lipstickGroup.add(bulletMesh);

    mainGroup.add(lipstickGroup);

    // --- 3. FLOATING BEAUTY PEARLS & GEMS ---
    const pearls = [];
    const pearlGeo = new THREE.SphereGeometry(0.18, 32, 32);
    const pearlMat = new THREE.MeshStandardMaterial({
      color: 0xfff0f5,
      roughness: 0.15,
      metalness: 0.7,
    });

    const positions = [
      [-2.8, -1.2, 1.5],
      [2.9, 1.8, 1.2],
      [-0.2, 2.2, 0.8],
      [0.4, -2.0, 1.6],
      [-2.4, 1.9, -0.5],
      [2.2, -1.8, 0.2]
    ];

    positions.forEach((pos, idx) => {
      const pearl = new THREE.Mesh(pearlGeo, pearlMat);
      pearl.position.set(pos[0], pos[1], pos[2]);
      pearl.scale.setScalar(0.7 + (idx % 3) * 0.35);
      mainGroup.add(pearl);
      pearls.push({
        mesh: pearl,
        speed: 0.008 + (idx % 4) * 0.005,
        baseY: pos[1],
        radius: 0.3 + (idx % 3) * 0.2,
        offset: idx
      });
    });

    // --- 4. FLOATING GOLD DUST PARTICLES ---
    const particlesCount = 75;
    const particlePositions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 12;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xf59e0b,
      size: 0.07,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    const particlesMesh = new THREE.Points(particleGeo, particleMat);
    scene.add(particlesMesh);

    // Mouse Parallax Interaction
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = x * 0.8;
      targetMouseY = y * 0.8;

      // Move pink light towards pointer
      pinkPointLight.position.x = x * 4;
      pinkPointLight.position.y = y * 3;
    };

    // Touch interaction for mobile devices
    const handleTouchMove = (e) => {
      if (!e.touches || e.touches.length === 0) return;
      const touch = e.touches[0];
      const rect = container.getBoundingClientRect();
      const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = x * 1.0;
      targetMouseY = y * 1.0;

      pinkPointLight.position.x = x * 4;
      pinkPointLight.position.y = y * 3;
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchstart', handleTouchMove, { passive: true });

    // Resize Handler with responsive camera framing
    const handleResize = () => {
      if (!container || container.clientHeight === 0) return;
      const mobile = container.clientWidth < 640;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.position.z = mobile ? 8.2 : 9.0;
      camera.position.y = mobile ? 0.9 : 1.2;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);
    
    // Robust ResizeObserver for instantaneous dimension tracking
    let resizeObserver = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(container);
    }

    // Animation Loop
    let clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Group parallax
      mainGroup.rotation.y = mouseX * 0.45;
      mainGroup.rotation.x = -mouseY * 0.3;

      // Perfume floating & gentle wobble
      perfumeGroup.position.y = 0.2 + Math.sin(elapsedTime * 1.5) * 0.18;
      perfumeGroup.rotation.y = Math.sin(elapsedTime * 0.8) * 0.25;
      perfumeGroup.rotation.x = Math.cos(elapsedTime * 1.1) * 0.1;

      // Lipstick floating
      lipstickGroup.position.y = -0.2 + Math.cos(elapsedTime * 1.7) * 0.16;
      lipstickGroup.rotation.y = elapsedTime * 0.6;

      // Pearls orbit
      pearls.forEach(p => {
        p.mesh.position.y = p.baseY + Math.sin(elapsedTime * 2 + p.offset) * 0.25;
        p.mesh.rotation.y += 0.02;
      });

      // Particles gentle drift
      particlesMesh.rotation.y = elapsedTime * 0.05;
      particlesMesh.rotation.x = Math.sin(elapsedTime * 0.03) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-0 cursor-grab active:cursor-grabbing relative z-10 touch-none"
      title="Interactive 3D Beauty Elements - Touch or move to rotate!"
    />
  );
};

export default Hero3DCanvas;
