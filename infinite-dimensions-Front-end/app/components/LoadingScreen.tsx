"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [loadingPhase, setLoadingPhase] = useState(0)
  const [loadingText, setLoadingText] = useState("Initializing...")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Animation for 3D printer
  useEffect(() => {
    let animationFrameId: number
    let particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      opacity: number
    }> = []

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateCanvasSize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    // Create particles
    const createParticles = () => {
      particles = []
      const particleCount = 50
      const colors = ["#a408c3", "#8a06a3", "#c32bde", "#d355e6", "#e17eee"]

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 5 + 1,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.7 + 0.3,
        })
      }
    }

    createParticles()

    // Draw 3D printer
    const drawPrinter = (progress: number) => {
      if (!ctx) return

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const printerWidth = 120
      const printerHeight = 140

      // Base
      ctx.fillStyle = "#a408c3"
      ctx.fillRect(centerX - printerWidth / 2, centerY - printerHeight / 2 + 40, printerWidth, printerHeight - 40)

      // Top frame
      ctx.fillStyle = "#8a06a3"
      ctx.fillRect(centerX - printerWidth / 2, centerY - printerHeight / 2, printerWidth, 40)

      // Print bed
      ctx.fillStyle = "#f0f0f0"
      ctx.fillRect(
        centerX - printerWidth / 2 + 10,
        centerY - printerHeight / 2 + 50 + (printerHeight - 60) * (1 - progress / 100),
        printerWidth - 20,
        10,
      )

      // Print head
      const headY = centerY - printerHeight / 2 + 20
      ctx.fillStyle = "#333"
      ctx.fillRect(centerX - 15 + Math.sin(Date.now() / 300) * (printerWidth / 2 - 20), headY, 30, 20)

      // Printing object (grows with progress)
      if (progress > 10) {
        const objectHeight = (printerHeight - 70) * (progress / 100)
        ctx.fillStyle = "#e17eee"
        ctx.beginPath()
        ctx.moveTo(centerX - 25, centerY + printerHeight / 2 - 10)
        ctx.lineTo(centerX + 25, centerY + printerHeight / 2 - 10)
        ctx.lineTo(centerX + 15, centerY + printerHeight / 2 - 10 - objectHeight)
        ctx.lineTo(centerX - 15, centerY + printerHeight / 2 - 10 - objectHeight)
        ctx.closePath()
        ctx.fill()
      }

      // Filament lines
      ctx.strokeStyle = "#e17eee"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(centerX + printerWidth / 2 - 5, centerY - printerHeight / 2 + 10)
      ctx.lineTo(centerX + Math.sin(Date.now() / 300) * (printerWidth / 2 - 20) + 5, headY)
      ctx.stroke()
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.globalAlpha = 1

      // Draw 3D printer
      drawPrinter(progress)

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [progress])

  // Progress and loading phases
  useEffect(() => {
    const loadingTexts = [
      "Initializing system...",
      "Heating print bed...",
      "Calibrating axes...",
      "Loading filament...",
      "Preparing 3D models...",
      "Optimizing slices...",
      "Finalizing setup...",
      "Ready to print!",
    ]

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.random() * 3 + 1
        const newProgress = prev + increment

        // Update loading phase based on progress
        const newPhase = Math.floor((newProgress / 100) * loadingTexts.length)
        if (newPhase !== loadingPhase && newPhase < loadingTexts.length) {
          setLoadingPhase(newPhase)
          setLoadingText(loadingTexts[newPhase])
        }

        return newProgress >= 100 ? 100 : newProgress
      })
    }, 200)

    // When progress reaches 100%, start fade out
    if (progress === 100) {
      clearInterval(interval)
      setTimeout(() => {
        setIsVisible(false)
      }, 800)
    }

    return () => clearInterval(interval)
  }, [progress, loadingPhase])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#1a0b2e] to-[#30135a]"
        initial={{ opacity: 1 }}
        animate={{ opacity: progress === 100 ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full max-w-md px-4 flex flex-col items-center">
          {/* Logo with glow effect */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 relative h-24 w-[240px] drop-shadow-[0_0_15px_rgba(164,8,195,0.7)]"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ID%204-iq4Z8ZcABNOdnm7oTtQkwfSOSdGM4T.png"
              alt="Infinite Dimensions Logo"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Canvas for 3D printer animation */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8 relative w-full h-60"
          >
            <canvas ref={canvasRef} className="w-full h-full" />
          </motion.div>

          {/* Progress bar with glowing effect */}
          <motion.div
            initial={{ width: "100%", opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-full bg-[#2a1245] rounded-full h-3 mb-4 overflow-hidden relative"
          >
            <motion.div
              className="bg-gradient-to-r from-[#a408c3] to-[#e17eee] h-3 rounded-full relative"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
            </motion.div>

            {/* Percentage text */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-bold">
              {Math.round(progress)}%
            </div>
          </motion.div>

          {/* Loading text with typing effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-white text-center"
          >
            <p className="text-lg font-medium mb-1">{loadingText}</p>
            <p className="text-sm text-purple-200 opacity-80">Preparing your 3D printing experience...</p>
          </motion.div>

          {/* Decorative elements */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <p className="text-purple-200 text-xs opacity-50">© Infinite Dimensions • You ask. We make it.</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

