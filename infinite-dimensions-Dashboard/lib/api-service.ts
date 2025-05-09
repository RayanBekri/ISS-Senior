/**
 * API Service for making requests to the backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
const SERVER_API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

/**
 * Makes a fetch request to the API
 * @param endpoint - The API endpoint to fetch from
 * @param options - Fetch options
 * @param isServer - Whether the request is being made from the server
 * @returns The fetch response
 */
export async function fetchApi(endpoint: string, options: RequestInit = {}, isServer = false) {
  const baseUrl = isServer ? SERVER_API_URL : API_BASE_URL
  const url = `${baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`

  const defaultHeaders = {
    "Content-Type": "application/json",
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  })

  // Handle API errors
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: "An error occurred while fetching the data.",
    }))

    throw new Error(error.message || "An error occurred while fetching the data.")
  }

  return response
}

/**
 * Makes a GET request to the API
 * @param endpoint - The API endpoint to fetch from
 * @param options - Fetch options
 * @param isServer - Whether the request is being made from the server
 * @returns The response data
 */
export async function get(endpoint: string, options: RequestInit = {}, isServer = false) {
  const response = await fetchApi(endpoint, { ...options, method: "GET" }, isServer)
  return response.json()
}

/**
 * Makes a POST request to the API
 * @param endpoint - The API endpoint to fetch from
 * @param data - The data to send
 * @param options - Fetch options
 * @param isServer - Whether the request is being made from the server
 * @returns The response data
 */
export async function post(endpoint: string, data: any, options: RequestInit = {}, isServer = false) {
  const response = await fetchApi(
    endpoint,
    {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    },
    isServer,
  )
  return response.json()
}

/**
 * Makes a PUT request to the API
 * @param endpoint - The API endpoint to fetch from
 * @param data - The data to send
 * @param options - Fetch options
 * @param isServer - Whether the request is being made from the server
 * @returns The response data
 */
export async function put(endpoint: string, data: any, options: RequestInit = {}, isServer = false) {
  const response = await fetchApi(
    endpoint,
    {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    },
    isServer,
  )
  return response.json()
}

/**
 * Makes a PATCH request to the API
 * @param endpoint - The API endpoint to fetch from
 * @param data - The data to send
 * @param options - Fetch options
 * @param isServer - Whether the request is being made from the server
 * @returns The response data
 */
export async function patch(endpoint: string, data: any, options: RequestInit = {}, isServer = false) {
  const response = await fetchApi(
    endpoint,
    {
      ...options,
      method: "PATCH",
      body: JSON.stringify(data),
    },
    isServer,
  )
  return response.json()
}

/**
 * Makes a DELETE request to the API
 * @param endpoint - The API endpoint to fetch from
 * @param options - Fetch options
 * @param isServer - Whether the request is being made from the server
 * @returns The response data
 */
export async function del(endpoint: string, options: RequestInit = {}, isServer = false) {
  const response = await fetchApi(
    endpoint,
    {
      ...options,
      method: "DELETE",
    },
    isServer,
  )
  return response.json()
}
