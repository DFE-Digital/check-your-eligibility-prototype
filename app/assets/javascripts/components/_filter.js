// filter.js

// Function to apply filters
function filterResults() {
    // Get the keyword filter
    const keyword = document.getElementById("keywords").value.toLowerCase();

    // Get the selected date range (radio buttons)
    const dateRange = document.querySelector('input[name="changedName"]:checked').value;

    // Get the selected statuses (checkboxes)
    const selectedStatuses = Array.from(document.querySelectorAll('input[name="type"]:checked')).map(cb => cb.value);

    // Implement your filter logic here
    console.log('Keyword:', keyword);
    console.log('Date Range:', dateRange);
    console.log('Selected Statuses:', selectedStatuses);

    // TODO: Add your filtering logic based on the above values
  }