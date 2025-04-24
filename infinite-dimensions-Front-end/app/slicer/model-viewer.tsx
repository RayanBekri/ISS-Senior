"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

// We'll use vanilla Three.js instead of React Three Fiber for better compatibility with React 19
interface ModelViewerProps {
  fileUrl: string
}

export default function ModelViewer({ fileUrl }: ModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Clear any existing content in the container
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild)
    }

    let OrbitControls: any
    let controls: any
    let animationFrameId: number

    // Set up scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf8f9fa)

    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 5

    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    containerRef.current.appendChild(renderer.domElement)

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)

    // Loading indicator
    const loadingGeometry = new THREE.BoxGeometry(1, 1, 1)
    const loadingMaterial = new THREE.MeshBasicMaterial({
      color: 0xa408c3,
      wireframe: true,
    })
    const loadingCube = new THREE.Mesh(loadingGeometry, loadingMaterial)
    scene.add(loadingCube)

    // Animation function with rotation
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      // Rotate the loading cube
      if (loadingCube && scene.children.includes(loadingCube)) {
        loadingCube.rotation.x += 0.01
        loadingCube.rotation.y += 0.01
      }

      // Update controls if they exist
      if (controls) {
        controls.update()
      }

      renderer.render(scene, camera)
    }

    // Start animation
    animate()

    // Load STL file and OrbitControls
    const loadResources = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Import OrbitControls
        const OrbitControlsModule = await import("three/addons/controls/OrbitControls.js")
        OrbitControls = OrbitControlsModule.OrbitControls

        // Set up orbit controls
        controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true

        // Dynamically import STLLoader
        const STLLoaderModule = await import("three/addons/loaders/STLLoader.js")
        const loader = new STLLoaderModule.STLLoader()

        // Fetch the file
        const response = await fetch(fileUrl)
        const blob = await response.blob()
        const objectUrl = URL.createObjectURL(blob)

        loader.load(
          objectUrl,
          (geometry) => {
            // Remove loading cube
            scene.remove(loadingCube)

            // Remove any existing model meshes
            scene.children.forEach((child) => {
              if (child instanceof THREE.Mesh && child !== loadingCube) {
                scene.remove(child)
              }
            })

            // Center geometry
            geometry.computeBoundingBox()
            const center = new THREE.Vector3()
            geometry.boundingBox!.getCenter(center)
            geometry.center()

            // Calculate size for camera positioning
            const size = new THREE.Vector3()
            geometry.boundingBox!.getSize(size)
            const maxDim = Math.max(size.x, size.y, size.z)

            // Position camera based on model size
            camera.position.z = maxDim * 2.5
            camera.updateProjectionMatrix()

            // Create model material
            const material = new THREE.MeshStandardMaterial({
              color: 0xa408c3,
              metalness: 0.2,
              roughness: 0.5,
            })

            // Create mesh and add to scene
            const mesh = new THREE.Mesh(geometry, material)
            scene.add(mesh)

            setIsLoading(false)
            URL.revokeObjectURL(objectUrl)
          },
          undefined,
          (err) => {
            console.error("Error loading STL:", err)
            setError("Failed to load 3D model")
            setIsLoading(false)
            URL.revokeObjectURL(objectUrl)
          },
        )
      } catch (err) {
        console.error("Error in model loading process:", err)
        setError("Failed to process 3D model")
        setIsLoading(false)
      }
    }

    loadResources()

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return

      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
      if (controls) {
        controls.dispose()
      }
      renderer.dispose()
      scene.clear()
    }
  }, [fileUrl]) // fileUrl dependency ensures the effect runs when the file changes

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden bg-gray-100">
      <div ref={containerRef} className="w-full h-full" />

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50 bg-opacity-80">
          <div className="bg-white p-4 rounded-lg shadow-lg text-red-600">
            <p className="font-medium">Error loading model</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full shadow-md text-sm text-gray-700">
          Loading model...
        </div>
      )}
    </div>
  )
}

