import C from "../global-constants"

const setToken = (token: string | null) => {
  if (token) {
    const serializedJwt = JSON.stringify(token)
    localStorage.setItem("token", serializedJwt)
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
  methodType: string,
  path: string,
  options?: RequestInit | {body: any}
) => {
  const token = JSON.parse(localStorage.getItem("token") || "")
  const fetchOptions = {
    ...options,
    method: methodType,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    },
  }
  return fetch(`${C.BASEURL}/${path}`, fetchOptions).then(
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
