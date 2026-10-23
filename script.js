'use strict';

const totalPeople = 1000;
let people = [];
let flipButtonCount = 0;
let headButtonCount = 0;
let tailButtonCount = 0;
let moveCount = 0;
let history = [];
const byId = id => document.getElementById(id);
const format = value => value.toLocaleString('en-US');

function getCounts() {
  return people.reduce((counts, person) => {
    if (person.result === 'H') counts.heads++;
    if (person.result === 'T') counts.tails++;
    return counts;
  }, { heads: 0, tails: 0 });
}

function renderPeople() {
  const fragment = document.createDocumentFragment();
  for (const person of people) {
    const dot = document.createElement('span');
    dot.className = 'person' + (person.result === 'H' ? ' is-heads' : person.result === 'T' ? ' is-tails' : '');
    dot.dataset.result = person.result || '';
    dot.title = 'Person ' + format(person.id) + ' · ' + (person.result === 'H' ? 'Heads' : person.result === 'T' ? 'Tails' : 'Not flipped yet');
    dot.setAttribute('aria-hidden', 'true');
    fragment.appendChild(dot);
  }
  byId('people-container').replaceChildren(fragment);
}

function updateDisplay(message) {
  const { heads, tails } = getCounts();
  const remaining = people.length;
  const flipped = heads + tails;
  const headPercent = remaining ? heads / remaining * 100 : 0;
  const tailPercent = remaining ? tails / remaining * 100 : 0;
  byId('people-left').textContent = format(remaining);
  byId('people-removed').textContent = format(totalPeople - remaining);
  byId('head-count').textContent = format(heads);
  byId('tail-count').textContent = format(tails);
  byId('head-percent').textContent = headPercent.toFixed(1) + '%';
  byId('tail-percent').textContent = tailPercent.toFixed(1) + '%';
  byId('removed-percent').textContent = ((totalPeople - remaining) / totalPeople * 100).toFixed(1) + '% of total';
  byId('flip-count').textContent = flipButtonCount;
  byId('head-press-count').textContent = headButtonCount;
  byId('tail-press-count').textContent = tailButtonCount;
  byId('heads-bar').style.width = headPercent + '%';
  byId('tails-bar').style.width = tailPercent + '%';
  byId('distribution-caption').textContent = flipped ? headPercent.toFixed(1) + '% heads · ' + tailPercent.toFixed(1) + '% tails' : remaining ? 'Waiting for the first flip' : 'No people remaining';
  byId('distribution-bar').setAttribute('aria-label', flipped ? headPercent.toFixed(1) + ' percent heads, ' + tailPercent.toFixed(1) + ' percent tails' : 'No coins flipped');
  byId('remaining-label').textContent = (remaining / totalPeople * 100).toFixed(remaining % 10 ? 1 : 0) + '% of the starting field';
  byId('people-container').setAttribute('aria-label', format(remaining) + ' people: ' + format(heads) + ' heads, ' + format(tails) + ' tails, ' + format(remaining - flipped) + ' unflipped');
  byId('field-caption').textContent = !remaining ? 'Sometimes chance takes you back to the start.' : !flipped ? "1,000 possibilities. Let's see what happens." : format(remaining) + (remaining === 1 ? ' person.' : ' people.') + ' Every dot has a story.';
  byId('flip-button').disabled = remaining === 0;
  byId('heads-button').disabled = !flipped;
  byId('tails-button').disabled = !flipped;
  byId('empty-state').hidden = remaining !== 0;
  byId('people-container').hidden = remaining === 0;
  byId('action-status').textContent = message;
}

function recordMove(action, detail) {
  history.unshift({ number: ++moveCount, action, detail });
  history = history.slice(0, 6);
  const fragment = document.createDocumentFragment();
  for (const entry of history) {
    const row = document.createElement('li');
    for (const [className, text] of [['history-step', String(entry.number).padStart(2, '0')], ['history-action', entry.action], ['history-detail', entry.detail]]) {
      const span = document.createElement('span');
      span.className = className;
      span.textContent = text;
      row.appendChild(span);
    }
    fragment.appendChild(row);
  }
  byId('history-list').replaceChildren(fragment);
}

function flipCoins() {
  if (!people.length) return;
  flipButtonCount++;
  people = people.map(person => ({ ...person, result: Math.random() < .5 ? 'H' : 'T' }));
  const { heads, tails } = getCounts();
  renderPeople();
  updateDisplay('Round ' + flipButtonCount + ': ' + format(heads) + ' heads, ' + format(tails) + ' tails. Your move.');
  recordMove('Flipped ' + format(people.length) + ' coins', format(heads) + ' H / ' + format(tails) + ' T');
  const coin = byId('hero-coin');
  coin.classList.remove('is-flipping');
  // Restart the animation without delaying results or locking the controls.
  void coin.offsetWidth;
  coin.classList.add('is-flipping');
}

function keepSide(side) {
  if (!people.some(person => person.result)) return;
  const before = people.length;
  people = people.filter(person => person.result === side);
  if (side === 'H') headButtonCount++;
  else tailButtonCount++;
  const label = side === 'H' ? 'heads' : 'tails';
  renderPeople();
  updateDisplay(people.length ? 'Kept ' + label + '. ' + format(people.length) + ' remain; ' + format(before - people.length) + ' removed.' : 'No people remain. Start over for a fresh experiment.');
  recordMove('Kept ' + label, format(people.length) + ' left · ' + format(before - people.length) + ' removed');
}

function filterByHead() { keepSide('H'); }
function filterByTail() { keepSide('T'); }

function resetExperiment() {
  people = Array.from({ length: totalPeople }, (_, index) => ({ id: index + 1, result: null }));
  flipButtonCount = 0;
  headButtonCount = 0;
  tailButtonCount = 0;
  moveCount = 0;
  history = [];
  const empty = document.createElement('li');
  empty.className = 'history-empty';
  empty.textContent = 'Every experiment starts somewhere. Make your first move.';
  byId('history-list').replaceChildren(empty);
  byId('hero-coin').classList.remove('is-flipping');
  renderPeople();
  updateDisplay('All set. Your first flip awaits.');
}

byId('flip-button').addEventListener('click', flipCoins);
byId('heads-button').addEventListener('click', filterByHead);
byId('tails-button').addEventListener('click', filterByTail);
byId('reset-button').addEventListener('click', resetExperiment);
byId('empty-reset-button').addEventListener('click', () => {
  resetExperiment();
  byId('flip-button').focus();
});
document.addEventListener('keydown', event => {
  if (event.code !== 'Space' || event.repeat || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (event.target.closest('button, a, input, textarea, select, [contenteditable], [role="button"]')) return;
  event.preventDefault();
  flipCoins();
});
resetExperiment();
