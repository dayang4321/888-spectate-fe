document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('lotto_form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const drawDateInput = document.getElementById('drawDate').value;
    const inputDate = new Date(drawDateInput);
    const resultsTableBody = document.getElementById('results_list');
    const drawDates = getLottoDrawDates(inputDate);
    let hasHighlightedRow = false;
    resultsTableBody
      .querySelector('tr.highlight')
      ?.classList.remove('highlight');
    resultsTableBody.querySelectorAll('td.fade-in').forEach((cell) => {
      console.log('removed');
      cell.classList.remove('fade-in');
    });

    drawDates.forEach((drawDate, idx) => {
      const drawDateString = drawDate.toLocaleString('en-IE', {
        timeZone: 'Europe/Dublin',
        dateStyle: 'short',
      });
      const now = new Date();
      const pastOrFuture = drawDate < now ? 'Past' : 'Future';

      const row = resultsTableBody.children[idx];
      if (pastOrFuture === 'Future' && !hasHighlightedRow) {
        row.classList.add('highlight');
        hasHighlightedRow = true;
      }

      const dataCells = row.querySelectorAll('td');

      dataCells[0].textContent = drawDateString;
      dataCells[1].textContent = pastOrFuture;

      setTimeout(() => {
        dataCells.forEach((cell) => {
          cell.classList.add('fade-in');
        });
      }, 200 * idx);
    });
  });
});
