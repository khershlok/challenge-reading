// Week 1 unlocks on this Monday; each later week unlocks seven days after the previous one.
const START = new Date(2026, 9, 26); // 26 October 2026 (months are 0-based)
const WEEKS = (window.WEEKS || []).sort((a, b) => a.n - b.n);
const app = document.getElementById('app');

function store(key, value) {
  try {
    if (value === undefined) return localStorage.getItem(key);
    localStorage.setItem(key, value);
  } catch (e) { return null; }
}

function unlockDate(n) {
  const d = new Date(START);
  d.setDate(d.getDate() + (n - 1) * 7);
  return d;
}
function isUnlocked(n) { return new Date() >= unlockDate(n); }
function currentWeek() {
  const open = WEEKS.filter(w => isUnlocked(w.n));
  return open.length ? open[open.length - 1] : WEEKS[0];
}
function fmt(d) { return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }); }
function isDone(n) { return store('done-' + n) === '1'; }
function words(s) { return (s.trim().match(/\S+/g) || []).length; }
function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]); }
function ext(url, label) { return `<a href="${url}" target="_blank" rel="noopener">${label}</a>`; }

function tags(w) {
  return '<span class="tag">' + w.theme + '</span>' + (w.ai ? '<span class="tag ai">AI</span>' : '');
}

// News issues are keyed by the Monday they belong to; hide any dated in the future.
const NEWS = (window.NEWS || [])
  .filter(i => new Date(i.weekOf + 'T00:00:00') <= new Date())
  .sort((a, b) => b.weekOf.localeCompare(a.weekOf));

function fmtIso(s) { return fmt(new Date(s + 'T00:00:00')); }

function newsTeaser() {
  const latest = NEWS[0];
  if (!latest) return '';
  return `
    <div class="box news-teaser">
      <p class="kicker">In the news · week of ${fmtIso(latest.weekOf)}</p>
      <ul>${latest.items.map(it => `<li><a href="#news">${it.title}</a> <span class="source-inline">${it.source}</span>${it.ai ? ' <span class="tag ai">AI</span>' : ''}</li>`).join('')}</ul>
    </div>`;
}

function nowBox(w) {
  const items = (window.NOW || {})[w.n] || [];
  if (!items.length) return '';
  return `
    <div class="box now-box">
      <p class="kicker">Why this matters now</p>
      ${items.map(it => `
        <p><a href="${it.url}" target="_blank" rel="noopener"><strong>${it.title}</strong></a><br>
        <span class="source-inline">${it.source} · ${fmtIso(it.date)}</span><br>${it.note}</p>`).join('')}
    </div>`;
}

function newsItem(it) {
  const linked = WEEKS.find(w => w.n === it.week);
  return `
    <div class="news-item">
      <p class="kicker"><span class="tag">${it.theme}</span>${it.ai ? '<span class="tag ai">AI</span>' : ''} ${it.source} · ${fmtIso(it.date)}</p>
      <h3><a href="${it.url}" target="_blank" rel="noopener">${it.title}</a></h3>
      <p class="source">${it.author}</p>
      <p>${it.summary}</p>
      <p><strong>Why read it:</strong> ${it.why}${linked && isUnlocked(linked.n) ? ` See <a href="#week-${linked.n}">Week ${linked.n}: ${linked.title}</a>.` : ''}</p>
      <p class="news-q"><strong>Think about:</strong> ${it.question}</p>
      <p class="source"><a href="#tutor">Confused by something here? Ask the AI tutor →</a></p>
    </div>`;
}

function renderNews() {
  if (!NEWS.length) { app.innerHTML = '<h1>In the news</h1><p>The first issue arrives on Monday.</p>'; return; }
  const [latest, ...older] = NEWS;
  app.innerHTML = `
    <h1>In the news</h1>
    <p class="standfirst">Real articles from the past week, chosen for the General paper. A new issue arrives every Monday. The guidance says the best preparation is "regular reading of high-quality media".</p>
    <p class="section-label">Week of ${fmtIso(latest.weekOf)}</p>
    <p>${latest.intro}</p>
    ${latest.items.map(newsItem).join('')}
    ${older.length ? `<h2>Earlier issues</h2>${older.map(i => `
      <details><summary>Week of ${fmtIso(i.weekOf)} · ${i.items.length} articles</summary>
        <p>${i.intro}</p>${i.items.map(newsItem).join('')}
      </details>`).join('')}` : ''}`;
}

function renderWeek(w) {
  const d = w.drill;
  const prev = WEEKS.find(x => x.n === w.n - 1);
  const next = WEEKS.find(x => x.n === w.n + 1);
  app.innerHTML = `
    <p class="kicker">Week ${w.n} · ${fmt(unlockDate(w.n))} ${tags(w)}</p>
    <h1>${w.title}</h1>
    <p class="standfirst">${w.standfirst}</p>
    ${nowBox(w)}
    ${w === currentWeek() ? newsTeaser() : ''}
    <article>${w.article}</article>

    <div class="box">
      <dl class="ideas">${w.keyIdeas.map(([t, def]) => `<dt>${t}</dt><dd>${def}</dd>`).join('')}</dl>
    </div>

    <p class="section-label">Part A practice · about 25 minutes</p>
    <h2>Read the text</h2>
    <blockquote class="passage">${d.passage}</blockquote>
    <p class="source">${d.source}</p>

    <div class="task">
      <p class="task-q">1. ${d.summaryQ} <span class="marks">[10]</span></p>
      <textarea id="sum" aria-label="Your summary" placeholder="Your summary, in your own words…"></textarea>
      <div class="counter" id="sumCount">0 / 75 words</div>
      <p class="source"><a href="#tutor" data-ask="summary">Get your summary marked by the AI tutor →</a></p>
      <details><summary>Show a model summary</summary><p>${d.model} <span class="marks">(${words(d.model)} words)</span></p></details>
    </div>

    <div class="task">
      <p class="task-q">2. ${d.paraQ} <span class="marks">[15]</span></p>
      <textarea id="para" aria-label="Your paragraph" placeholder="One paragraph, about half a side…"></textarea>
      <div class="counter" id="paraCount">0 words</div>
      <details><summary>Ideas to get you started</summary><ul>${d.tips.map(t => `<li>${t}</li>`).join('')}</ul></details>
    </div>

    <p class="section-label">Part B practice · about 35 minutes</p>
    <h2>Essay questions</h2>
    <p>Choose one. Plan for five minutes, then write. There is no correct answer: you are marked on how clearly and carefully you think.</p>
    ${w.essays.map(e => `
      <div class="essay">
        <p class="essay-q">${e.q}</p>
        <details><summary>Points to consider</summary><ul>${e.points.map(p => `<li>${p}</li>`).join('')}</ul></details>
      </div>`).join('')}

    <div class="box">
      <p class="task-q">Ready for the interview?</p>
      <p>${w.interview}</p>
    </div>

    <h3>Go further</h3>
    <ul class="links">${w.links.map(([label, url]) => `<li><a href="${url}" target="_blank" rel="noopener">${label}</a></li>`).join('')}</ul>

    <div class="done-row">
      <button id="doneBtn" class="${isDone(w.n) ? 'secondary' : ''}">${isDone(w.n) ? '✓ Finished, click to undo' : 'Mark this week as finished'}</button>
    </div>
    <div class="week-nav">
      <span>${prev ? `<a href="#week-${prev.n}">← Week ${prev.n}</a>` : ''}</span>
      <span>${next && isUnlocked(next.n) ? `<a href="#week-${next.n}">Week ${next.n} →</a>` : `Week ${w.n + 1} arrives ${fmt(unlockDate(w.n + 1))}`}</span>
    </div>`;

  // Drafts are kept per week so a student can come back to them.
  [['sum', 'sumCount', 75], ['para', 'paraCount', 0]].forEach(([id, countId, limit]) => {
    const ta = document.getElementById(id);
    const counter = document.getElementById(countId);
    const key = 'draft-' + w.n + '-' + id;
    ta.value = store(key) || '';
    const update = () => {
      const n = words(ta.value);
      counter.textContent = limit ? `${n} / ${limit} words` : `${n} words`;
      counter.classList.toggle('over', limit > 0 && n >= limit);
      store(key, ta.value);
    };
    ta.addEventListener('input', update);
    update();
  });

  document.getElementById('doneBtn').addEventListener('click', () => {
    store('done-' + w.n, isDone(w.n) ? '0' : '1');
    renderWeek(w);
  });
}

function renderArchive() {
  const done = WEEKS.filter(w => isDone(w.n)).length;
  app.innerHTML = `
    <h1>All weeks</h1>
    <p class="progress">${done} of ${WEEKS.filter(w => isUnlocked(w.n)).length} weeks finished. Each lesson is written on Sunday from that week's news, and appears on Monday.</p>
    <ul class="week-list">${WEEKS.filter(w => isUnlocked(w.n)).map(w => {
      const inner = `<span class="num">Wk ${w.n}</span>
        <span class="t">${w.title}<span class="s">${w.theme}${w.ai ? ' · AI' : ''}</span></span>`;
      if (!isUnlocked(w.n)) return `<li><div class="locked">${inner}<span class="status">Unlocks ${fmt(unlockDate(w.n))}</span></div></li>`;
      return `<li><a href="#week-${w.n}">${inner}<span class="status ${isDone(w.n) ? 'ok' : ''}">${isDone(w.n) ? '✓ Finished' : 'Open'}</span></a></li>`;
    }).join('')}</ul>`;
}

function renderAbout() {
  app.innerHTML = `
    <h1>How to use this site</h1>
    <p class="standfirst">The General paper "cannot be revised for in the usual sense". What helps is reading widely and learning to take difficult topics apart calmly.</p>
    <h3>The paper (60 minutes)</h3>
    <ul>
      <li><strong>Part A (about 25 minutes):</strong> summarise a challenging text in fewer than 75 words [10], then write one paragraph, about half a side, answering a question about it using your own ideas [15].</li>
      <li><strong>Part B (about 35 minutes):</strong> one essay from a short list of open-ended questions [25]. Precise, rigorous writing is "richly rewarded".</li>
    </ul>
    <h3>Each week</h3>
    <ol>
      <li><strong>Read the article.</strong> Note the strongest argument on each side, and the names and examples you could use.</li>
      <li><strong>Do the Part A practice.</strong> Time yourself, 25 minutes. Write your summary in your own words, then compare it with the model.</li>
      <li><strong>Plan one essay.</strong> Spend five minutes on a plan and, if you have time, 35 minutes writing it.</li>
      <li><strong>Talk about it.</strong> King's Scholarship candidates are questioned on their answers at interview. Explain your view to someone at home and let them argue back.</li>
    </ol>
    <h3>Writing a good summary</h3>
    <ul>
      <li>Find the writer's <em>argument</em>, not just the topic: what are they claiming, and why?</li>
      <li>Use your own words. Leave out examples, quotations and repetition.</li>
      <li>Keep the logic visible with words such as <em>because</em>, <em>however</em> and <em>therefore</em>.</li>
    </ul>
    <h3>Where the lessons come from</h3>
    <p>Nothing is planned in advance. Claude reads the news in depth three times a day: BBC News, The New York Times, The Economist, The Guardian, The Conversation, Aeon and Psyche. Every Sunday it writes the next lesson about the week's most interesting story, ready for Monday. Some New York Times and Economist links need a subscription.</p>
    <h3>The AI tutor</h3>
    <p>The <a href="#tutor">AI tutor</a> button at the top of every page opens a chat that explains the news, gives feedback on your summaries and writing, and lets you practise for the interview. It stays open while you move around the site. It runs on Google Gemini: paste in a Gemini API key the first time, and it stays in your browser.</p>
    <p>Your drafts and ticks are saved in this browser only.</p>`;
}

const REPO = 'khershlok/challenge-reading';

const OUTLETS = [
  ['BBC News', 'https://www.bbc.co.uk/news', 'free'],
  ['The New York Times', 'https://www.nytimes.com', 'most articles need a subscription'],
  ['The Economist', 'https://www.economist.com', 'most articles need a subscription'],
  ['The Guardian', 'https://www.theguardian.com/uk', 'free'],
  ['The Conversation UK', 'https://theconversation.com/uk', 'free, written by academics'],
  ['Aeon', 'https://aeon.co', 'free long essays'],
  ['Psyche', 'https://psyche.co', 'free essays']
];

function li(url, label, meta) {
  return `<li>${ext(url, label)}${meta ? ` <span class="source-inline">${meta}</span>` : ''}</li>`;
}

// Turns the news log's "**Source · Headline** · URL · date" lines into links, newest session first.
function parseLog(text) {
  const sessions = [];
  text.split('\n').forEach(line => {
    const h = line.match(/^## (.+)/);
    if (h) { sessions.push({ when: h[1].trim(), items: [] }); return; }
    const m = line.match(/^\*\*(.+?) · (.+?)\*\*(.*?) · (https?:\/\/\S+) · (.+)$/);
    if (m && sessions.length) sessions[sessions.length - 1].items.push({ source: m[1], title: m[2] + m[3], url: m[4], date: m[5] });
  });
  return sessions.filter(s => s.items.length).reverse();
}

function renderSources() {
  const weeks = WEEKS.filter(w => isUnlocked(w.n));
  app.innerHTML = `
    <h1>Sources</h1>
    <p class="standfirst">Every article this site uses, with a link to the original. The summaries here are in our own words, so read the original before quoting it.</p>

    <h2>Where the news comes from</h2>
    <ul class="links">${OUTLETS.map(([n, u, m]) => li(u, n, m)).join('')}</ul>

    <h2>Weekly lessons</h2>
    ${weeks.map(w => {
      const inText = [...new DOMParser().parseFromString(w.article, 'text/html').querySelectorAll('a')];
      const now = (window.NOW || {})[w.n] || [];
      return `
        <h3>Week ${w.n}: <a href="#week-${w.n}">${w.title}</a></h3>
        ${now.length ? `<p class="source">Why this matters now</p><ul class="links">${now.map(it => li(it.url, it.title, `${it.source} · ${fmtIso(it.date)}`)).join('')}</ul>` : ''}
        ${inText.length ? `<p class="source">Facts in the article</p><ul class="links">${inText.map(a => li(a.href, esc(a.textContent))).join('')}</ul>` : ''}
        <p class="source">Go further</p><ul class="links">${w.links.map(([l, u]) => li(u, l)).join('')}</ul>`;
    }).join('')}

    <h2>In the news</h2>
    ${NEWS.map(i => `
      <h3>Week of ${fmtIso(i.weekOf)}</h3>
      <ul class="links">${i.items.map(it => li(it.url, it.title, `${it.source} · ${it.author} · ${fmtIso(it.date)}`)).join('')}</ul>`).join('')}

    <h2>Everything Claude has read</h2>
    <p>The news-reading loop logs the most useful stories it reads three times a day. The full notes are in the ${ext(`https://github.com/${REPO}/blob/main/research/news-log.md`, 'news log')}.</p>
    <div id="logList"><p class="source">Loading…</p></div>`;

  fetch('research/news-log.md', { cache: 'no-cache' })
    .then(r => r.ok ? r.text() : Promise.reject())
    .then(text => {
      const sessions = parseLog(text);
      document.getElementById('logList').innerHTML = sessions.length ? sessions.map(s => `
        <details><summary>${esc(s.when)} · ${s.items.length} stories</summary>
          <ul class="links">${s.items.map(it => li(it.url, esc(it.title), `${esc(it.source)} · ${esc(it.date)}`)).join('')}</ul>
        </details>`).join('') : '<p>Nothing logged yet.</p>';
    })
    .catch(() => { document.getElementById('logList').innerHTML = '<p>The news log could not be loaded. Use the link above.</p>'; });
}

// The AI tutor is a Gemini chat in a panel that opens from the header and stays open between pages.
// The site is public, so the Gemini key is never in the code: each visitor pastes their own, kept in their browser only.
const TUTOR_MODEL = 'gemini-3.8-flash';
const tutorPanel = document.getElementById('tutor-panel');
const tutorBody = document.getElementById('tutor-body');
const tutorBtn = document.getElementById('tutor-btn');
let tutorHistory = [];

function plain(html) { return new DOMParser().parseFromString(html, 'text/html').body.textContent.trim(); }

function tutorPrompt() {
  const w = currentWeek();
  return 'You are an expert academic tutor helping a student prepare for the General Paper of The Challenge exam at Westminster School. ' +
    'Answer the student\'s questions concisely, thoughtfully, and critically. Coach them rather than writing their answers for them. ' +
    (w ? `This week's lesson is "${w.title}": ${plain(w.standfirst)} The Part A practice passage is: ${plain(w.drill.passage)}` : '');
}

// Gemini replies in Markdown; show paragraphs, lists and bold without trusting any HTML in it.
function tutorFormat(text) {
  return esc(text).split(/\n{2,}/).map(block => {
    const b = block.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/(^|\s)\*(\S.*?)\*/g, '$1<em>$2</em>');
    const lines = b.split('\n');
    if (lines.every(l => /^\s*([-*]|\d+\.)\s+/.test(l))) {
      const tag = /^\s*\d+\./.test(lines[0]) ? 'ol' : 'ul';
      return `<${tag}>${lines.map(l => `<li>${l.replace(/^\s*([-*]|\d+\.)\s+/, '')}</li>`).join('')}</${tag}>`;
    }
    return `<p>${b.replace(/^#+\s*/, '').replace(/\n/g, '<br>')}</p>`;
  }).join('');
}

function tutorMessage(role, html) {
  const div = document.createElement('div');
  div.className = 'chat-message ' + (role === 'user' ? 'user-message' : 'ai-message');
  div.innerHTML = `<p class="kicker">${role === 'user' ? 'You' : 'AI tutor'}</p><div class="chat-body">${html}</div>`;
  const win = document.getElementById('chat-window');
  win.appendChild(div);
  win.scrollTop = win.scrollHeight;
  return div.querySelector('.chat-body');
}

function openTutor(prefill) {
  tutorPanel.hidden = false;
  tutorBtn.setAttribute('aria-expanded', 'true');
  if (!tutorBody.innerHTML) renderTutor();
  const input = document.getElementById('user-input') || document.getElementById('key');
  if (prefill && input.id === 'user-input') input.value = prefill;
  input.focus();
}

function closeTutor() {
  tutorPanel.hidden = true;
  tutorBtn.setAttribute('aria-expanded', 'false');
}

function renderTutor() {
  const key = store('gemini-key');
  tutorBody.innerHTML = key ? `
    <div id="chat-window" class="chat-window">
      <p class="source">Ask about this week's lesson or the news, paste in your writing for feedback, or try out an argument. The tutor is an AI, so check what it tells you.</p>
    </div>
    <div class="chat-input">
      <textarea id="user-input" aria-label="Your question" placeholder="Ask the tutor…"></textarea>
      <div class="chat-actions">
        <button id="send-btn">Send</button>
        <button id="clear-btn" class="secondary">New chat</button>
        <a href="#" id="forget-key" class="source-inline">Remove key</a>
      </div>
    </div>` : `
    <div class="chat-setup">
      <label class="task-q" for="key">Paste your Gemini API key to start</label>
      <input id="key" type="password" class="key-input" autocomplete="off" placeholder="Gemini API key">
      <div class="chat-actions"><button id="save-key">Save key</button></div>
      <p class="source" style="margin-top:10px">The key is saved in this browser only.</p>
    </div>`;

  if (!key) {
    const save = () => {
      const k = document.getElementById('key').value.trim();
      if (k) { store('gemini-key', k); renderTutor(); document.getElementById('user-input').focus(); }
    };
    document.getElementById('save-key').addEventListener('click', save);
    document.getElementById('key').addEventListener('keydown', e => { if (e.key === 'Enter') save(); });
    return;
  }

  const sendBtn = document.getElementById('send-btn');
  const userInput = document.getElementById('user-input');
  tutorHistory.forEach(m => tutorMessage(m.role, m.role === 'user' ? esc(m.parts[0].text).replace(/\n/g, '<br>') : tutorFormat(m.parts[0].text)));

  async function handleUserQuery() {
    const question = userInput.value.trim();
    if (!question || sendBtn.disabled) return;
    tutorMessage('user', esc(question).replace(/\n/g, '<br>'));
    userInput.value = '';
    sendBtn.disabled = true;
    const reply = tutorMessage('model', '<p class="source">Thinking…</p>');
    const contents = [...tutorHistory, { role: 'user', parts: [{ text: question }] }];
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${TUTOR_MODEL}:generateContent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
        body: JSON.stringify({ systemInstruction: { parts: [{ text: tutorPrompt() }] }, contents })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || res.statusText);
      const text = data.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('') || '';
      if (!text) throw new Error("Sorry, I couldn't generate a response right now.");
      tutorHistory = [...contents, { role: 'model', parts: [{ text }] }];
      reply.innerHTML = tutorFormat(text);
    } catch (err) {
      console.error('Error fetching AI response:', err);
      reply.innerHTML = `<p class="source">${esc(err.message || 'An error occurred while connecting to the AI.')}</p>`;
    } finally {
      sendBtn.disabled = false;
      userInput.focus();
    }
    const win = document.getElementById('chat-window');
    win.scrollTop = win.scrollHeight;
  }

  sendBtn.addEventListener('click', handleUserQuery);
  userInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleUserQuery(); }
  });
  document.getElementById('clear-btn').addEventListener('click', () => { tutorHistory = []; renderTutor(); });
  document.getElementById('forget-key').addEventListener('click', e => {
    e.preventDefault();
    try { localStorage.removeItem('gemini-key'); } catch (err) {}
    renderTutor();
  });
}

tutorBtn.addEventListener('click', () => tutorPanel.hidden ? openTutor() : closeTutor());
document.getElementById('tutor-close').addEventListener('click', closeTutor);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !tutorPanel.hidden) closeTutor(); });
// "#tutor" links open the panel instead of changing page; the summary link also hands over the draft.
document.addEventListener('click', e => {
  const a = e.target.closest('a[href="#tutor"]');
  if (!a) return;
  e.preventDefault();
  const sum = a.dataset.ask === 'summary' && document.getElementById('sum');
  openTutor(sum && sum.value.trim() ? `Please mark my Part A summary of this week's passage out of 10 (it must be under 75 words), and tell me what to fix:\n\n${sum.value.trim()}` : '');
});

function route() {
  const h = location.hash.slice(1);
  const m = h.match(/^week-(\d+)$/);
  if (h === 'archive') renderArchive();
  else if (h === 'about') renderAbout();
  else if (h === 'news') renderNews();
  else if (h === 'sources') renderSources();
  else if (h === 'tutor' || h === 'gemini') { renderWeek(currentWeek()); openTutor(); }
  else if (m) {
    const w = WEEKS.find(x => x.n === +m[1]);
    if (w && isUnlocked(w.n)) renderWeek(w); else renderArchive();
  } else renderWeek(currentWeek());
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);
route();
