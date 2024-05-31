document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('lotto_form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const drawDateInput = document.getElementById('drawDate').value;
    const inputDate = new Date(drawDateInput);
  });
});
