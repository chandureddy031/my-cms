/**
 * Reports listed on /website/reports. Set `file` to the PDF path (e.g. "/assets/annual-report-2025-26.pdf")
 * once it is uploaded to public/assets; until then the button says the report is coming soon.
 */
export interface WebsiteReport {
  id: string;
  year: string;
  title: string;
  summary: string;
  file?: string;
}

export const WEBSITE_REPORTS: WebsiteReport[] = [
  { id: "annual-2025-26", year: "2025–26", title: "Annual Report 2025–26", summary: "Programmes, outreach and results across all six programmes." },
  { id: "annual-2024-25", year: "2024–25", title: "Annual Report 2024–25", summary: "Programmes, outreach and results across all six programmes." },
  { id: "audit-2024-25", year: "2024–25", title: "Audited Financial Statements 2024–25", summary: "Balance sheet, income and expenditure, and the auditor's report." },
  { id: "itr-2024-25", year: "2024–25", title: "Income Tax Return 2024–25", summary: "Filed return and acknowledgement for the financial year." },
  { id: "programme-elder-care", year: "2024–25", title: "Programme Report: Elder Care", summary: "Family reintegration, day care and home visits for elders." },
];
