import React, { createContext, useReducer, Dispatch, Reducer } from 'react'

type ActionType = 'ADD'

interface InitialStateTypes {
  email: string
  authId: string | undefined
  step: 'registrationForm' | 'uploadImage' | 'success'
}

interface ContextTypes {
  state: InitialStateTypes
  dispatch: Dispatch<{ type: ActionType; payload: InitialStateTypes }>
}

interface ActionTypes {
  type: ActionType
  payload: InitialStateTypes
}

const initialState: InitialStateTypes = {
  email: '',
  authId: '',
  step: 'registrationForm'
}

// empty object as ContextTypes object
export const AuthContext = createContext<ContextTypes>({} as ContextTypes)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const reducer: Reducer<InitialStateTypes, ActionTypes> = (
    state,
    action
  ): any => {
    switch (action.type) {
      case 'ADD':
        return {
          state,
          payload: {
            email: action.payload.email,
            authId: action.payload.authId,
            step: action.payload.step
          }
        }
      default:
        return { state, payload: action.payload }
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
