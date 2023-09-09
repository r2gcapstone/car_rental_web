import { useState, useEffect } from 'react'
import { db } from 'services'
import { useRefetchData } from 'services/zustandVariables'
import { query, collection, onSnapshot, DocumentData } from 'firebase/firestore'

interface UseFetchAllTypes {
  data: DocumentData
  loading: boolean
}

export const useFetchAll = (collectionName: string): UseFetchAllTypes => {
  const [data, setData] = useState<DocumentData>([])
  const [loading, setLoading] = useState<boolean>(false)
  const isRefetching = useRefetchData((state) => state.isRefetch)

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
    })
  }

  useEffect(fetchData, [collectionName, isRefetching])

  return {
    data,
    loading
  }
}
