// Sample data only. No backend.
export const user = { name: 'Arvind Rajan', org: 'The Sleep Company · Call Centre' };
export const kpis = [['70', 'Calls today'], ['4m 12s', 'Avg handle time'], ['94%', 'Chat today'], ['2', 'In queue']];
export const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const calls7 = [18, 22, 15, 24, 21, 12, 25];
export const chat7 = [88, 90, 89, 92, 91, 93, 94];
export const waiting = [
  { n: 'Priya Iyer', s: 'Asked about lifting beds — biggest order', t: 'Hot' },
  { n: 'Suresh Nair', s: 'Free upgrade enquiry', t: 'Warm' },
];
export const tasks = [
  { i: '📞', t: '2 callbacks', s: 'due in 4 hours' },
  { i: '🔥', t: '2 hot leads', s: 'open the lead cards' },
  { i: '✅', t: '1 outcome', s: 'waiting to be logged' },
];
export const leads = [
  { id: 1, name: 'Mukunda', init: 'MK', interest: 'Orthopaedic mattress · ₹55,200', value: 55200, icp: 87, intent: 91, left: '2h left', need: 'Quote to be given to customer',
    signals: [['Financing related', 'Asked about EMI options on the Ortho ORIO — budget is a live concern.'],
              ['Quotation demanded', 'Compared pricing with a competitor and expects a competitive number.'],
              ['Warranty related', 'Has not raised this yet — worth mentioning the 100-night trial.']] },
  { id: 2, name: 'Ritu S.', init: 'RS', interest: 'Mattress and bed frame · ₹72,000', value: 72000, icp: 74, intent: 80, left: '5h left', need: 'Send brochure on WhatsApp',
    signals: [['Delivery related', 'Needs delivery before Diwali.'], ['Size related', 'Unsure between king and queen.']] },
  { id: 3, name: 'Faizan A.', init: 'FA', interest: 'Recliner · ₹98,000', value: 98000, icp: 69, intent: 62, left: '1d left', need: 'Confirm store visit',
    signals: [['Visit related', 'Wants to test the recliner in store this weekend.']] },
];
export const missed = [
  { n: 'Faizan A.', when: 'Today 10:04 AM', note: 'Called 3 times', v: 98000 },
  { n: 'Kavitha R.', when: 'Yesterday 4:45 PM', note: 'Wants a callback', v: 24000 },
  { n: 'Divya P.', when: 'Yesterday 2:10 PM', note: 'Asked about warranty', v: 78000 },
  { n: 'Ritu S.', when: 'Yesterday 11:20 AM', note: 'Voicemail left', v: 72000 },
  { n: 'Unknown', when: 'Yesterday', note: 'No lead match', v: 0 },
];
export const recent = [
  { n: 'Mukunda', type: 'Outgoing', when: '10:30 AM', len: '4m 20s' },
  { n: 'Kavitha R.', type: 'Missed', when: 'Yesterday', len: '—' },
  { n: 'Ritu S.', type: 'Outgoing', when: 'Today 11:20', len: '2m 05s' },
  { n: 'Faizan A.', type: 'Incoming', when: 'Today 9:40', len: '6m 11s' },
  { n: 'Divya P.', type: 'Incoming', when: 'Yesterday', len: '3m 02s' },
];
export const events = { '2026-10-23': 'Team QA review', '2026-10-26': 'Follow-up: Mukunda', '2026-10-28': 'Store visit: Faizan' };
export const channels = [
  { id: 'callcentre-team', desc: 'Call Centre team', unread: 2 },
  { id: 'customer-discussions', desc: 'Shared with WhatsApp business', unread: 0 },
];
export const agents = [
  { n: 'callcentre-agent', s: 'Your daily coach', p: '24%' }, { n: 'upsell-agent', s: 'Spots upgrade chances', p: '61%' },
  { n: 'lead-conversion-agent', s: 'Nudges hot leads', p: '35%' }, { n: 'capture-agent', s: 'Captures shopper details', p: '78%' },
];
export const seedMsgs = [
  { id: 1, who: 'Sunita Rao', t: '1:08pm', m: '👥 STAKEHOLDERS: @You (Arvind R.), whole call centre shift' },
  { id: 2, who: 'Sunita Rao', t: '1:09pm', m: '📋 ISSUE: Greeting-in-first-10s QA score is at 71% this week, below our 85% target.' },
  { id: 3, who: 'Sunita Rao', t: '1:09pm', m: '💡 SUGGESTION: Let’s push that up — open every call with the greeting script. I’ll check back Friday.' },
  { id: 4, who: 'You', t: '1:10pm', m: 'On it! Will make sure I open every call with the greeting script 💪', me: true },
];
