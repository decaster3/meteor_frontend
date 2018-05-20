import {BASEURL} from "../constants"

const setToken = (token: string | null) => {
  if (token) {
    localStorage.setItem("token", token)
  }
}

const handleResponse = (response: Response) => {
  if (response.ok) {
    setToken(response.headers.get("Authorization"))
    return response.json()
  } else {
    return response.json().then((error: any) => {
      throw new Error(error)
    })
  }
}

const handleNetworkError = (error: Error) => {
  throw {
    msg: error.message,
  }
}

const request = (
  method: "get" | "post" | "delete" | "put",
  path: string,
  options?: RequestInit | {body?: any}
) => {
  const token = localStorage.getItem("token")
  const fetchOptions: RequestInit = {
    ...options,
    method,
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Key-Inflection": "camel",
      ...(token ? {Authorization: token} : {}),
    },
    ...(options && options.body ? {body: JSON.stringify(options.body)} : {}),
  }
  return fetch(`${BASEURL}/${path}`, fetchOptions).then(
    handleResponse,
    handleNetworkError
  )
}

const requests = {
  get: (path: string, options?: RequestInit | {body: any}) =>
    request("get", path, options),
  post: (path: string, options?: RequestInit | {body: any}) =>
    request("post", path, options),
  delete: (path: string, options?: RequestInit | {body: any}) =>
    request("delete", path, options),
  put: (path: string, options?: RequestInit | {body: any}) =>
    request("put", path, options),
}

export default requests
