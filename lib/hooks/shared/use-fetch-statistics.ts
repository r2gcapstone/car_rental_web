import { useState, useEffect } from 'react'
import { db } from 'services'
import {
  query,
  collection,
  getDocs,
  DocumentData,
  where
} from 'firebase/firestore'

interface UseFetchAllTypes {
  perDay: DocumentData
}

export const useFetchStatistcs = (
  collectionName: string,
  dateStart: string
): UseFetchAllTypes => {
  const [perDay, setPerDay] = useState<DocumentData>([])

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const docQuery = query(
        collection(db, collectionName),
        where('dateCreated', '==', dateStart)
      )
      const userArray: DocumentData = []

      const querySnapshot = await getDocs(docQuery)

      querySnapshot.forEach((snapShotData) => {
        userArray.push({
          ...snapShotData.data(),
          id: snapShotData.id
        })

        setPerDay(userArray)
      })
    }

    fetchData()
  }, [collectionName])

  return {
    perDay
  }
}
