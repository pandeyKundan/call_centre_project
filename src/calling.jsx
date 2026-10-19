import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';

// Human-to-human: WebRTC audio via PeerJS (public signalling server, no own backend).
export function usePeerCall() {
  const [id, setId] = useState('');
  const [status, setStatus] = useState('idle');
  const peer = useRef(null), cur = useRef(null), audio = useRef(new Audio());

  const wire = (c, s) => {
    cur.current = c; setStatus(s);
    c.on('stream', (r) => { audio.current.srcObject = r; audio.current.play(); setStatus('connected'); });
    c.on('close', () => setStatus('idle'));
    c.on('error', () => setStatus('error'));
  };
  useEffect(() => {
    const p = new Peer();
    peer.current = p;
    p.on('open', setId);
    p.on('call', async (c) => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ audio: true });
        c.answer(s); wire(c, 'connecting');
      } catch { setStatus('mic blocked'); }
    });
    return () => p.destroy();
  }, []);

  const dial = async (to) => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ audio: true });
      wire(peer.current.call(to.trim(), s), 'ringing');
    } catch { setStatus('mic blocked'); }
  };
  const hang = () => { cur.current?.close(); setStatus('idle'); };
  return { id, status, dial, hang };
}

// AI-to-human: in-browser voice agent (speech synthesis + speech recognition).
// For real phone numbers, swap `reply()` for a Vapi / Twilio call (see README).
const SCRIPT = [
  'Hello, this is Avani from The Sleep Company. Am I speaking with the customer?',
  'Great. You enquired about the orthopaedic mattress. What is your budget?',
  'Understood. We have EMI options and a 100 night trial. Shall I book a store visit?',
  'Perfect, I have noted it. Thank you for your time. Goodbye!',
];
export function useAICall() {
  const [log, setLog] = useState([]);
  const [step, setStep] = useState(-1);
  const speak = (text) => {
    setLog((l) => [...l, { ai: true, text }]);
    if ('speechSynthesis' in window) window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  };
  const start = () => { setLog([]); setStep(0); speak(SCRIPT[0]); };
  const answer = (text) => {
    if (!text.trim() || step < 0 || step >= SCRIPT.length - 1) return;
    setLog((l) => [...l, { ai: false, text }]);
    setStep(step + 1); speak(SCRIPT[step + 1]);
  };
  const listen = () => {
    const R = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!R) return alert('Speech recognition needs Chrome. Type your reply instead.');
    const r = new R(); r.lang = 'en-IN';
    r.onresult = (e) => answer(e.results[0][0].transcript);
    r.start();
  };
  const end = () => { window.speechSynthesis?.cancel(); setStep(-1); };
  return { log, step, start, answer, listen, end, done: step >= SCRIPT.length - 1 && step >= 0 };
}

export function CallPage({ target }) {
  const p = usePeerCall(), ai = useAICall();
  const [to, setTo] = useState(''), [txt, setTxt] = useState('');
  return (
    <div className="stack">
      <div className="card"><h3>Human to human call {target && <small>· calling back {target}</small>}</h3>
        <p className="muted">Open this app in two tabs or devices. Share your ID, paste theirs, press Call.</p>
        <p>Your ID: <code>{p.id || 'connecting…'}</code> <button className="chip" onClick={() => navigator.clipboard.writeText(p.id)}>Copy</button></p>
        <div className="row"><input placeholder="Paste the other person’s ID" value={to} onChange={(e) => setTo(e.target.value)} />
          <button className="btn" disabled={!to} onClick={() => p.dial(to)}>Call</button>
          <button className="btn red" onClick={p.hang}>Hang up</button></div>
        <p>Status: <b>{p.status}</b></p>
      </div>
      <div className="card"><h3>AI to human practice call</h3>
        <p className="muted">Avani, the AI agent, speaks and listens. Answer with the mic or type.</p>
        <div className="row"><button className="btn" onClick={ai.start}>Start AI call</button>
          <button className="btn ghost" onClick={ai.listen} disabled={ai.step < 0}>🎙 Speak</button>
          <button className="btn red" onClick={ai.end}>End</button></div>
        <div className="log">{ai.log.map((l, i) => <div key={i} className={l.ai ? 'b l' : 'b r'}>{l.text}</div>)}</div>
        <div className="row"><input placeholder="Type your reply" value={txt} onChange={(e) => setTxt(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { ai.answer(txt); setTxt(''); } }} /></div>
      </div>
    </div>
  );
}
