import { useState } from 'react';
import * as D from './data.js';

const Bars = ({ vals, fmt = (v) => v, color }) => {
  const max = Math.max(...vals);
  return (
    <div className="bars">{vals.map((v, i) => (
      <div key={i} className="bar"><span>{fmt(v)}</span>
        <i style={{ height: `${(v / max) * 80}px`, background: i === vals.length - 1 ? color : undefined }} /><em>{D.days[i]}</em></div>))}</div>
  );
};

export function Dashboard({ openLeads }) {
  return (
    <div className="stack">
      <div className="hero"><small>Good afternoon 👋</small><h2>{D.user.name}</h2><small>{D.user.org}</small>
        <div className="kpis">{D.kpis.map(([v, l]) => <div key={l}><b>{v}</b><span>{l}</span></div>)}</div></div>
      <div className="grid2">
        <div className="card earn"><small>My earnings this month</small><h2>₹5,200</h2>
          <div className="prog"><i style={{ width: '52%' }} /></div><small className="muted">52% of ₹10,000 target</small></div>
        <div className="card tasks"><h3>My tasks <span className="badge">3</span></h3>
          {D.tasks.map((t) => <button key={t.t} className="task" onClick={openLeads}>{t.i}<b>{t.t}</b><small>{t.s}</small></button>)}</div>
      </div>
      <div className="card"><h3>Who is waiting</h3>{D.waiting.map((w) => (
        <div className="item" key={w.n}><div><b>{w.n}</b><small>{w.s}</small></div><span className="tag">{w.t}</span></div>))}</div>
      <div className="card"><h3>Calls handled · last 7 days</h3><Bars vals={D.calls7} color="#1f8f6a" /></div>
      <div className="card"><h3>Chat trend · last 7 days</h3><Bars vals={D.chat7} fmt={(v) => v + '%'} color="#2b5fb4" /></div>
    </div>
  );
}

const PER = 2;
export function CallsToMake({ onCall }) {
  const [page, setPage] = useState(0), [open, setOpen] = useState(null);
  const sorted = [...D.leads].sort((a, b) => b.intent - a.intent);
  const pages = Math.ceil(sorted.length / PER);
  return (
    <div className="card"><h3>Planned outgoing calls</h3><small className="muted">Ranked by lead score</small>
      {sorted.slice(page * PER, page * PER + PER).map((l) => (
        <div key={l.id} className="rowx"><div className="item" onClick={() => setOpen(open === l.id ? null : l.id)}>
          <span className="av">{l.init}</span><div><b>{l.name}</b><small>{l.interest}</small></div><span className="tag">{l.intent}</span></div>
          {open === l.id && <div className="exp"><p>{l.need}</p><button className="btn" onClick={() => onCall(l.name)}>Call</button></div>}</div>))}
      <div className="pager"><button disabled={!page} onClick={() => setPage(page - 1)}>‹</button><small>Page {page + 1} of {pages}</small>
        <button disabled={page >= pages - 1} onClick={() => setPage(page + 1)}>›</button></div></div>
  );
}

export const Incoming = ({ onCall }) => (
  <div className="card"><h3>Missed calls</h3><small className="muted">Ranked by value at stake</small>
    <div className="sum"><b>{D.missed.length}</b> missed · <b>₹{D.missed.reduce((s, m) => s + m.v, 0).toLocaleString('en-IN')}</b> at stake</div>
    {[...D.missed].sort((a, b) => b.v - a.v).map((m) => (
      <div className="item" key={m.n + m.when}><div><b>{m.n}</b><small>{m.when} · {m.note}</small></div>
        <div className="end">{m.v > 0 && <b className="red">₹{m.v.toLocaleString('en-IN')}</b>}<button className="btn sm" onClick={() => onCall(m.n)}>Call back</button></div></div>))}</div>
);

export function Recent() {
  const [sel, setSel] = useState(null);
  return (
    <div className="card"><h3>Recent calls</h3><small className="muted">Tap a call to review it</small>
      {D.recent.map((r, i) => (<div key={i}><div className="item" onClick={() => setSel(sel === i ? null : i)}>
        <div><b>{r.n}</b><small>{r.type} · {r.when}</small></div><small>{r.len}</small></div>
        {sel === i && <div className="exp">Call review: {r.type.toLowerCase()} call lasting {r.len}. Greeting used in first 10 seconds.</div>}</div>))}</div>
  );
}

export function Calendar() {
  const [m, setM] = useState(new Date(2026, 9, 1)), today = new Date(2026, 9, 19);
  const y = m.getFullYear(), mo = m.getMonth(), first = new Date(y, mo, 1).getDay(), n = new Date(y, mo + 1, 0).getDate();
  const cells = [...Array(first).fill(null), ...Array.from({ length: n }, (_, i) => i + 1)];
  const key = (d) => `${y}-${String(mo + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  return (
    <div className="card cal"><div className="calhead"><button onClick={() => setM(new Date(y, mo - 1, 1))}>‹</button>
      <b>{m.toLocaleString('en', { month: 'long', year: 'numeric' })}</b>
      <button onClick={() => setM(new Date(today))}>Today</button><button onClick={() => setM(new Date(y, mo + 1, 1))}>›</button></div>
      <div className="g7">{['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <small key={i}>{d}</small>)}
        {cells.map((d, i) => (<div key={i} className={'day' + (d && y === 2026 && mo === 9 && d === 19 ? ' today' : '')} title={D.events[key(d)]}>
          {d}{d && D.events[key(d)] && <i />}</div>))}</div>
      <div className="muted">{Object.entries(D.events).map(([k, v]) => <div key={k}><small>{k} — {v}</small></div>)}</div></div>
  );
}

export function PulseHome({ openChannel }) {
  return (
    <div className="stack"><div className="pulse"><b>Pulse</b><small>{D.user.org}</small></div>
      <div className="avani"><b>AvaniBot</b><small>Ask about anything happening in Pulse.</small></div>
      <div className="card"><h3>Role agents</h3>{D.agents.map((a) => (
        <div className="item" key={a.n}><div><b># {a.n}</b><small>{a.s}</small></div><span className="tag">{a.p}</span></div>))}</div>
      <div className="card"><h3>Channels</h3>{D.channels.map((c) => (
        <div className="item" key={c.id} onClick={() => openChannel(c.id)}><div><b># {c.id}</b><small>{c.desc}</small></div>
          {c.unread > 0 && <span className="badge">{c.unread}</span>}</div>))}</div>
      <div className="kudos">⭐ Kudos · new</div></div>
  );
}

export function Channel({ id, back }) {
  const [msgs, setMsgs] = useState(D.seedMsgs), [txt, setTxt] = useState(''), [ask, setAsk] = useState(true), [reply, setReply] = useState('');
  const now = () => new Date().toLocaleTimeString('en', { hour: 'numeric', minute: '2-digit' }).toLowerCase().replace(' ', '');
  const send = (m) => m.trim() && setMsgs((x) => [...x, { id: Date.now(), who: 'You', t: now(), m, me: true }]);
  const answer = (a) => { send(a); setAsk(false); };
  return (
    <div className="chan"><div className="chhead"><button onClick={back}>←</button><b>#{id}</b></div>
      {ask && <div className="needs"><b>Needs your input <span className="badge">1</span></b><p>Confirm the 4:30pm callback</p>
        <div className="row"><button className="chip" onClick={() => answer('Confirmed')}>Confirmed</button>
          <button className="chip" onClick={() => answer('Reschedule')}>Reschedule</button></div>
        <div className="row"><input placeholder="Or type your answer" value={reply} onChange={(e) => setReply(e.target.value)} />
          <button className="btn sm" onClick={() => { answer(reply); setReply(''); }}>Send</button></div></div>}
      <div className="msgs">{msgs.map((x) => (<div key={x.id} className={'msg ' + (x.me ? 'me' : '')}>
        {!x.me && <small><b>{x.who}</b> {x.t}</small>}<div className="bub">{x.m}</div>{x.me && <small>{x.t}</small>}</div>))}</div>
      <div className="row"><input placeholder={`Message #${id}`} value={txt} onChange={(e) => setTxt(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') { send(txt); setTxt(''); } }} /></div></div>
  );
}

export function LeadsModal({ close }) {
  const [i, setI] = useState(0), [open, setOpen] = useState(true), l = D.leads[i];
  return (
    <div className="overlay" onClick={close}><div className="modal" onClick={(e) => e.stopPropagation()}>
      <div className="mhead"><span>Leads · {i + 1} of {D.leads.length}</span><button onClick={close}>✕</button></div>
      <div className="mbody"><div className="item"><span className="av">{l.init}</span><div><b>{l.name}</b><small>{l.interest}</small></div><span className="tag">{l.left}</span></div>
        <div className="need">{l.need}</div>
        <div className="meter"><span>ICP</span><div className="prog"><i style={{ width: l.icp + '%' }} /></div><b>{l.icp}%</b></div>
        <div className="meter"><span>Lead intent score</span><b>{l.intent}</b></div>
        <button className="fold" onClick={() => setOpen(!open)}>Where we picked up signals {open ? '▴' : '▾'}</button>
        {open && l.signals.map(([k, v]) => <div className="sig" key={k}><b>{k}</b><em>{v}</em></div>)}</div>
      <div className="pager"><button disabled={!i} onClick={() => setI(i - 1)}>‹ Previous</button>
        <button disabled={i >= D.leads.length - 1} onClick={() => setI(i + 1)}>Next ›</button></div></div></div>
  );
}
