import type { SFirestoreExtention } from "./firestore-schemas"

// /appModules/
export type SAppModule = SFirestoreExtention & {
  moduleName: string
  moduleDesc: string | null
  url: string
  order: number
}