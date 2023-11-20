import { useState, useEffect } from 'react';
import { db } from '../../../services';
import {
  query,
  collection,
  getDocs,
  where
} from 'firebase/firestore';

export const useFetchStatistcs = (
  collectionName,
  dateStart
) => {
  const [perDay, setPerDay] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const docQuery = query(
        collection(db, collectionName),
        where('dateCreated', '==', dateStart)
      );
      const userArray = [];

      const querySnapshot = await getDocs(docQuery);

      querySnapshot.forEach((snapShotData) => {
        userArray.push({
          ...snapShotData.data(),
          id: snapShotData.id
        });

        setPerDay(userArray);
      });
    };

    fetchData();
  }, [collectionName]);

  return {
    perDay
  };
};
