import type React from "react"
import { lazy, Suspense, type ComponentType } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface LazyLoadOptions {
  fallback?: React.ReactNode
  ssr?: boolean
}

export function lazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  options: LazyLoadOptions = {},
) {
  const LazyComponent = lazy(importFunc)
  const { fallback = <Skeleton className="w-full h-40" />, ssr = false } = options

  return function LazyLoadedComponent(props: React.ComponentProps<T>) {
    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    )
  }
}
