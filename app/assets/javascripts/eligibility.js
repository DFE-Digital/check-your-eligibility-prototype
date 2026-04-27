const eligibilityLookup = {
  "AB123456A": {
    eligibilityType: "targeted",
    eligibilityLabel: "Targeted free school meals",
    policyLabel: "Eligible targeted",
    tagClass: "govuk-tag--purple",
    eligibilityMessage: "This child is eligible for free school meals and additional support.",
    endDate: "31 August 2027",
    academicYear: "2026 to 2027",
    recheckDate: "Summer term 2027"
  },

  "CD123456C": {
    eligibilityType: "expanded",
    eligibilityLabel: "Expanded free school meals",
    policyLabel: "Eligible expanded",
    tagClass: "govuk-tag--green",
    eligibilityMessage: "This child is eligible for free school meals only.",
    endDate: "31 August 2027",
    academicYear: "2026 to 2027",
    recheckDate: "Summer term 2027"
  },

  "PN123456D": {
    eligibilityType: "notEligible",
    eligibilityLabel: "Not eligible",
    policyLabel: "Not eligible",
    tagClass: "govuk-tag--red",
    eligibilityMessage: "This child is not eligible for free school meals.",
    endDate: "31 August 2026",
    academicYear: "2026 to 2027",
    recheckDate: ""
  }
}