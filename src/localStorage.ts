import {fromJS} from "immutable"

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state")
    return serializedState ? fromJS(JSON.parse(serializedState)) : undefined
  } catch (error) {
    return undefined
  }
}

export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem("state", serializedState)
  } catch (error) {
    throw error
  }
}
