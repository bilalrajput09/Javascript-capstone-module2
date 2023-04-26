const createReservation = async (projectID, id, name, startDate, endDate) => {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${projectID}/reservations`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      item_id: id,
      username: name,
      date_start: startDate,
      date_end: endDate,
    }),
  });
};

export default createReservation;