import React, { useRef } from "react";
import { Canvas, extend, useFrame, useThree } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

const radiusPlanet = 1;

const buildings = new Array(100).fill(null).map((_, i) => ({
  height: 0.2 + 0.4 * Math.random(),
  width: 0.1 + 0.1 * Math.random(),
  depth: 0.1 + 0.1 * Math.random(),
  rotateY: 360 * Math.random(),
  rotateZ: -60 + 120 * Math.random()
}));

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

function Building({ height, width, depth }) {
  return (
    <mesh position={[0, radiusPlanet - 0.1 + height / 2, 0]}>
      <boxBufferGeometry attach="geometry" args={[width, height, depth]} />
      <meshLambertMaterial attach="material" color={0xff0000} />
    </mesh>
  );
}

function SpaceScene() {
  const ref = useRef();
  useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01));

  return (
    <scene>
      <ambientLight args={[0xffffff, 0.2]} />
      <directionalLight args={[0xffffff, 0.5]} position={[1, 1, 1]} />
      <group ref={ref}>
        <mesh>
          <sphereBufferGeometry
            attach="geometry"
            args={[radiusPlanet, 36, 36]}
          />
          <meshLambertMaterial
            attach="material"
            color={0x00ff00}
            transparent={true}
            opacity={0.5}
          />
        </mesh>
        {buildings.map((b, i) => (
          <group key={i} rotation={[0, b.rotateY, b.rotateZ]}>
            <Building width={b.width} height={b.height} depth={b.depth} />
          </group>
        ))}
      </group>
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
