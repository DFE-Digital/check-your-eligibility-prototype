function filterResults() {
    // Get the keyword input value
    const keywords = document.getElementById('keywords').value;

    // Log the keyword to the console (for testing)
    console.log('Keywords:', keywords);

    // Here you would typically filter your data based on the keyword
    // For example, call a function to filter a table or update the UI
    filterDataByKeywords(keywords);
  }

  function filterDataByKeywords(keywords) {
    // Example logic to filter data (replace this with your actual data filtering logic)
    const data = [
      { name: 'Alice', description: 'Loves apples' },
      { name: 'Bob', description: 'Enjoys bananas' },
      { name: 'Charlie', description: 'Collects cherries' }
    ];

    const filteredData = data.filter(item =>
      item.description.toLowerCase().includes(keywords.toLowerCase())
    );

    // Display the filtered data (this is just a placeholder)
    console.log('Filtered Data:', filteredData);
  }

// app/javascripts/components/filter.js
function filterResults() {
    // Get the keyword input value
    const keywords = document.getElementById('keywords').value;
    const dateRange = document.querySelector('input[name="dateRange"]:checked');
    const statusCheckboxes = document.querySelectorAll('input[name="status"]:checked');

    // Get table rows
    const rows = document.querySelectorAll('#resultsTable tbody tr');

    // Define a function to check if a row matches the filters
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const childName = cells[1].textContent.toLowerCase();
        const dateSubmitted = new Date(cells[3].textContent);
        const status = cells[4].textContent.toLowerCase();

        // Match keyword
        const matchesKeyword = childName.includes(keyword);

        // Match date range (this is just an example, customize as needed)
        let matchesDateRange = true;
        if (dateRange) {
            const rangeValue = dateRange.value;
            const today = new Date();
            if (rangeValue === "month") {
                matchesDateRange = dateSubmitted >= new Date(today.getFullYear(), today.getMonth() - 1, 1);
            } else if (rangeValue === "6months") {
                matchesDateRange = dateSubmitted >= new Date(today.getFullYear(), today.getMonth() - 6, 1);
            } else if (rangeValue === "12months") {
                matchesDateRange = dateSubmitted >= new Date(today.getFullYear(), today.getMonth() - 12, 1);
            } else if (rangeValue === "2years") {
                matchesDateRange = dateSubmitted <= new Date(today.getFullYear() - 2, today.getMonth(), today.getDate());
            }
        }
        //status

        // Extract the values of the checked checkboxes
        const selectedStatuses = Array.from(statusCheckboxes).map(checkbox => checkbox.value);

        // Log the selected statuses to the console
        console.log(selectedStatuses);


        // You can also use the selectedStatuses array as needed
        // For example, display them in an alert
        alert('Selected statuses: ' + selectedStatuses.join(', '));

        // Match status
        let matchesStatus = statusCheckboxes.length === 0; // Show if no status is selected
        statusCheckboxes.forEach(checkbox => {
            if (status.includes(checkbox.value.toLowerCase())) {
                matchesStatus = true;
            }
        });

        // Final visibility check
        if (matchesKeyword && matchesDateRange && matchesStatus) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    }
);
}

// Initial filtering can be applied here if needed
document.addEventListener('DOMContentLoaded', function () {
    // Attach event listeners to the filters
    document.querySelectorAll('.govuk-input, .govuk-radios__input, .govuk-checkboxes__input').forEach(input => {
        input.addEventListener('input', filterResults);
    });
});
