
type TFetchResponse<T> = {
  fetchSuccess: boolean
  fetchMessage: string
  fetchResponse: Promise<T>
}

/**
 * Type safe fetch function
 * @param url String
 * @param options Object of type RequestInit
 * @returns Promise of type TFetchResponse T
 */
export default async function typedFetch<T>(url: string, options?: RequestInit): Promise<TFetchResponse<T>> {
  const response: Response = await fetch(url, options)

  return {
    fetchSuccess: response.ok,
    fetchMessage: response.statusText,
    fetchResponse: response.json()
  }
}