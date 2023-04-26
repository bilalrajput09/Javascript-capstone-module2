const reservationShow = (data) => {
  let commentHtml = '';
  if (data) {
    data.forEach((d) => {
      commentHtml += `<p>${d.date_start} - ${d.date_end} by ${d.username}</p>`;
    });

    return commentHtml;
  }

  return false;
};

export default reservationShow;