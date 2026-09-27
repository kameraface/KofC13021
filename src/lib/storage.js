const KEY = "kofc13021";

export function loadStore() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function write(next) {
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function updateStore(patch) {
  return write({ ...loadStore(), ...patch });
}

export function isMember() {
  return loadStore().member === true;
}

export function setMember(value) {
  updateStore({ member: Boolean(value) });
}

export function signupsFor(slug) {
  return loadStore().signups?.[slug] || [];
}

export function addSignup(slug, entry) {
  const store = loadStore();
  const signups = { ...(store.signups || {}) };
  const list = signups[slug] ? [...signups[slug]] : [];
  list.push({ ...entry, id: crypto.randomUUID(), at: new Date().toISOString() });
  signups[slug] = list;
  updateStore({ signups });
  return list;
}

export function vote(pollId, option) {
  const store = loadStore();
  const votes = { ...(store.votes || {}) };
  votes[pollId] = option;
  updateStore({ votes });
}

export function voteFor(pollId) {
  return loadStore().votes?.[pollId] || "";
}

export function tally(pollId, option) {
  const counts = loadStore().tallies?.[pollId] || {};
  return counts[option] || 0;
}

export function castVote(pollId, option) {
  const store = loadStore();
  if (store.votes?.[pollId]) return store;
  const votes = { ...(store.votes || {}), [pollId]: option };
  const tallies = { ...(store.tallies || {}) };
  const poll = { ...(tallies[pollId] || {}) };
  poll[option] = (poll[option] || 0) + 1;
  tallies[pollId] = poll;
  return updateStore({ votes, tallies });
}

export function addRecord(bucket, entry) {
  const store = loadStore();
  const list = Array.isArray(store[bucket]) ? [...store[bucket]] : [];
  list.unshift({ ...entry, id: crypto.randomUUID(), at: new Date().toISOString() });
  updateStore({ [bucket]: list });
  return list;
}

export function records(bucket) {
  const list = loadStore()[bucket];
  return Array.isArray(list) ? list : [];
}
