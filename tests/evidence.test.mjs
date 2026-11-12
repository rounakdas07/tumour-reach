import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {studies, firstStudy, tosoCulture, observed, canSwitch, peerFor, selection, linkFor, citation} from "../studies.mjs";
import {evidenceCSV} from "../tools/export.mjs";

test("Table 3 counts patients once and preserves unreported culture status", () => {
  const s=firstStudy;
  assert.equal(new Set(tosoCulture.tested).size,18);
  assert.deepEqual(tosoCulture.positive,[19,21,24]);
  assert.ok(tosoCulture.positive.every(id => tosoCulture.tested.includes(id)));
  assert.deepEqual(observed(s),{positive:3,denominator:18,negative:15,unlisted:0,treatedBase:false});
  assert.deepEqual(observed(s,"treated"),{positive:3,denominator:25,negative:15,unlisted:7,treatedBase:true});
  assert.match(citation(s,"treated"),/7 had no tumour-culture result listed/);
});
test("only studies with complete culture numerators and denominators get a culture plot",() => {
  assert.equal(studies.length,7);
  assert.equal(new Set(studies.map(s=>s.id)).size,7);
  assert.deepEqual(studies.filter(canSwitch).map(s=>s.id),["toso"]);
  for (const s of studies) {
    assert.ok(s.url.startsWith("https://"));
    assert.ok(s.tissue && s.safety && s.locator);
    if (["toso","heimann","tapet"].includes(s.id)) {
      const c=observed(s);
      assert.equal(c.positive+c.negative,c.denominator);
      assert.ok(c.positive<=s.sampled && s.sampled<=s.treated);
    } else {
      assert.equal(observed(s),null);
      assert.ok(s.positive==null);
    }
  }
  assert.deepEqual(observed(peerFor("toso")),{positive:2,denominator:3,negative:1,unlisted:0,treatedBase:false});
});
test("different evidence types keep their reported endpoints",() => {
  const find=id=>studies.find(s=>s.id===id);
  assert.equal(find("sgn1").sampled,null);
  assert.equal(find("novyi").headline,"10 of 24");
  assert.equal(find("novyi").kind,"clinical");
  assert.equal(find("synb").sampled,null);
  assert.equal(find("ecn").sampled,6);
  assert.equal(find("ecn").kind,"paired");
  assert.equal(observed(find("heimann")).positive,1);
});
test("deep links restore the exact comparison and recover from invalid links",() => {
  const s=firstStudy,p=peerFor(s.id);
  const url=linkFor("https://example.org/tool/?old=1#sources",s,"treated",p);
  assert.equal(url.hash,"");
  assert.deepEqual(selection(url.search),{study:s,base:"treated",peer:p});
  assert.deepEqual(selection("?study=wrong&base=wrong&with=wrong"),{study:s,base:"sampled",peer:null});
  assert.equal(selection("?study=tapet&with=tapet&base=treated").peer,null);
  assert.equal(linkFor(url,p,"treated",p).searchParams.has("base"),false);
  assert.equal(linkFor(url,p,"treated",p).searchParams.has("with"),false);
});
test("offered CSV reproduces all seven evidence records",async () => {
  assert.equal(evidenceCSV(),await readFile(new URL("../human-studies.csv",import.meta.url),"utf8"));
  assert.equal(evidenceCSV().trimEnd().split("\r\n").length,8);
});
