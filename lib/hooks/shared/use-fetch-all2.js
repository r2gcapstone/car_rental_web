import { useState, useEffect } from 'react';
import { db } from 'services';
import { useRefetchData } from 'services/zustandVariables';
import { query, collection, onSnapshot, where } from 'firebase/firestore';
import { shallow } from 'zustand/shallow';

export const useFetchAll2 = (collectionName, status) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const countPerPage = 5;
  const lastIndex = currentPage * countPerPage;
  const firstIndex = lastIndex - countPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const numberOfPage = Math.ceil(data.length / countPerPage);
  const numbers = Array.from({ length: numberOfPage }, (_, i) => i + 1);
  const { updateRefetch, isRefetch } = useRefetchData((state) => ({ ...state }), shallow);

  const fetchData = () => {
    const collectionRef = collection(db, collectionName);
    const docQuery = query(collectionRef, where('status', '==', status));

    const userArray = [];
    setLoading(true);

    onSnapshot(docQuery, (snapshot) => {
      snapshot.forEach((snapShotData) => {
        userArray.push({
          ...snapShotData.data(),
          id: snapShotData.id,
        });
      });

      setData(userArray);
      setLoading(false);
      updateRefetch(false);
    });
  };

  useEffect(fetchData, [collectionName, isRefetch]);

  const jumpPerPage = (id) => {
    setCurrentPage(id);
  };

  const previousPage = () => {
    if (currentPage !== firstIndex && currentPage !== 1) {
      setCurrentPage((currentPage) => currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== lastIndex && currentPage !== numbers.length) {
      setCurrentPage((currentPage) => currentPage + 1);
    }
  };

  return {
    records,
    numbers,
    currentPage,
    jumpPerPage,
    previousPage,
    nextPage,
    data,
    loading,
  };
};

