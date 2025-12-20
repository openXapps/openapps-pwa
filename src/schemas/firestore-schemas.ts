/**
 * Generic schema for Firestore to be
 * extended by application schemas
 */
export type SFirestoreExtention = {
  id: string
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}