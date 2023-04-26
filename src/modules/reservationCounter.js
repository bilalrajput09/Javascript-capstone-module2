const reservationCounter = (data) => {
  let commentHtml = '';
  let counter = 0;
  if (data) {
    data.forEach((d) => {
      commentHtml += `<p>${d.date_start} - ${d.date_end} by ${d.username}</p>`;
      counter += 1;
    });

    return counter;
  }

  return false;
};

export default reservationCounter;
