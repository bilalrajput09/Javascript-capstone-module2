const reservationShow = (data) => {
  let commentHtml = '';
  if (!data) return;
  data.forEach((d) => {
    commentHtml += `<p>${d.date_start} - ${d.date_end} by ${d.username}</p>`;
  });

  return commentHtml;
};

export default reservationShow;