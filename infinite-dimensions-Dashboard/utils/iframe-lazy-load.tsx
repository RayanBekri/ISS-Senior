"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"

interface LazyIframeProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  src: string
}

export function LazyIframe({ src, ...props }: LazyIframeProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [iframeVisible, setIframeVisible] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (!iframeRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIframeVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(iframeRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <iframe
      ref={iframeRef}
      src={iframeVisible ? src : ""}
      onLoad={() => setIframeLoaded(true)}
      className={`transition-opacity duration-300 ${iframeLoaded ? "opacity-100" : "opacity-0"}`}
      {...props}
    />
  )
}
