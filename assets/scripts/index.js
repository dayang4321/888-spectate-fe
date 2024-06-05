document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('lotto_form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const drawDateInput = document.getElementById('drawDate').value;
    const inputDate = new Date(drawDateInput);
    const resultsTableBody = document.getElementById('results_list');

    const drawDates = getLottoDrawDates(inputDate);
    let hasHighlightedRow = false;

    // Remove existing highlight class from any previously highlighted row
    resultsTableBody
      .querySelector('tr.highlight')
      ?.classList.remove('highlight');

    // Remove 'fade-in' class from all td cells to reset previous transitions
    resultsTableBody.querySelectorAll('td.fade-in').forEach((cell) => {
      cell.classList.remove('fade-in');
    });

    drawDates.forEach((drawDate, idx) => {
      const drawDateString = drawDate.toLocaleString('en-IE', {
        timeZone: 'Europe/Dublin',
        dateStyle: 'short',
      });

      // Check if the draw date is in the past or future
      const now = new Date();
      const pastOrFuture = drawDate < now ? 'Past' : 'Future';

      // Highlight the first future draw date
      const row = resultsTableBody.children[idx];
      if (pastOrFuture === 'Future' && !hasHighlightedRow) {
        row.classList.add('highlight');
        hasHighlightedRow = true;
      }

      const dataCells = row.querySelectorAll('td');

      dataCells[0].textContent = drawDateString;
      dataCells[1].textContent = pastOrFuture;

      // Add 'fade-in' class to each cell with a delay for a staggered animation effect
      setTimeout(() => {
        dataCells.forEach((cell) => {
          cell.classList.add('fade-in');
        });
      }, 200 * idx);
    });
  });
});
