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
      <p class="source"><a href="#tutor">Confused by something here? Ask Roque →</a></p>
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
      <p class="source"><a href="#tutor" data-ask="summary">Get your summary marked by Roque →</a></p>
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
    <h3>Roque, the AI tutor</h3>
    <p>The <a href="#tutor">Ask Roque</a> button at the top of every page opens a chat with Roque, an AI tutor that explains the news, gives feedback on your summaries and writing, and lets you practise for the interview. It stays open while you move around the site. Roque runs on Google Gemini: paste in a Gemini API key the first time, and it stays in your browser.</p>
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

// Roque, the AI tutor, is a Gemini chat in a panel that opens from the header and stays open between pages.
// The site is public, so the Gemini key is never in the code: each visitor pastes their own, kept in their browser only.
const TUTOR_NAME = 'Roque';
// Smartest first. Roque streams the answer as it is written. If a model is busy, or has not started
// writing after TUTOR_HEDGE seconds, Roque also asks the next one and keeps whichever starts first.
// Only gemini-3.8-flash is known to accept thinking_level, so the others use Google's default.
const TUTOR_MODELS = [
  { id: 'gemini-3.8-flash', config: { thinking_level: 'low' } }, // quicker answers; medium is Google's default
  { id: 'gemini-3.6-flash' },
  { id: 'gemini-3.5-flash-lite' }
];
const TUTOR_HEDGE = 10; // seconds before also asking a backup (searching Google takes a few seconds)
const TUTOR_TIMEOUT = 45; // seconds before giving up if no model has started writing
const TUTOR_KEEP = 10; // recent messages sent with each question, so Roque remembers the conversation
const tutorPanel = document.getElementById('tutor-panel');
const tutorBody = document.getElementById('tutor-body');
const tutorBtn = document.getElementById('tutor-btn');
let tutorHistory = []; // { role: 'user' | 'model', text }

function plain(html) { return new DOMParser().parseFromString(html, 'text/html').body.textContent.trim(); }

// Roque answers anything, searching Google for anything recent. Its manner is modelled on Claude:
// direct, honest and careful. It only turns to exam coaching when the student asks for it.
function tutorPrompt() {
  const w = currentWeek();
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  return [
    `Your name is ${TUTOR_NAME}. You are a knowledgeable, friendly assistant for a student. Today is ${today}.`,
    'Answer whatever the student asks, on any subject, directly and fully. Do not turn ordinary questions into exam practice, and do not end every reply with a question.',
    'For anything about recent events, the news, people in the news, prices, sport, or anything that may have changed, search Google first and base your answer on what you find. Say when something happened, and if you cannot find it, say so rather than guessing.',
    'Be honest and careful: separate facts from opinion, give the main sides of a debate fairly, and never invent quotations, statistics or sources. Write in plain British English. Match the length to the question: short for simple questions, longer when the student wants depth.',
    'The student is preparing for the General Paper of The Challenge exam at Westminster School. Part A: summarise a challenging text in under 75 words, then write one paragraph answering a question about it. Part B: an open-ended essay. It rewards precise, rigorous, independent thinking.',
    'Only when the student asks for help with an exam answer (planning, phrasing, improving or marking a summary, paragraph or essay) act as their tutor: be specific about what is strong and weak, quoting their words; suggest better phrasing for the parts they ask about; give the strongest counter-argument; and if they want a mark, give an indicative one (summary out of 10, paragraph out of 15, essay out of 25) and say it is only a guide.',
    w ? `For reference, this week's lesson on the site is "${w.title}": ${plain(w.standfirst)} Its Part A practice passage is: ${plain(w.drill.passage)}` : ''
  ].join('\n');
}

// Each question carries the recent conversation, so it works with whichever model answers.
function tutorInput(question) {
  const recent = tutorHistory.slice(-TUTOR_KEEP);
  if (!recent.length) return question;
  const said = recent.map(m => `${m.role === 'user' ? 'Student' : TUTOR_NAME}: ${m.text}`).join('\n\n');
  return `The conversation so far:\n\n${said}\n\nThe student's new message:\n\n${question}`;
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

// The pages Google found, listed under an answer that used search.
function tutorSources(sources) {
  if (!sources || !sources.size) return '';
  const links = [...sources].slice(0, 6).map(([url, title]) => `<li>${ext(esc(url), esc(title))}</li>`).join('');
  return `<p class="source chat-sources-label">Sources</p><ul class="links chat-sources">${links}</ul>`;
}

// Google's terms ask for its search suggestions to be shown with answers that used search. Its HTML
// goes in a sandboxed frame so it cannot touch the page; its links open in a new tab.
function searchSuggestions(html) {
  const frame = document.createElement('iframe');
  frame.className = 'search-suggestions';
  frame.title = 'Google search suggestions';
  frame.setAttribute('sandbox', 'allow-popups allow-popups-to-escape-sandbox');
  frame.srcdoc = `<base target="_blank">${html}`;
  return frame;
}

function tutorMessage(role, html) {
  const div = document.createElement('div');
  div.className = 'chat-message ' + (role === 'user' ? 'user-message' : 'ai-message');
  div.innerHTML = `<p class="kicker">${role === 'user' ? 'You' : TUTOR_NAME}</p><div class="chat-body">${html}</div>`;
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

// Shows what Roque is doing, with a seconds counter so a slow reply never looks frozen.
function tutorStatus(el) {
  const start = Date.now();
  let note = '';
  const show = () => { el.textContent = `Thinking… (${Math.round((Date.now() - start) / 1000)}s)${note}`; };
  const timer = setInterval(show, 1000);
  show();
  return { note(text) { note = text; show(); }, stop() { clearInterval(timer); } };
}

// An error that means "this model is busy right now", rather than a problem with the key or the question.
function busyError(message) { const e = new Error(message); e.busy = true; return e; }
const BUSY_STATUSES = ['UNAVAILABLE', 'RESOURCE_EXHAUSTED', 'DEADLINE_EXCEEDED', 'gateway_timeout', 'unavailable', 'resource_exhausted'];

// Finds the source links (url_citation annotations) and Google's search suggestions anywhere in an event.
function collectSearch(node, found) {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) { node.forEach(n => collectSearch(n, found)); return; }
  if (node.type === 'url_citation' && node.url) found.sources.set(node.url, node.title || node.url);
  if (typeof node.search_suggestions === 'string') found.suggestions = node.search_suggestions;
  Object.values(node).forEach(v => collectSearch(v, found));
}

// Streams one model's answer, calling onText with each new piece of text and onSearch when it searches Google.
// Resolves with { text, sources: Map(url → title), suggestions: Google's HTML snippet or '' }.
async function streamModel(key, model, input, signal, onText, onSearch) {
  const res = await fetch('https://generativelanguage.googleapis.com/v1beta/interactions?alt=sse', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
    signal,
    body: JSON.stringify({
      model: model.id,
      system_instruction: tutorPrompt(),
      input,
      tools: [{ type: 'google_search' }],
      stream: true,
      store: false,
      ...(model.config ? { generation_config: model.config } : {})
    })
  });
  if (!res.ok) {
    let data = null;
    try { const body = await res.json(); data = Array.isArray(body) ? body[0] : body; } catch (e) {} // errors sometimes come wrapped in a list
    const message = data?.error?.message || res.statusText || `Error ${res.status}`;
    if (res.status === 429 || res.status >= 500 || BUSY_STATUSES.includes(data?.error?.status)) throw busyError(message);
    throw new Error(message);
  }
  // Server-sent events: blocks separated by a blank line, each with a "data: {json}" line.
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '', text = '';
  const found = { sources: new Map(), suggestions: '' };
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const blocks = buffer.split(/\r?\n\r?\n/);
    buffer = blocks.pop();
    for (const block of blocks) {
      const data = block.split(/\r?\n/).filter(l => l.startsWith('data:')).map(l => l.slice(5).trim()).join('');
      if (!data || data === '[DONE]') continue;
      let event;
      try { event = JSON.parse(data); } catch (e) { continue; }
      collectSearch(event, found);
      if (event.event_type === 'step.start' && event.step?.type === 'google_search_call') onSearch();
      if (event.event_type === 'step.delta' && event.delta?.type === 'text' && event.delta.text) {
        text += event.delta.text;
        onText(event.delta.text);
      } else if (event.event_type === 'error') {
        const message = event.error?.message || 'The AI stopped with an error.';
        throw BUSY_STATUSES.includes(event.error?.code) || !text ? busyError(message) : new Error(message);
      }
    }
  }
  return { text, ...found };
}

// Asks the models in order, starting a backup when one is busy or slow, and streams whichever writes first.
async function askRoque(key, question, onText, onNote) {
  const input = tutorInput(question);
  const attempts = [];
  let next = 0, lastError = null;
  const start = () => {
    const model = TUTOR_MODELS[next++];
    const a = { ctrl: new AbortController(), chunks: [] };
    a.first = new Promise(resolve => { a.gotText = resolve; });
    a.done = streamModel(key, model, input, a.ctrl.signal, chunk => {
      if (a.winner) onText(chunk); else { a.chunks.push(chunk); a.gotText(); }
    }, () => onNote(' Searching Google…')).then(result => { a.result = result; }, err => { a.error = err; });
    attempts.push(a);
    if (next > 1) onNote(' Google is slow, so asking a backup too…');
  };
  const sleep = s => new Promise(r => setTimeout(r, s * 1000));
  const stopAll = () => attempts.forEach(a => a.ctrl.abort());
  const deadline = Date.now() + TUTOR_TIMEOUT * 1000;
  start();
  for (;;) {
    const running = attempts.filter(a => !a.over);
    if (!running.length && next >= TUTOR_MODELS.length) {
      if (lastError && !lastError.busy) throw lastError;
      throw new Error(`Google's AI is very busy right now, so ${TUTOR_NAME} couldn't answer. Wait a minute and try again.`);
    }
    const left = (deadline - Date.now()) / 1000;
    const event = await Promise.race([
      ...running.map(a => a.first.then(() => ({ kind: 'text', a }))),
      ...running.map(a => a.done.then(() => ({ kind: 'over', a }))),
      sleep(Math.max(0, next < TUTOR_MODELS.length ? Math.min(TUTOR_HEDGE, left) : left)).then(() => ({ kind: 'wait' }))
    ]);
    if (event.kind === 'text') {
      const a = event.a;
      a.winner = true;
      attempts.filter(o => o !== a).forEach(o => o.ctrl.abort());
      a.chunks.forEach(onText);
      await a.done;
      if (a.error) throw a.error;
      return a.result;
    }
    if (event.kind === 'over') {
      const a = event.a;
      a.over = true;
      if (a.error && !a.error.busy) { stopAll(); throw a.error; }
      lastError = a.error || new Error("Sorry, I couldn't generate a response right now.");
      if (next < TUTOR_MODELS.length) start();
      continue;
    }
    if (Date.now() >= deadline) {
      stopAll();
      throw new Error(`${TUTOR_NAME} didn't start answering within ${TUTOR_TIMEOUT} seconds. Check your internet connection and try again.`);
    }
    if (next < TUTOR_MODELS.length) start();
  }
}

function renderTutor() {
  const key = store('gemini-key');
  tutorBody.innerHTML = key ? `
    <div id="chat-window" class="chat-window">
      <p class="source">Ask ${TUTOR_NAME} anything, including today's news: it searches Google for anything recent. Ask it to help with an exam answer whenever you want feedback or better phrasing. ${TUTOR_NAME} is an AI (Google Gemini), so check what it tells you.</p>
    </div>
    <div class="chat-input">
      <textarea id="user-input" aria-label="Your question" placeholder="Ask ${TUTOR_NAME}…"></textarea>
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
      <p class="source" style="margin-top:10px">The key is saved in this browser only and is sent only to Google.</p>
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
  tutorHistory.forEach(m => tutorMessage(m.role, m.role === 'user' ? esc(m.text).replace(/\n/g, '<br>') : tutorFormat(m.text)));

  async function handleUserQuery() {
    const question = userInput.value.trim();
    if (!question || sendBtn.disabled) return;
    tutorMessage('user', esc(question).replace(/\n/g, '<br>'));
    userInput.value = '';
    sendBtn.disabled = true;
    const reply = tutorMessage('model', '<p class="source"></p>');
    const status = tutorStatus(reply.querySelector('.source'));
    const win = document.getElementById('chat-window');
    let shown = '';
    try {
      const { text, sources, suggestions } = await askRoque(key, question, chunk => {
        if (!shown) status.stop();
        shown += chunk;
        reply.innerHTML = tutorFormat(shown);
        win.scrollTop = win.scrollHeight;
      }, note => status.note(note));
      if (!text) throw new Error("Sorry, I couldn't generate a response right now.");
      tutorHistory.push({ role: 'user', text: question }, { role: 'model', text });
      reply.innerHTML = tutorFormat(text) + tutorSources(sources);
      if (suggestions) reply.appendChild(searchSuggestions(suggestions));
    } catch (err) {
      console.error('Error fetching AI response:', err);
      status.stop();
      // Keep any part of the answer that already arrived, and say it was cut short.
      reply.innerHTML = (shown ? tutorFormat(shown) : '') +
        `<p class="source">${esc(err.message || 'An error occurred while connecting to the AI.')}</p>`;
    } finally {
      sendBtn.disabled = false;
      userInput.focus();
    }
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
