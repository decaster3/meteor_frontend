import {BASEURL} from "../constants"

const setToken = (token: string | null) => {
  if (token) {
    localStorage.setItem("token", token)
  }
}

const request = (
  method: "GET" | "POST" | "DELETE" | "PUT" = "GET",
  path: string,
  options?: RequestInit | {body?: any}
) => {
  const token = localStorage.getItem("token")
  return fetch(`${BASEURL}/${path}`, {
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
  })
    .then((response: Response) => {
      if (response.ok) {
        setToken(response.headers.get("Authorization"))
        return response.json()
      } else {
        return response.json().then((error: any) => {
          throw new Error(error)
        })
      }
    })
    .catch((error: Error) => {
      throw {
        msg: error.message,
      }
    })
}

// const token2 = localStorage.getItem("token")

// fetch("http://192.168.0.100:3001/cities", {
//   mode: "cors",
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     "X-Key-Inflection": "camel",
//     ...(token2 ? {Authorization: token2} : {}),
//   },
//   // ...(options && options.body ? {body: JSON.stringify(options.body)} : {}),
// })
//   .then(res => {
//     console.log("res", res)
//   })
//   .catch(err => {
//     console.log("err", err)
//   })

// fetch("http://192.168.0.100:3001/categories", {
//   mode: "cors",
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     "X-Key-Inflection": "camel",
//     ...(token2 ? {Authorization: token2} : {}),
//   },
//   // ...(options && options.body ? {body: JSON.stringify(options.body)} : {}),
// })
//   .then(res => {
//     console.log("res", res)
//   })
//   .catch(err => {
//     console.log("err", err)
//   })

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
