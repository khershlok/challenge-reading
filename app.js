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
      <textarea id="sum" placeholder="Your summary, in your own words…"></textarea>
      <div class="counter" id="sumCount">0 / 75 words</div>
      <details><summary>Show a model summary</summary><p>${d.model} <span class="marks">(${words(d.model)} words)</span></p></details>
    </div>

    <div class="task">
      <p class="task-q">2. ${d.paraQ} <span class="marks">[15]</span></p>
      <textarea id="para" placeholder="One paragraph, about half a side…"></textarea>
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
      <span>${next && isUnlocked(next.n) ? `<a href="#week-${next.n}">Week ${next.n} →</a>` : next ? `Week ${next.n} unlocks ${fmt(unlockDate(next.n))}` : ''}</span>
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
    <p class="progress">${done} of ${WEEKS.length} weeks finished. A new week unlocks every Monday.</p>
    <ul class="week-list">${WEEKS.map(w => {
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
    <p>Your drafts and ticks are saved in this browser only.</p>`;
}

function route() {
  const h = location.hash.slice(1);
  const m = h.match(/^week-(\d+)$/);
  if (h === 'archive') renderArchive();
  else if (h === 'about') renderAbout();
  else if (h === 'news') renderNews();
  else if (m) {
    const w = WEEKS.find(x => x.n === +m[1]);
    if (w && isUnlocked(w.n)) renderWeek(w); else renderArchive();
  } else renderWeek(currentWeek());
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);
route();
