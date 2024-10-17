function filterResults() {

  const keywords = document.getElementById('keywords').value.toLowerCase();
  const selectedStatuses = Array.from(document.querySelectorAll('input[name="status"]:checked'))
                               .map(checkbox => checkbox.value.toLowerCase());

  const rows = document.querySelectorAll('#resultsTable tbody tr');
  let visibleCount = 0;

  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    if (cells.length < 5) return; // Ensure enough cells exist

    const childName = cells[1].textContent.toLowerCase();
    const status = cells[4].textContent.toLowerCase();

    // Check for keyword matches
    const matchesKeyword = keywords === '' || childName.includes(keywords);

    // Check for status matches
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(status);

    // Show or hide the row based on matches
    if (matchesKeyword && matchesStatus) {
      row.classList.remove('hidden'); // Show row
      visibleCount++;
    } else {
      row.classList.add('hidden'); // Hide row
    }
  });

  // Update the visible count
  document.getElementById('resultCount').innerText = visibleCount;
}

// Debounce function to limit the number of calls to filterResults
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

document.addEventListener('DOMContentLoaded', function () {
  const debouncedFilter = debounce(filterResults, 300); // Adjust wait time as necessary

  // Attach event listeners to all checkbox inputs
  document.querySelectorAll('input[name="status"]').forEach(checkbox => {
    checkbox.addEventListener('change', debouncedFilter);
  });

  // Attach event listeners to the keyword input
  document.getElementById('keywords').addEventListener('input', debouncedFilter);
});

// Add console logs to help debug
console.log("Filter script loaded and event listeners attached.");
