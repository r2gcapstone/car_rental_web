import { useState, useEffect } from 'react'
import { db } from 'services'
import { query, collection, onSnapshot, where } from 'firebase/firestore'

export const useFetchAll2 = (collectionName, status) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [isRefetch, setIsRefetch] = useState(false)

  const countPerPage = 5
  const lastIndex = currentPage * countPerPage
  const firstIndex = lastIndex - countPerPage
  const records = data.slice(firstIndex, lastIndex)
  const numberOfPage = Math.ceil(data.length / countPerPage)
  const numbers = Array.from({ length: numberOfPage }, (_, i) => i + 1)

  const fetchData = () => {
    const collectionRef = collection(db, collectionName)
    let docQuery = query(collectionRef)

    if (status !== '') {
      docQuery = query(collectionRef, where('status', '==', status))
    }

    const userArray = []
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
      setIsRefetch(false)
    })
  }

  useEffect(() => {
    fetchData()
  }, [collectionName, status, isRefetch])

  const jumpPerPage = (id) => {
    setCurrentPage(id)
  }

  const previousPage = () => {
    if (currentPage !== firstIndex && currentPage !== 1) {
      setCurrentPage((currentPage) => currentPage - 1)
    }
  }

  const nextPage = () => {
    if (currentPage !== lastIndex && currentPage !== numbers.length) {
      setCurrentPage((currentPage) => currentPage + 1)
    }
  }

  const refetchData = () => {
    setIsRefetch(true)
  }

  return {
    records,
    numbers,
    currentPage,
    jumpPerPage,
    previousPage,
    nextPage,
    data,
    loading,
    refetchData
  }
}
