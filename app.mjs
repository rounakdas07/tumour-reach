import {studies, canSwitch, observed, peerFor, selection, linkFor, citation} from "./studies.mjs";

const byId = id => document.getElementById(id);
let state = selection(location.search);
let copyVersion = 0;

function element(tag, text, cls) {
  const node = document.createElement(tag);
  if (text != null) node.textContent = text;
  if (cls) node.className = cls;
  return node;
}
function sourceLink(label, url) {
  const link = element("a", label);
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener";
  return link;
}

function options(select, current, excluded) {
  select.replaceChildren();
  for (const group of new Set(studies.map(s => s.group))) {
    const optgroup = element("optgroup");
    optgroup.label = group;
    for (const s of studies.filter(s => s.group === group && s.id !== excluded)) {
      optgroup.append(new Option(s.short + " (" + s.year + ")", s.id));
    }
    if (optgroup.children.length) select.append(optgroup);
  }
  select.value = current;
}

function resultText(study, base) {
  const count = observed(study, base);
  if (!count) return [study.headline, study.note];
  const noun = count.treatedBase ? "treated patients with documented live bacteria" : "sampled patients with live bacteria";
  const location = study.id === "tapet" ? " in the injected tumour." : " in a tumour after IV treatment.";
  return [count.positive + " of " + count.denominator, noun + location];
}
function legendEntry(key, number, label) {
  const item = element("li");
  item.append(element("i", null, "chip " + key), element("strong", String(number)), document.createTextNode(label));
  return item;
}
function visual(study, count) {
  const target = byId("visual");
  target.replaceChildren();
  if (!count) {
    const facts = element("dl", null, "facts");
    for (const [value,label] of study.facts) {
      const group = element("div");
      group.append(element("dt", label), element("dd", value));
      facts.append(group);
    }
    target.append(facts);
    return;
  }
  const strip = element("div", null, "plot");
  strip.setAttribute("aria-hidden","true");
  const legend = element("ul", null, "legend");
  const categories = [["pos",count.positive,"positive culture"],["neg",count.negative,"no growth"],["missing",count.unlisted,"no result listed"]];
  for (const [key,n,label] of categories) {
    if (!n) continue;
    for (let i = 0; i < n; i++) strip.append(element("i", null, "chip " + key));
    legend.append(legendEntry(key,n,label));
  }
  target.append(strip, legend);
}
function single(study, base) {
  byId("byline").textContent = study.authors + " · " + study.year;
  byId("study-name").textContent = study.name;
  byId("route-tag").textContent = study.route;
  byId("method-tag").textContent = study.method;
  byId("result-label").textContent = study.kind === "clinical" ? "Clinical and imaging result" : "Tissue result";
  const [headline,note] = resultText(study,base);
  byId("result-number").textContent = headline;
  byId("result-number").classList.toggle("words",!/^\d/.test(headline));
  byId("result-note").textContent = note;
  byId("base-switch").hidden = !canSwitch(study);
  byId("sampled").setAttribute("aria-pressed",String(base !== "treated"));
  byId("treated").setAttribute("aria-pressed",String(base === "treated"));
  visual(study, observed(study,base));
  byId("tissue").textContent = study.tissue;
  byId("safety").textContent = study.safety;
  byId("nuance-title").textContent = study.detailTitle;
  byId("detail").textContent = study.detail;
  byId("extra-source").replaceChildren();
  if (study.extra) byId("extra-source").append(sourceLink(study.extra.label + " ↗", study.extra.url));
  byId("paper").href = study.full || study.url;
  byId("paper").ariaLabel = "Read " + study.authors + " (" + study.year + "), " + study.locator;
}
function comparisonCard(study) {
  const card = element("article", null, "mini");
  const head = element("div", null, "mini-head");
  head.append(element("span",study.route,"tag route"),element("p",study.authors + " · " + study.year,"source-id"),element("h2",study.name));
  const body = element("div", null, "mini-body");
  const [headline,note] = resultText(study,"sampled");
  const finding = element("div",null,"mini-result");
  finding.append(element("h3",study.method),element("p",headline,"mini-number"),element("p",note));
  const safety = element("section");
  safety.append(element("h3","Dose-limiting effects"),element("p",study.safety));
  const link = sourceLink("Read the study ↗", study.full || study.url);
  link.className = "paper";
  body.append(finding, safety, link);
  card.append(head, body);
  return card;
}
function render() {
  const {study, base, peer} = state;
  byId("study").value = study.id;
  byId("single").hidden = Boolean(peer);
  byId("comparison").hidden = !peer;
  byId("compare").setAttribute("aria-pressed", String(Boolean(peer)));
  byId("compare-text").textContent = peer ? "Single study" : "Compare studies";
  byId("copy").textContent = "Copy cited finding";
  byId("fallback").hidden = true;
  copyVersion++;
  if (peer) {
    options(byId("peer"),peer.id,study.id);
    byId("pair").replaceChildren(comparisonCard(study),comparisonCard(peer));
  } else {
    single(study, base);
  }
}
function update(next) {
  if (next.study.id !== state.study.id) byId("nuance").open = false;
  state = next;
  history.pushState(null, "", linkFor(location.href, state.study, state.base, state.peer));
  render();
}
byId("study").addEventListener("change", e => {
  const study = studies.find(s => s.id === e.target.value);
  const peer = state.peer?.id === study.id ? state.study : state.peer;
  update({study, peer, base:"sampled"});
});
byId("compare").addEventListener("click", () => update({...state, peer:state.peer ? null : peerFor(state.study.id)}));
byId("peer").addEventListener("change", e => update({...state, peer:studies.find(s => s.id === e.target.value)}));
for (const base of ["sampled","treated"]) byId(base).addEventListener("click", () => { if (base !== state.base) update({...state,base}); });
window.addEventListener("popstate", () => {
  state = selection(location.search);
  byId("nuance").open = false;
  render();
});
byId("copy").addEventListener("click", async () => {
  const text = citation(state.study, state.base);
  const version = ++copyVersion;
  try {
    await navigator.clipboard.writeText(text);
    if (version !== copyVersion) return;
    byId("copy").textContent = "Copied ✓";
    byId("status").textContent = "Cited finding copied";
    setTimeout(() => { if (version === copyVersion) byId("copy").textContent = "Copy cited finding"; },2600);
  } catch {
    if (version !== copyVersion) return;
    byId("fallback").hidden = false;
    byId("fallback-text").value = text;
    byId("fallback-text").focus();
    byId("fallback-text").select();
  }
});
function revealSources() {
  if (location.hash === "#sources") document.querySelector("#sources details").open = true;
}
document.querySelector(".mast-link").addEventListener("click", () => {document.querySelector("#sources details").open = true;});
window.addEventListener("hashchange", revealSources);
for (const study of studies) {
  const item = element("li");
  item.append(sourceLink(study.authors + " (" + study.year + ") · " + study.name + " ↗",study.url), element("small",study.journal + " · " + study.locator));
  byId("source-list").append(item);
}
options(byId("study"),state.study.id);
render();
revealSources();
