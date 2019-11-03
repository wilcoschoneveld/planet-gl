import React, { useRef } from "react";
import { Canvas, extend, useFrame, useThree } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

function Controls() {
  const controls = useRef();
  const { camera, gl } = useThree();
  useFrame(() => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, gl.domElement]}
      enableDamping
      dampingFactor={0.1}
      rotateSpeed={0.5}
    />
  );
}

function SpaceScene() {
  const ref = useRef();
  useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01));

  return (
    <scene>
      <ambientLight args={[0xffffff, 0.4]} />
      <directionalLight args={[0xffffff, 0.5]} position={[1, 1, 1]} />
      <mesh ref={ref}>
        <sphereBufferGeometry attach="geometry" args={[1, 36, 36]} />
        <meshLambertMaterial attach="material" color={0x00ff00} />
      </mesh>
    </scene>
  );
}

function App() {
  return (
    <Canvas>
      <Controls />
      <SpaceScene />
    </Canvas>
  );
}

export default App;
