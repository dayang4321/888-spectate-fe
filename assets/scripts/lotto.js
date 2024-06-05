function getNextLottoDraw(inputDate = new Date()) {
  // Days in JS Sun - Sat corresponding to 0 - 6
  const WEDNESDAY = 3;
  const SATURDAY = 6;
  const DRAW_HOUR = 20; // 8 PM
  const MS_PER_HOUR = 60 * 60 * 1000;
  const MS_PER_DAY = 24 * MS_PER_HOUR;

  // Get the current day of the week and hour
  const currentDay = inputDate.getDay();
  const currentHour = inputDate.getHours();

  let daysUntilNextDraw;

  if (currentDay === WEDNESDAY || currentDay === SATURDAY) {
    // Date is Wed Or Sat

    if (currentHour < DRAW_HOUR) {
      daysUntilNextDraw = 0;
    } else {
      // 3 days from Wednesday and 4 From Saturday
      daysUntilNextDraw = currentDay === WEDNESDAY ? 3 : 4;
    }
  } else {
    if (currentDay < WEDNESDAY) {
      // Before Wednesday
      daysUntilNextDraw = WEDNESDAY - currentDay;
    } else {
      // After Wednesday
      daysUntilNextDraw = SATURDAY - currentDay;
    }
  }

  // Calculate the next draw date
  const nextDrawDate = new Date(
    inputDate.getTime() + daysUntilNextDraw * MS_PER_DAY
  );
  nextDrawDate.setHours(DRAW_HOUR, 0, 0, 0);

  return nextDrawDate;
}

function getLottoDrawDates(inputDate = new Date()) {
  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  const nextDrawDate = getNextLottoDraw(inputDate);

  const firstDrawOffsetDays = 8; // A week and a day
  const drawDates = [
    getNextLottoDraw(
      new Date(nextDrawDate.getTime() - firstDrawOffsetDays * MS_PER_DAY)
    ),
  ]; // first draw date
  const drawDatesCount = 5;

  while (drawDates.length < drawDatesCount) {
    const serialNextDrawDate = drawDates[drawDates.length - 1];
    drawDates.push(getNextLottoDraw(serialNextDrawDate));
  }

  return drawDates;
}

// console.log(getNextLottoDraw());
// console.log(getLottoDrawDates());

// function runUnitTests() {
//   const testCases = [
//     {
//       input: new Date('2024-05-27T19:00:00.000'),
//       expected: new Date('2024-05-29T20:00:00.000'),
//       description: 'Before Wednesday draw',
//     },
//     {
//       input: new Date('2024-05-29T19:00:00.000'),
//       expected: new Date('2024-05-29T20:00:00.000'),
//       description: 'On Wednesday before 8 PM',
//     },
//     {
//       input: new Date('2024-05-29T21:00:00.000'),
//       expected: new Date('2024-06-01T20:00:00.000'),
//       description: 'On Wednesday after 8 PM',
//     },
//     {
//       input: new Date('2024-05-31T21:00:00.000'),
//       expected: new Date('2024-06-01T20:00:00.000'),
//       description: 'Before Saturday draw',
//     },
//     {
//       input: new Date('2024-06-01T19:00:00.000'),
//       expected: new Date('2024-06-01T20:00:00.000'),
//       description: 'On Saturday before 8 PM',
//     },
//     {
//       input: new Date('2024-06-01T21:00:00.000'),
//       expected: new Date('2024-06-05T20:00:00.000'),
//       description: 'On Saturday after 8 PM',
//     },
//     {
//       input: new Date('2024-06-02T19:00:00.000'),
//       expected: new Date('2024-06-05T20:00:00.000'),
//       description: 'After Saturday draw',
//     },
//   ];

//   testCases.forEach(({ input, expected, description }) => {
//     const result = getNextLottoDraw(input);
//     console.log(
//       `${description}: ${
//         result.toISOString() === expected.toISOString() ? 'PASS' : 'FAIL'
//       }`
//     );
//   });
// }

// runUnitTests();
