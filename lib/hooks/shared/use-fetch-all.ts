import { useState, useEffect } from 'react'
import { db } from 'services'
import { useRefetchData } from 'services/zustandVariables'
import { query, collection, onSnapshot, DocumentData } from 'firebase/firestore'
import { shallow } from 'zustand/shallow'

interface UseFetchAllTypes<AccountDataTypes> {
  data: DocumentData
  loading: boolean
  jumpPerPage: (id: number) => void
  previousPage: () => void
  nextPage: () => void
  records: AccountDataTypes[]
  numbers: number[]
  currentPage: number
}

export const useFetchAll = <AccountDataTypes>(
  collectionName: string
): UseFetchAllTypes<AccountDataTypes> => {
  const [data, setData] = useState<DocumentData>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const countPerPage = 5
  const lastIndex = currentPage * countPerPage
  const firstIndex = lastIndex - countPerPage
  const records = data.slice(firstIndex, lastIndex)
  const numberOfPage = Math.ceil(data.length / countPerPage)
  const numbers = Array.from({ length: numberOfPage }, (_, i) => i + 1)
  const { updateRefetch, isRefetch } = useRefetchData(
    (state) => ({ ...state }),
    shallow
  )

  const fetchData = (): void => {
    const docQuery = query(collection(db, collectionName))
    const userArray: DocumentData = []
    setLoading(true)

    onSnapshot(docQuery, (snapshot) => {
      snapshot.forEach((snapShotData) => {
        userArray.push({
          ...snapShotData.data(),
          id: snapShotData.id
        })
      })

      setData(userArray)
      setLoading(false)
      updateRefetch(false)
    })
  }

  useEffect(fetchData, [collectionName, isRefetch])

  const jumpPerPage = (id: number): void => {
    setCurrentPage(id)
  }

  const previousPage = (): void => {
    if (currentPage !== firstIndex && currentPage !== 1) {
      setCurrentPage((currentPage) => currentPage - 1)
    }
  }

  const nextPage = (): void => {
    if (currentPage !== lastIndex && currentPage !== numbers.length) {
      setCurrentPage((currentPage) => currentPage + 1)
    }
  }

  return {
    records,
    numbers,
    currentPage,
    jumpPerPage,
    previousPage,
    nextPage,
    data,
    loading
  }
}
