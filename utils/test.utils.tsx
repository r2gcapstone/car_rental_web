import { act } from '@testing-library/react'

export const waitScreenUpdate = async (timer?: number): Promise<void> => {
  // ? Wait for the lazy component to load
  await act(
    () =>
      new Promise((resolve) => {
        setTimeout(resolve, timer || 0)
      })
  )
}

export const mockUseRouter = (
  push?: () => void,
  pathname?: string,
  route?: string,
  query?: { id: string } | { token: string },
  asPath?: string
): void => {
  /* eslint-disable unicorn/prefer-module */
  /* eslint-disable @typescript-eslint/no-var-requires */
  const useRouter = jest.spyOn(require('next/router'), 'useRouter')
  /* eslint-enable unicorn/prefer-module */
  /* eslint-enable @typescript-eslint/no-var-requires */
  useRouter.mockImplementation(() => ({
    push: push,
    route: route,
    pathname: pathname,
    query: query,
    asPath: asPath
  }))
}

// Re-export all of react testing lib here
export * from '@testing-library/react'

export { default as userEvent } from '@testing-library/user-event'
