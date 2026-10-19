# On-Ground.ai · Call Centre App

React + Vite rebuild of the Call Centre app. Sample data only (`src/data.js`), no backend.

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Stack and why
React 18 + Vite for fast setup, PeerJS for WebRTC calling, plain CSS to stay close to the mock. Bars are drawn with CSS (no chart library).

## Done
App shell (sidebar, top bar, mobile menu), Dashboard, Plan (Calls to make with paging and expandable rows, Incoming, Recent), Calendar (month switcher, Today, event dots), Pulse home, channel chat, Leads modal with paging and collapsible signals.
Bonus: send messages in a channel, "Needs your input" card, Call back and practise a call, phone-width layout.

## Calling (required feature)
- **Human to human:** WebRTC audio through PeerJS. Each tab gets a peer ID from the public PeerJS signalling server. Open two tabs or devices, paste the other ID, press Call. Mic permission needed. Code: `src/calling.jsx` → `usePeerCall`.
- **AI to human:** an in-browser voice agent (Avani) using `speechSynthesis` to talk and `SpeechRecognition` (Chrome) or typing to hear the answer. Code: `useAICall`.
- **Next step for real phone calls:** replace `useAICall` with Vapi or Twilio Voice and a small server that starts the call.

## Skipped
Persistent storage, auth, real PSTN calls, DEMO strip and dial button.

## AI tools used
Claude (Anthropic) helped generate the first draft. I reviewed, ran and can explain every file.
