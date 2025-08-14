accessibleAutocomplete.enhanceSelectElement({
    defaultValue: '',
    selectElement: document.querySelector('#school-picker')
});

document.addEventListener('DOMContentLoaded', function () {
    var container = document.querySelector('[data-module="moj-add-another"]');

    // Event delegation for add and remove buttons
    container.addEventListener('click', function (event) {
        if (event.target.classList.contains('moj-add-another__add-button')) {
            event.preventDefault(); // Prevent default action if needed
            addChild(); // Call function to add a new child
        }
        if (event.target.classList.contains('moj-add-another__remove-button')) {
            event.preventDefault(); // Prevent default action if needed
            removeChild(event.target); // Call function to remove a child
        }
    });

    function addChild() {
        // Logic to add a new child input section
        const currentCount = document.querySelectorAll('.moj-add-another__title').length;
        const newChildHTML = `
            <fieldset class="moj-add-another__item">
                <legend class="moj-add-another__title govuk-fieldset__legend--m">Child ${currentCount + 1}</legend>
                <div>
                    <label for="person[${currentCount}][first_name]" class="govuk-label">First name</label>
                    <input type="text" name="person[${currentCount}][first_name]" class="govuk-input" data-name="person[${currentCount}][first_name]" data-id="person[${currentCount}][first_name]"/>
                </div>
                <div>
                    <label for="person[${currentCount}][last_name]" class="govuk-label">Last name</label>
                    <input type="text" name="person[${currentCount}][last_name]" class="govuk-input" data-name="person[${currentCount}][last_name]" data-id="person[${currentCount}][last_name]"/>
                </div>
                <div>
                    <label class="govuk-label">Date of birth</label>
                    <div>
                        <input type="text" name="person[${currentCount}][dob][day]" class="govuk-input" data-name="person[${currentCount}][dob][day]" placeholder="Day"/>
                        <input type="text" name="person[${currentCount}][dob][month]" class="govuk-input" data-name="person[${currentCount}][dob][month]" placeholder="Month"/>
                        <input type="text" name="person[${currentCount}][dob][year]" class="govuk-input" data-name="person[${currentCount}][dob][year]" placeholder="Year"/>
                    </div>
                </div>
                <button type="button" class="govuk-button moj-add-another__remove-button">Remove this child</button>
            </fieldset>
        `;
        container.insertAdjacentHTML('beforeend', newChildHTML);
        updateLegends(); // Update legends after adding a new child
    }

    function removeChild(button) {
        // Logic to remove the child input section
        const fieldset = button.closest('fieldset');
        if (fieldset) {
            fieldset.remove();
            updateLegends(); // Update legends after removing a child
        }
    }

    function updateLegends() {
        const legends = document.querySelectorAll('.moj-add-another__title');
        legends.forEach(function (legend, index) {
            legend.innerHTML = `Child ${index + 1}`; // Update legend to reflect current count
        });
    }
});

// child-details.js
const remainder = 10 % 3; // remainder will be 1
console.log(remainder);
// This file contains JavaScript specific to the child details page.