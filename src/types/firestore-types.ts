/**
 * Firebase user info type.
 */
export type TUserInfoType = {
  displayName: string | null
  photoURL: string | null
  email: string | null
  uid?: string | null
  emailVerified?: boolean
}

/**
 * Firestore response type for getDocument().
 */
export type GetDocumentProps<T> = {
  ok: boolean
  message: string
  payload: T
}

/**
 * Firestore response type for getAllDocuments().
 */
export type GetAllDocumentsProps<T> = {
  ok: boolean
  message: string
  payload: T[]
}