import { useState, useEffect } from 'react'
import { db } from 'services'
import { query, collection, onSnapshot, DocumentData } from 'firebase/firestore'

interface UseFetchAllTypes {
  data: DocumentData
  loading: boolean
}

export const useFetchAll = (collectionName: string): UseFetchAllTypes => {
  const [data, setData] = useState<DocumentData>([])
  const [loading, setLoading] = useState<boolean>(false)

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

  useEffect(fetchData, [collectionName])

  return {
    data,
    loading
  }
}
