import {
  type FirestoreDataConverter,
  type SnapshotOptions,
  type DocumentData,
  QueryDocumentSnapshot,
  serverTimestamp,
} from "firebase/firestore"

import type { SFirestoreExtention } from "@/schemas/firestore-schemas"
import type { SAppModule } from "@/schemas/app-schemas"
import type { SBookmarkerProfile } from "@/schemas/bookmarker-schemas"

/**
 * Creates a generic FirestoreDataConverter for any model that extends FirestoreModel.
 * It automatically adds the document "id" when reading data (fromFirestore)
 * and omits the "id" when writing data (toFirestore).
 *
 * @returns A generic FirestoreDataConverter<T>
 */
function createConverter<T extends SFirestoreExtention>(): FirestoreDataConverter<T> {
  return {
    // --- READ OPERATION (fromFirestore) ---
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): T {
      const data = snapshot.data(options)!
      // console.log("From FB:", data);

      // Convert the data back to the type T and add the document ID
      return {
        ...data,
        id: snapshot.id, // Inject the document ID here
        createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
        updatedAt: data.updatedAt ? data.updatedAt.toDate() : new Date(),
        isActive: true,
      } as T
    },

    // --- WRITE OPERATION (toFirestore) ---
    toFirestore(modelObject: T): DocumentData {
      // Destructure the object to exclude the "id" property before writing to Firestore
      const {
        id,
        createdAt,
        updatedAt,
        isActive,
        ...data
      } = modelObject
      // console.log("To FB:", id, createdAt, updatedAt, data);

      // Firestore only accepts plain objects, not DocumentData that includes the ID
      // if (createdAt instanceof Date) {
      if (id.length > 0) {
        return {
          ...data,
          createdAt: createdAt,
          updatedAt: serverTimestamp(),
          isActive: isActive,
        }
      } else {
        return {
          ...data,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          isActive: true,
        }
      }
    }
  }
}

// Create model converters here and export them
export const appModuleConverter = createConverter<SAppModule>()
export const bookmarkerProfileConverter = createConverter<SBookmarkerProfile>()