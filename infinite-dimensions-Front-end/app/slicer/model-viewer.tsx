"use client"

import { useEffect, useState } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { STLLoader } from "three/examples/jsm/loaders/STLLoader"
import { OrbitControls, PerspectiveCamera, Environment, Center } from "@react-three/drei"
import * as THREE from "three"

interface ModelViewerProps {
  fileUrl: string
}

function STLModel({ fileUrl }: { fileUrl: string }) {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { camera } = useThree()

  useEffect(() => {
    const loader = new STLLoader()

    setLoading(true)
    setError(null)

    loader.load(
      fileUrl,
      (loadedGeometry) => {
        setGeometry(loadedGeometry)
        setLoading(false)
      },
      (xhr) => {
        // Progress callback
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded")
      },
      (err) => {
        console.error("Error loading STL", err)
        setError("Failed to load 3D model")
        setLoading(false)
      },
    )
  }, [fileUrl])

  useEffect(() => {
    if (geometry) {
      // Center camera on the model
      geometry.computeBoundingBox()
      const boundingBox = geometry.boundingBox

      if (boundingBox) {
        const center = new THREE.Vector3()
        boundingBox.getCenter(center)

        const size = new THREE.Vector3()
        boundingBox.getSize(size)

        const maxDim = Math.max(size.x, size.y, size.z)
        const fov = camera.fov * (Math.PI / 180)
        const cameraZ = Math.abs(maxDim / Math.sin(fov / 2))

        // Set camera position
        camera.position.z = cameraZ * 1.5

        // Set near and far plane
        camera.near = cameraZ / 100
        camera.far = cameraZ * 100
        camera.updateProjectionMatrix()
      }
    }
  }, [geometry, camera])

  if (loading) {
    return (
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#a408c3" wireframe />
      </mesh>
    )
  }

  if (error || !geometry) {
    return (
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    )
  }

  return (
    <Center>
      <mesh geometry={geometry}>
        <meshStandardMaterial color="#a408c3" />
      </mesh>
    </Center>
  )
}

export default function ModelViewer({ fileUrl }: ModelViewerProps) {
  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden bg-gray-100">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <STLModel fileUrl={fileUrl} />
        <OrbitControls enableZoom={true} enablePan={true} />
        <Environment preset="studio" />
      </Canvas>
    </div>
  )
}

