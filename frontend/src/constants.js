export const PHISHING_INTERACTIONS = {
  EMAIL_OPENED: 'EMAIL_OPENED',
  INSPECT_SENDER: 'INSPECT_SENDER',
  REPORT_PHISHING: 'REPORT_PHISHING',
  LEGIT_LINK_CLICKED: 'LEGIT_LINK_CLICKED',
  FAKE_LINK_CLICKED: 'FAKE_LINK_CLICKED',
  CREDENTIALS_ENTERED: 'CREDENTIALS_ENTERED',
  REPORTED_LEGIT_AS_PHISHING: 'REPORTED_LEGIT_AS_PHISHING', // false positive — reported a legit email as phishing
  MISSED_PHISHING: 'MISSED_PHISHING',                        // false negative — marked a phishing email as safe
  MARKED_AS_SAFE: 'MARKED_AS_SAFE',                          // correctly identified a legitimate email
};

const DEFAULT_API_BASE_URL = 'http://localhost:5000/api';
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/$/, '');
