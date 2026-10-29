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
      <p class="source"><a href="#questions/${encodeURIComponent(it.title)}">Confused by something here? Ask a question →</a></p>
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
    <p>Your drafts and ticks are saved in this browser only.</p>`;
}

const REPO = 'khershlok/challenge-reading';

function qaItem(a) {
  return `
    <div class="news-item qa">
      <p class="kicker">Asked ${fmtIso(a.asked)}${a.about ? ` · about <em>${esc(a.about)}</em>` : ''}</p>
      <h3>${esc(a.question)}</h3>
      <div>${a.answer}</div>
      ${a.sources && a.sources.length ? `<p class="source">Sources: ${a.sources.map(([l, u]) => `<a href="${u}" target="_blank" rel="noopener">${l}</a>`).join(' · ')}</p>` : ''}
    </div>`;
}

function renderQuestions(about) {
  const answers = (window.ANSWERS || []).slice().sort((a, b) => b.n - a.n);
  app.innerHTML = `
    <h1>Question bank</h1>
    <p class="standfirst">Something in the news confusing? Ask here. Claude checks for new questions three times a day (7:30am, 2:30pm and 9:30pm), and every answer is kept below.</p>
    <div class="box">
      <label class="task-q" for="q">Your question${about ? ` about <em>${esc(about)}</em>` : ''}</label>
      <textarea id="q" placeholder="e.g. Why would the Atlantic currents collapsing make Britain colder, if the world is getting warmer?"></textarea>
      <div class="done-row" style="margin-top:12px"><a id="askBtn" class="button" target="_blank" rel="noopener" href="#questions">Send question</a></div>
      <p class="source" style="margin-top:10px">This opens GitHub with your question filled in. Press <strong>Create</strong> to send it. Questions and answers are public, so don't include personal details.</p>
    </div>
    <div id="waiting"></div>
    <h2>Answers</h2>
    <input id="search" type="search" placeholder="Search answers…">
    <div id="answers">${answers.length ? answers.map(qaItem).join('') : '<p>No answers yet. Ask the first question!</p>'}</div>`;

  // A real link (not window.open) so pop-up blockers never stop it.
  const qBox = document.getElementById('q');
  const askBtn = document.getElementById('askBtn');
  const updateAsk = () => {
    const q = qBox.value.trim();
    const body = q + (about ? `\n\nAbout: ${about}` : '');
    const title = q.length > 90 ? q.slice(0, 87) + '…' : q;
    askBtn.href = `https://github.com/${REPO}/issues/new?labels=question&title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
    askBtn.classList.toggle('disabled', !q);
  };
  qBox.addEventListener('input', updateAsk);
  askBtn.addEventListener('click', e => { if (!qBox.value.trim()) { e.preventDefault(); qBox.focus(); } });
  updateAsk();

  document.getElementById('search').addEventListener('input', e => {
    const t = e.target.value.toLowerCase();
    document.getElementById('answers').innerHTML = answers
      .filter(a => (a.question + a.answer + (a.about || '')).toLowerCase().includes(t))
      .map(qaItem).join('') || '<p>No matching answers.</p>';
  });

  // Open questions that have not been answered yet come straight from GitHub.
  fetch(`https://api.github.com/repos/${REPO}/issues?labels=question&state=open&per_page=30`)
    .then(r => r.ok ? r.json() : [])
    .then(list => {
      const done = new Set(answers.map(a => a.n));
      const waiting = list.filter(i => !done.has(i.number));
      if (!waiting.length) return;
      document.getElementById('waiting').innerHTML = `
        <h3>Waiting for an answer</h3>
        <ul>${waiting.map(i => `<li>${esc(i.title)} <span class="source-inline">asked ${fmt(new Date(i.created_at))}</span></li>`).join('')}</ul>`;
    })
    .catch(() => {});
}

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
  const answers = window.ANSWERS || [];
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

    <h2>Question bank</h2>
    ${answers.length ? answers.map(a => `
      <h3>${esc(a.question)}</h3>
      <ul class="links">${(a.sources || []).map(([l, u]) => li(u, l)).join('')}</ul>`).join('') : '<p>No questions answered yet.</p>'}

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

function route() {
  const h = location.hash.slice(1);
  const m = h.match(/^week-(\d+)$/);
  if (h === 'archive') renderArchive();
  else if (h === 'about') renderAbout();
  else if (h === 'news') renderNews();
  else if (h === 'sources') renderSources();
  else if (h.startsWith('questions')) {
    let about = '';
    try { about = decodeURIComponent(h.slice(10)); } catch (e) {}
    renderQuestions(about);
  }
  else if (m) {
    const w = WEEKS.find(x => x.n === +m[1]);
    if (w && isUnlocked(w.n)) renderWeek(w); else renderArchive();
  } else renderWeek(currentWeek());
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);
route();
