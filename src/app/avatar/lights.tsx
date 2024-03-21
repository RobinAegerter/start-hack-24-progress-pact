export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight
        castShadow
        position={[2, 8, 8]}
        intensity={0.7}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-10, 0, -20]} intensity={0} />
      <pointLight position={[0, 7, 8]} intensity={100} />
    </>
  );
}
