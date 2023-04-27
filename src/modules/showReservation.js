const showReservation = async (i, projectID) => {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${projectID}/reservations?item_id=${i}`);
  const data = await response.json();
  return data;
};

export default showReservation;