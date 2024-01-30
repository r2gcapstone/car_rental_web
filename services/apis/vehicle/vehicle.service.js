import { useState, useEffect } from 'react'
import {
  collection,
  doc,
  query,
  updateDoc,
  Timestamp,
  where,
  getDoc,
  onSnapshot
} from 'firebase/firestore'

import { db } from 'services/firebase'

export const updateVehicleField = async (key, value, docId) => {
  let dateUpdated = new Date()
  dateUpdated = Timestamp.fromDate(dateUpdated)

  try {
    // Update the subscription document
    await updateDoc(doc(db, 'cars', docId), {
      [key]: value,
      dateUpdated: value && dateUpdated
    })

    return {
      message: 'Update success!',
      error: false,
      status: 200
    }
  } catch (error) {
    return {
      error: true,
      message: error.message,
      status: error.code
    }
  }
}

// Function to get user data using its userId
export const getVehicleData = async (docId) => {
  try {
    const carDoc = doc(db, 'cars', docId)
    const carSnapshot = await getDoc(carDoc)
    const car = carSnapshot.data()
    return car
  } catch (error) {
    return { error: true, message: error.message, status: error.code }
  }
}

export const getVehicleDatas = (collectionName, status) => {
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

  const fetchData = async () => {
    const collectionRef = collection(db, collectionName)

    let docQuery

    if (status === 'approved' || status === 'ongoing') {
      // If status is either "approved" or "ongoing"
      docQuery = query(
        collectionRef,
        where('status', 'in', ['approved', 'ongoing'])
      )
    } else if (status !== '') {
      // If status is other than "approved" or "ongoing"
      docQuery = query(collectionRef, where('status', '==', status))
    }

    if (docQuery) {
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
