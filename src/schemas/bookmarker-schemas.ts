import type { SFirestoreExtention } from "./firestore-schemas"

// /users/{userId}/bookmarker/{userId}/profiles/
export type SBookmarkerProfile = SFirestoreExtention & {
  profileName: string
}