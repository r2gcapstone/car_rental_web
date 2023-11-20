export const findHighestRegisteredDate = (userData) => {
  const userCountByDate = {};

  userData.forEach((user) => {
    const registrationDate = user.dateCreated;

    if (!userCountByDate[registrationDate]) {
      userCountByDate[registrationDate] = 0;
    }

    userCountByDate[registrationDate]++;
  });

  const highestCount = Math.max(...Object.values(userCountByDate));

  return {
    highestCount,
  };
};

export const findHighestRegisteredPerMonth = (userData) => {
  const userCountByMonth = {};

  userData.forEach((user) => {
    const registrationDate = new Date(user.dateCreated);
    const year = registrationDate.getFullYear();
    const month = registrationDate.getMonth() + 1; // Adding 1 because getMonth() returns 0-based month
    const key = `${year}-${month}`;

    if (!userCountByMonth[key]) {
      userCountByMonth[key] = 0;
    }

    userCountByMonth[key]++;
  });

  let highestCount = 0;
  const highestCountMonths = {};

  for (const key in userCountByMonth) {
    const count = userCountByMonth[key];

    if (count > highestCount) {
      highestCount = count;
      highestCountMonths[key] = count;
    }
  }

  return { highestCountMonths };
};
