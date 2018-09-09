import {API_URL} from "../constants"
import {store} from "../"
import {logout} from "../containers/UserSession/actions"

const setToken = (token: string | null) => {
  if (token) {
    localStorage.setItem("token", token)
  }
}

const request = (
  method: "GET" | "POST" | "DELETE" | "PUT" = "GET",
  path: string,
  options?: RequestInit | {body?: any | FormData}
) => {
  const token = localStorage.getItem("token")
  const isContentTypeFormData =
    options && options.body && options.body instanceof FormData
  return fetch(`${API_URL}/${path}`, {
    ...options,
    method,
    mode: "cors",
    headers: {
      "X-Key-Inflection": "camel",
      ...(isContentTypeFormData ? {} : {"Content-Type": "application/json"}),
      ...(token ? {Authorization: token} : {}),
    },
    ...(options && options.body
      ? {
          body: isContentTypeFormData
            ? options.body
            : JSON.stringify(options.body),
        }
      : {}),
  })
    .then((response: Response) => {
      if (response.ok) {
        setToken(response.headers.get("Authorization"))
        return response.json()
      } else {
        return response.json().then(err => {
          if (response.status === 401) {
            store.dispatch(logout())
            localStorage.removeItem("token")
          }
          return Promise.reject({
            status: response.status,
            body: err,
          })
        })
      }
    })
    .catch((error: Error) => {
      throw error
    })
}

const requests = {
  get: (path: string, options?: RequestInit | {body: any}) =>
    request("GET", path, options),
  post: (path: string, options?: RequestInit | {body: any}) =>
    request("POST", path, options),
  delete: (path: string, options?: RequestInit | {body: any}) =>
    request("DELETE", path, options),
  put: (path: string, options?: RequestInit | {body: any}) =>
    request("PUT", path, options),
}

export default requests
