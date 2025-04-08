declare module "three/addons/loaders/STLLoader.js" {
    import { type BufferGeometry, Loader } from "three"
  
    export class STLLoader extends Loader {
      constructor()
      load(
        url: string,
        onLoad: (geometry: BufferGeometry) => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (event: ErrorEvent) => void,
      ): void
      parse(data: ArrayBuffer | string): BufferGeometry
    }
  }
  
  declare module "three/addons/controls/OrbitControls.js" {
    import { type Camera, EventDispatcher, type Vector3 } from "three"
  
    export class OrbitControls extends EventDispatcher {
      constructor(camera: Camera, domElement?: HTMLElement)
  
      enabled: boolean
      target: Vector3
  
      enableDamping: boolean
      dampingFactor: number
  
      update(): boolean
      dispose(): void
    }
  }
  
  // Extend the global THREE namespace
  declare global {
    interface Window {
      OrbitControls: any
    }
  }
  
  