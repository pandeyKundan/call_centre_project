import { useState } from 'react';
import { Dashboard, CallsToMake, Incoming, Recent, Calendar, PulseHome, Channel, LeadsModal } from './pages.jsx';
import { CallPage } from './calling.jsx';

const NAV = [['dash', 'Dashboard', '▦'], ['plan', 'Plan', '☎'], ['cal', 'Calendar', '▣'], ['pulse', 'Pulse', '✦']];
const SUB = [['make', 'Calls to make'], ['incoming', 'Incoming'], ['recent', 'Recent'], ['practice', 'Practise a call']];

export default function App() {
  const [page, setPage] = useState('dash'), [sub, setSub] = useState('make'), [chan, setChan] = useState(null);
  const [leads, setLeads] = useState(false), [target, setTarget] = useState(''), [menu, setMenu] = useState(false);
  const go = (p) => { setPage(p); setChan(null); setMenu(false); };
  const callBack = (n) => { setTarget(n); setPage('plan'); setSub('practice'); };
  const titles = { dash: 'Dashboard', plan: 'Planner', cal: 'Calendar', pulse: 'Pulse' };

  return (
    <div className="app">
      <aside className={menu ? 'side open' : 'side'}>
        <div className="logo">On-Ground.ai</div>
        {NAV.map(([k, l, ic]) => (<div key={k}>
          <button className={'nav ' + (page === k ? 'on' : '')} onClick={() => go(k)}><span>{ic}</span>{l}</button>
          {k === 'plan' && page === 'plan' && SUB.map(([s, sl]) => (
            <button key={s} className={'sub ' + (sub === s ? 'on' : '')} onClick={() => setSub(s)}>{sl}</button>))}</div>))}
      </aside>
      <div className="main">
        <header className="top"><button className="burger" onClick={() => setMenu(!menu)}>☰</button><b>On-Ground.ai</b>
          <span className="pills"><i className="dot r" /><i className="dot g" />★ 42<i className="dot a" /></span></header>
        <main className="content">
          <div className="title">{titles[page]}</div>
          {page === 'dash' && <Dashboard openLeads={() => setLeads(true)} />}
          {page === 'plan' && sub === 'make' && <CallsToMake onCall={callBack} />}
          {page === 'plan' && sub === 'incoming' && <Incoming onCall={callBack} />}
          {page === 'plan' && sub === 'recent' && <Recent />}
          {page === 'plan' && sub === 'practice' && <CallPage target={target} />}
          {page === 'cal' && <Calendar />}
          {page === 'pulse' && (chan ? <Channel id={chan} back={() => setChan(null)} /> : <PulseHome openChannel={setChan} />)}
        </main>
      </div>
      {leads && <LeadsModal close={() => setLeads(false)} />}
    </div>
  );
}
