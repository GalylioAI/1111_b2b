/* Mock data powering the 1111 Dashboard demo. */

export const visitsData = [
  { day: 1, value: 152 },
  { day: 3, value: 168 },
  { day: 5, value: 159 },
  { day: 7, value: 178 },
  { day: 9, value: 196 },
  { day: 11, value: 188 },
  { day: 13, value: 212 },
  { day: 15, value: 220 },
  { day: 17, value: 205 },
  { day: 19, value: 224 },
  { day: 21, value: 248 },
  { day: 23, value: 236 },
  { day: 25, value: 252 },
  { day: 27, value: 231 },
  { day: 29, value: 214 },
  { day: 30, value: 226 },
];

/* The peak callout shown in the screenshot */
export const visitsPeak = {
  day: 15,
  label: "This month",
  value: "220,342,123",
  month: "May",
};

export const perpetual = {
  total: "5,824,213",
  label: "Label",
  segments: [
    { name: "Google.com inc", users: "3,124,213 users", pct: 54, color: "var(--accent)" },
    { name: "Recommended flow", users: "1,523,151 users", pct: 26, color: "var(--accent-2)" },
    { name: "Other", users: "948,213 users", pct: 20, color: "var(--accent-3)" },
  ],
};

export const activePercentage = {
  total: 594,
  online: 179,
  offline: 394,
};

export const socialTrading = [
  { name: "Google", kind: "Stock trading", badge: "G", color: "#4285F4" },
  { name: "Foursquare", kind: "Stock trading", badge: "F", color: "#F94877" },
  { name: "Kickstarter", kind: "Stock trading", badge: "K", color: "#2BDE73" },
  { name: "Google", kind: "Stock trading", badge: "G", color: "#FBBC05" },
];

export const income = {
  pct: 46,
  delta: "+35%",
  label: "Legend",
};

export const kpis = [
  { label: "Total Revenue", value: "$284.4k", delta: "+12.4%", up: true },
  { label: "Active Users", value: "48,210", delta: "+8.1%", up: true },
  { label: "Conversion", value: "3.42%", delta: "-0.6%", up: false },
  { label: "Avg. Session", value: "4m 18s", delta: "+5.2%", up: true },
];

export const analyticsBars = [
  { name: "Mon", web: 42, mobile: 28 },
  { name: "Tue", web: 55, mobile: 36 },
  { name: "Wed", web: 48, mobile: 31 },
  { name: "Thu", web: 67, mobile: 44 },
  { name: "Fri", web: 72, mobile: 52 },
  { name: "Sat", web: 58, mobile: 61 },
  { name: "Sun", web: 50, mobile: 47 },
];

export const trafficSources = [
  { name: "Organic Search", pct: 42, color: "var(--accent)" },
  { name: "Direct", pct: 28, color: "var(--accent-2)" },
  { name: "Social", pct: 18, color: "var(--accent-3)" },
  { name: "Referral", pct: 12, color: "var(--surface-3)" },
];

export const events = [
  {
    title: "Product Strategy Sync",
    time: "09:00 — 10:00",
    date: "Mon, Jun 8",
    tag: "Meeting",
    color: "var(--accent)",
    people: ["BC", "AK", "MR"],
  },
  {
    title: "Q2 Growth Review",
    time: "11:30 — 12:30",
    date: "Mon, Jun 8",
    tag: "Review",
    color: "var(--good)",
    people: ["JT", "SP"],
  },
  {
    title: "Mobile Release v2.4",
    time: "14:00 — 15:00",
    date: "Tue, Jun 9",
    tag: "Release",
    color: "var(--warn)",
    people: ["DM", "AK", "BC", "RP"],
  },
  {
    title: "Investor Update Call",
    time: "16:30 — 17:00",
    date: "Wed, Jun 10",
    tag: "Call",
    color: "var(--danger)",
    people: ["BC"],
  },
  {
    title: "Design System Workshop",
    time: "10:00 — 12:00",
    date: "Thu, Jun 11",
    tag: "Workshop",
    color: "var(--accent-2)",
    people: ["MR", "SP", "JT"],
  },
];

export const messages = [
  {
    name: "Annette Black",
    initials: "AB",
    color: "#6c5ce7",
    preview: "The new dashboard handoff looks incredible — shipping today?",
    time: "2m",
    unread: 2,
    online: true,
  },
  {
    name: "Cody Fisher",
    initials: "CF",
    color: "#2BDE73",
    preview: "Pushed the chart animation tweaks to staging.",
    time: "18m",
    unread: 0,
    online: true,
  },
  {
    name: "Jenny Wilson",
    initials: "JW",
    color: "#F94877",
    preview: "Can we sync on the mobile breakpoints tomorrow?",
    time: "1h",
    unread: 1,
    online: false,
  },
  {
    name: "Robert Fox",
    initials: "RF",
    color: "#FBBC05",
    preview: "Sent over the Q2 numbers for the income widget.",
    time: "3h",
    unread: 0,
    online: false,
  },
  {
    name: "Kristin Watson",
    initials: "KW",
    color: "#4285F4",
    preview: "Love the dark mode — the transitions feel so smooth.",
    time: "5h",
    unread: 0,
    online: true,
  },
];
