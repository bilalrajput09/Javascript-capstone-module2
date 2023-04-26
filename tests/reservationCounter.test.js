import reservationCounter from '../src/modules/reservationCounter.js';

test('Should return correct number of reservations', () => {
  const dummyData = [
    {
      item_id: 1,
      username: 'Jane',
      date_start: '2020-10-15',
      date_end: '2020-10-16',
    },
    {
      item_id: 2,
      username: 'Tom',
      date_start: '2020-10-15',
      date_end: '2020-10-16',
    },
    {
      item_id: 3,
      username: 'Khabeb',
      date_start: '2020-10-15',
      date_end: '2020-10-16',
    },
  ];

  expect(reservationCounter(dummyData)).toBe(3);
});
