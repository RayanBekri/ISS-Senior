"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  placeholderSrc?: string
}

export function LazyImage({
  src,
  alt,
  placeholderSrc = "/placeholder.svg?height=200&width=200",
  ...props
}: LazyImageProps) {
  const [imageSrc, setImageSrc] = useState(placeholderSrc)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    // Create new image element
    const img = new Image()

    // Set up load event handler
    img.onload = () => {
      setImageSrc(src)
      setImageLoaded(true)
    }

    // Set the source to trigger loading
    img.src = src

    // Clean up
    return () => {
      img.onload = null
    }
  }, [src])

  return (
    <img
      src={imageSrc || "/placeholder.svg"}
      alt={alt}
      className={`transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-50"}`}
      {...props}
    />
  )
}
