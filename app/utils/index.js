export const calculateCounters = (trips) => {
  const total = trips.length;

  const delivered = trips.filter(
    (trip) => trip.currentStatusCode === "DEL"
  ).length;

  const delayed = trips.filter(
    (trip) => calculateTATStatus(trip) === "Delayed"
  ).length;

  const inTransit = trips.filter(
    (trip) => trip.currentStatusCode === "INT"
  ).length;

  const ontime = trips.filter(
    (trip) =>
      trip.currentStatusCode === "DEL" && calculateTATStatus(trip) === "On time"
  ).length;

  return {
    total,
    delivered,
    delayed,
    inTransit,
    ontime,
  };
};

export const calculateTATStatus = (trip) => {
  const tripStartTime = new Date(trip.tripStartTime);
  const lastPingTime = new Date(trip.lastPingTime);

  let timeTaken;
  if (trip.tripEndTime) {
    const tripEndTime = new Date(trip.tripEndTime);
    timeTaken = (tripEndTime - tripStartTime) / (1000 * 60 * 60 * 24);
  } else {
    timeTaken = (lastPingTime - tripStartTime) / (1000 * 60 * 60 * 24);
  }

  const etaDays = trip.etaDays;

  let status;
  if (etaDays <= 0) {
    status = "Others";
  } else if (etaDays <= timeTaken) {
    status = "On time";
  } else {
    status = "Delayed";
  }

  return status;
};

export const generateUUID = () => {
  function getRandomHexDigit() {
    return Math.floor(Math.random() * 16).toString(16);
  }

  let uuid = "";
  for (let i = 0; i < 36; i++) {
    switch (i) {
      case 8:
      case 13:
      case 18:
      case 23:
        uuid += "-";
        break;
      case 14:
        uuid += "4";
        break;
      case 19:
        uuid += ((parseInt(getRandomHexDigit(), 16) & 0x3) | 0x8).toString(16);
        break;
      default:
        uuid += getRandomHexDigit();
    }
  }
  return uuid;
};
