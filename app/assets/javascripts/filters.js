// ---------------------------------------------------------------
// FSM search filters
// Filtering only runs on "Apply filters" click, never on change.
// ---------------------------------------------------------------

var ROWS_PER_PAGE = 15;
var currentPage = 1;

document.addEventListener('DOMContentLoaded', function () {
  var applyBtn = document.getElementById('applyFilter');
  if (applyBtn) {
    applyBtn.addEventListener('click', function () { render(1); });
  }

  // Run once on load so archived rows are hidden by default,
  // per "archived hidden unless archived filter selected".
  render(1);
});

// Checkbox value -> possible data-status text on the row.
// Anything marked UNCONFIRMED hasn't been seen in your table data yet —
// check the exact tag text once you have rows using that status.
var statusMap = {
  'not-entitled': ['Not entitled'],
  'eligible-targeted': ['Eligible targeted'],
  'eligible-expanded': ['Eligible expanded'],
  'eligible-2025-2026': ['Eligible 2025/2026', 'Eligible (2025-2026)'], // UNCONFIRMED
  'receiving-expanded-fsm': ['Receiving expanded FSM'],
  'receiving-targeted-fsm': ['Receiving targeted FSM'],
  'receiving-entitlement-2025-2026': ['Receiving entitlement 2025/2026', 'Receiving entitlement (2025-2026)'], // UNCONFIRMED
  'evidence-needed': ['Upload evidence'],
  'sent-for-review': ['Review application'],
  'reviewed-not-entitled': ['Not entitled after review'] // UNCONFIRMED
};

var dateRangeLabels = {
  'date-range': 'Custom date range',
  'current': 'Current academic year',
  'previous': 'Previous academic year'
};

var tagEls = {
  kwWrap: null, kwList: null,
  dateWrap: null, dateList: null,
  stWrap: null, stList: null
};

function cacheTagEls() {
  tagEls.kwWrap = document.getElementById('selected-keyword-container');
  tagEls.kwList = document.getElementById('selected-keyword');
  tagEls.dateWrap = document.getElementById('selected-submission-date-range-container');
  tagEls.dateList = document.getElementById('selected-submission-date-range');
  tagEls.stWrap = document.getElementById('selected-status-container');
  tagEls.stList = document.getElementById('selected-status');
}

function getFilters() {
  var keyword = (document.getElementById('keywords').value || '').trim().toLowerCase();

  var appTypeInput = document.querySelector('input[name="custom-application-type"]:checked');
  var appType = appTypeInput ? appTypeInput.value : 'active'; // default: active-only view

  var statusChecked = Array.prototype.slice
    .call(document.querySelectorAll('input[name="customStatus"]:checked'))
    .map(function (el) { return el.value; });

  var dateRangeInput = document.querySelector('input[name="custom-date-range"]:checked');
  var dateRangeType = dateRangeInput ? dateRangeInput.value : null; // 'date-range' | 'current' | 'previous' | null

  var customFrom = readDateFields('submission-date-from');
  var customTo = readDateFields('submission-date-to');

  return { keyword: keyword, appType: appType, statusChecked: statusChecked, dateRangeType: dateRangeType, customFrom: customFrom, customTo: customTo };
}

function readDateFields(idPrefix) {
  var day = document.getElementById(idPrefix + '-day');
  var month = document.getElementById(idPrefix + '-month');
  var year = document.getElementById(idPrefix + '-year');
  if (!day || !month || !year || !day.value || !month.value || !year.value) return null;
  var d = new Date(parseInt(year.value, 10), parseInt(month.value, 10) - 1, parseInt(day.value, 10));
  return isNaN(d.getTime()) ? null : d;
}

function getAcademicYearBounds(offsetYears) {
  var now = new Date();
  var y = now.getFullYear();
  var m = now.getMonth() + 1; // 1-12
  var startYear = (m >= 9 ? y : y - 1) + offsetYears;
  var start = new Date(startYear, 8, 1);       // 1 Sept
  var end = new Date(startYear + 1, 7, 31, 23, 59, 59); // 31 Aug, end of day
  return { start: start, end: end };
}

function matchesKeyword(row, filters) {
  if (!filters.keyword) return true;
  return row.textContent.toLowerCase().indexOf(filters.keyword) !== -1;
}

function matchesAppType(row, filters) {
  var rowType = row.getAttribute('data-application-type') || 'active';
  if (filters.appType === 'archived') return rowType === 'archived';
  if (filters.appType === 'custom-search') return true; // custom search ignores active/archived
  return rowType !== 'archived'; // default/'active'
}

function matchesStatus(row, filters) {
  if (filters.appType !== 'custom-search') return true; // active/archived modes don't use status checkboxes
  if (filters.statusChecked.length === 0) return false; // custom search with nothing ticked = show nothing
  var rowStatus = row.getAttribute('data-status');
  if (!rowStatus) return false;
  return filters.statusChecked.some(function (value) {
    var possible = statusMap[value] || [];
    return possible.some(function (text) { return text.toLowerCase() === rowStatus.toLowerCase(); });
  });
}

function matchesDateRange(row, filters) {
  if (!filters.dateRangeType) return true;
  var raw = row.getAttribute('data-submission-date');
  if (!raw) return true;
  var rowDate = new Date(raw + 'T00:00:00');
  if (isNaN(rowDate.getTime())) return true;

  if (filters.dateRangeType === 'current') {
    var cur = getAcademicYearBounds(0);
    return rowDate >= cur.start && rowDate <= cur.end;
  }
  if (filters.dateRangeType === 'previous') {
    var prev = getAcademicYearBounds(-1);
    return rowDate >= prev.start && rowDate <= prev.end;
  }
  if (filters.dateRangeType === 'date-range') {
    if (filters.customFrom && rowDate < filters.customFrom) return false;
    if (filters.customTo && rowDate > filters.customTo) return false;
    return true;
  }
  return true;
}

function rowMatches(row, filters) {
  return matchesKeyword(row, filters)
    && matchesAppType(row, filters)
    && matchesStatus(row, filters)
    && matchesDateRange(row, filters);
}

// ---------------------------------------------------------------
// Selected filter chips
// ---------------------------------------------------------------

function updateTags(filters) {
  if (!tagEls.kwList) cacheTagEls();
  if (!tagEls.kwList) return; // panel markup not present on this page

  tagEls.kwList.innerHTML = '';
  tagEls.dateList.innerHTML = '';
  tagEls.stList.innerHTML = '';
  tagEls.kwWrap.style.display = 'none';
  tagEls.dateWrap.style.display = 'none';
  tagEls.stWrap.style.display = 'none';

  if (filters.keyword) {
    tagEls.kwList.innerHTML = chipHtml(filters.keyword, "removeTag('keyword')");
    tagEls.kwWrap.style.display = 'block';
  }

  if (filters.dateRangeType) {
    var label = dateRangeLabels[filters.dateRangeType] || filters.dateRangeType;
    tagEls.dateList.innerHTML = chipHtml(label, "removeTag('date')");
    tagEls.dateWrap.style.display = 'block';
  }

  if (filters.statusChecked.length) {
    filters.statusChecked.forEach(function (code) {
      var text = (statusMap[code] && statusMap[code][0]) || code;
      tagEls.stList.innerHTML += chipHtml(text, "removeTag('" + code + "')");
    });
    tagEls.stWrap.style.display = 'block';
  }
}

function chipHtml(label, onclick) {
  return '<li><button class="app-filter__tag moj-filter__tag" type="button" onclick="' + onclick + '">' +
    '<span class="govuk-visually-hidden">Remove this filter</span>' + label +
    '</button></li>';
}

function removeTag(which) {
  if (which === 'keyword') {
    document.getElementById('keywords').value = '';
  } else if (which === 'date') {
    document.querySelectorAll('input[name="custom-date-range"]').forEach(function (el) { el.checked = false; });
    ['submission-date-from-day', 'submission-date-from-month', 'submission-date-from-year',
     'submission-date-to-day', 'submission-date-to-month', 'submission-date-to-year'
    ].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.value = '';
    });
  } else {
    var cb = document.querySelector('input[name="customStatus"][value="' + which + '"]');
    if (cb) cb.checked = false;
  }
  render(1);
}
window.removeTag = removeTag; // called from inline onclick in chip buttons

// ---------------------------------------------------------------
// Render: filter, paginate, update counts, update chips
// ---------------------------------------------------------------

function render(page) {
  var table = document.getElementById('resultsTable') || document.querySelector('.govuk-table');
  if (!table) return;

  var rows = Array.prototype.slice.call(table.querySelectorAll('tbody tr'));
  var filters = getFilters();

  updateTags(filters);

  var matched = rows.filter(function (row) { return rowMatches(row, filters); });

  var totalPages = Math.max(1, Math.ceil(matched.length / ROWS_PER_PAGE));
  currentPage = Math.min(Math.max(1, page || 1), totalPages);

  var start = (currentPage - 1) * ROWS_PER_PAGE;
  var end = Math.min(currentPage * ROWS_PER_PAGE, matched.length);

  rows.forEach(function (row) { row.style.display = 'none'; });
  matched.forEach(function (row, idx) {
    if (idx >= start && idx < end) row.style.display = '';
  });

  var resultCountEl = document.getElementById('resultCount');
  var totalResultsEl = document.getElementById('totalResults');
  if (resultCountEl && totalResultsEl) {
    if (matched.length === 0) {
      resultCountEl.textContent = '0';
      totalResultsEl.textContent = rows.length;
    } else {
      resultCountEl.textContent = (start + 1) + '\u2013' + end;
      totalResultsEl.textContent = matched.length;
    }
  }

  wirePagination();
}

// NOTE: this reuses the existing static govukPagination markup and just
// intercepts clicks — it does not yet rebuild page numbers/ellipses based
// on the real matched-row total. Fine for prototype testing; if you need
// accurate page counts (e.g. "page 3 of 4" rather than a fixed "1 2 … 55"),
// that's a follow-on task, not covered here.
function wirePagination() {
  document.querySelectorAll('.govuk-pagination__link, .govuk-pagination__item a').forEach(function (link) {
    link.onclick = function (e) {
      e.preventDefault();
      var n = parseInt(link.textContent.trim(), 10);
      if (!isNaN(n)) render(n);
    };
  });
}

function clearFilters() {
  document.getElementById('keywords').value = '';

  document.querySelectorAll('input[name="custom-application-type"]').forEach(function (el) { el.checked = false; });
  document.querySelectorAll('input[name="customStatus"]').forEach(function (el) { el.checked = false; });
  document.querySelectorAll('input[name="custom-date-range"]').forEach(function (el) { el.checked = false; });

  ['submission-date-from-day', 'submission-date-from-month', 'submission-date-from-year',
   'submission-date-to-day', 'submission-date-to-month', 'submission-date-to-year'
  ].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.value = '';
  });

  render(1);
  return false; // stop the onclick="clearFilters()" anchor from navigating to "#"
}
window.clearFilters = clearFilters; // needs to be global — called from inline onclick in Filter.txt

// ---------------------------------------------------------------
// Toggle filters visibility
// ---------------------------------------------------------------

// document.addEventListener('DOMContentLoaded', function () {
//   var toggleBtn = document.getElementById('toggle-filters-btn');
//   var filterContent = document.querySelector('.moj-filter__content');

//   if (toggleBtn && filterContent) {
//     toggleBtn.addEventListener('click', function () {
//       var isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';

//       if (isExpanded) {
//         // Hide filters
//         filterContent.style.display = 'none';
//         toggleBtn.setAttribute('aria-expanded', 'false');
//         toggleBtn.textContent = 'Show filters';
//       } else {
//         // Show filters
//         filterContent.style.display = 'block';
//         toggleBtn.setAttribute('aria-expanded', 'true');
//         toggleBtn.textContent = 'Hide filters';
//       }
//     });
//   }
// });