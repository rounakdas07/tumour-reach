// Each entry describes one human cohort. "Sampled" applies only to the stated tissue assay.
// Table 3 in Toso et al. lists repeat specimens. Count each participant only once.
export const tosoCulture = {
  tested: [1, 2, 3, 4, 7, 8, 10, 12, 13, 14, 15, 19, 20, 21, 22, 23, 24, 25],
  positive: [19, 21, 24],
};

export const studies = [
  {
    id: "toso", group: "Blood-vessel delivery", route: "Intravenous", name: "VNP20009",
    authors: "Toso et al.", year: 2002, short: "VNP20009 · original cohort",
    population: "24 people with metastatic melanoma and one with metastatic renal cancer.",
    method: "Tumour culture", kind: "culture", treated: 25, sampled: tosoCulture.tested.length, positive: tosoCulture.positive.length,
    tissue: "Table 3 lists tumour aspirate or excision cultures for 18 distinct patients. Three had at least one positive specimen. Seven of the 25 treated have no tumour-culture result listed.",
    safety: "Dose-limiting effects at the highest dose included persistent bloodstream infection, low platelets, anaemia and gastrointestinal symptoms.",
    detailTitle: "Why the sample matters",
    detail: "In one patient, an aspirate was negative while an excision from the same lesion on the same day grew the bacteria. No objective tumour regressions were observed, including in the three culture-positive patients.",
    shortFinding: "3 of 18 sampled patients had viable bacteria recovered from a tumour. 25 were treated.",
    readout: "Viable bacteria in tumour tissue after IV delivery.",
    url: "https://doi.org/10.1200/JCO.2002.20.1.142", full: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2064865/",
    journal: "Journal of Clinical Oncology", locator: "Table 3 and Results, tumour colonisation and toxicity",
  },
  {
    id: "heimann", group: "Blood-vessel delivery", route: "Intravenous", name: "VNP20009 follow-up",
    authors: "Heimann & Rosenberg", year: 2003, short: "VNP20009 · follow-up cohort",
    population: "Four additional people with metastatic melanoma in a follow-up report.",
    method: "Tumour culture", kind: "culture", treated: 4, sampled: 4, positive: 1,
    tissue: "All four patients had excised tumour tissue tested. A single colony grew from the day-5 specimen. No growth was seen in the other three patients, whose tissue was taken on day 14.",
    safety: "One patient developed grade 3 transient hypoxia and another had grade 3 low phosphate. The report gives no formal dose-limiting toxicity count.",
    detailTitle: "Why timing matters",
    detail: "The day-5 and day-14 samples came from different people. These observations establish a single positive culture, without showing how long the bacteria persisted in that tumour.",
    shortFinding: "1 of 4 sampled patients had a positive culture. One colony was recovered on day 5.",
    readout: "Viable bacteria at one time point after IV delivery.",
    url: "https://pubmed.ncbi.nlm.nih.gov/12616110/", full: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2656370/",
    journal: "Journal of Immunotherapy", locator: "Table 1, timing footnote and safety narrative",
  },
  {
    id: "sgn1", group: "Blood-vessel delivery", route: "IV and/or intra-arterial", name: "SGN1",
    authors: "Li et al.", year: 2026, short: "SGN1 · mixed vascular routes",
    population: "25 people with advanced bone or soft-tissue sarcoma. Thirteen received IV treatment, eight intra-arterial treatment and four both.",
    method: "Tumour DNA assay", kind: "unquantified", treated: 25, sampled: null, positive: null,
    headline: "DNA detected", note: "A tumour signal was reported after treatment. The abstract gives no patient-level positivity rate.",
    facts: [["25","patients treated"],["Unreported","number with tumour tests"]],
    tissue: "The ASCO abstract reports a positive bacterial DNA signal by quantitative PCR. It gives no tested count, positive count, sampling time or delivery route for the positive specimens.",
    safety: "The abstract gives no dose-limiting toxicity count. Fever was the most frequent treatment-related event (32%). No treatment-related deaths were reported.",
    detailTitle: "What the abstract leaves open",
    detail: "A DNA signal can establish the presence of bacterial material. The abstract does not establish viability or give a separate tissue result for the 13 IV-only patients.",
    shortFinding: "Tumour bacterial DNA was detected. The positive and tested patient counts are unreported.",
    readout: "Post-treatment DNA signal in a mixed-route cohort. Conference abstract.",
    url: "https://doi.org/10.1200/JCO.2026.44.16_suppl.11530",
    journal: "Journal of Clinical Oncology, ASCO abstract", locator: "Abstract 11530, Methods and Results",
  },
  {
    id: "tapet", group: "Direct tumour injection", route: "Intratumoral", name: "TAPET-CD",
    authors: "Nemunaitis et al.", year: 2003, short: "TAPET-CD · local persistence",
    population: "Three people with refractory cancer in a pilot study.",
    method: "Tumour culture", kind: "culture", treated: 3, sampled: 3, positive: 2,
    tissue: "All three injected tumours were sampled. Cultures showed viable bacteria in two patients, with detection through at least day 15 in both.",
    safety: "One patient withdrew after grade 3 chest pain of uncertain cause. The trial closed for nonmedical reasons before a maximum tolerated dose was established.",
    detailTitle: "What direct injection can show",
    detail: "This establishes persistence at the injection site in two people. Travel from the bloodstream to a distant tumour is a separate question.",
    shortFinding: "2 of 3 sampled patients had viable bacteria in the injected tumour through at least day 15.",
    readout: "Local persistence after bacteria were placed in the tumour.",
    url: "https://pubmed.ncbi.nlm.nih.gov/14502226/",
    journal: "Cancer Gene Therapy", locator: "Tables 3–4, toxicity and tissue colonisation",
  },
  {
    id: "novyi", group: "Direct tumour injection", route: "Intratumoral", name: "C. novyi-NT",
    authors: "Janku et al.", year: 2021, short: "C. novyi-NT · germination",
    population: "24 people with treatment-refractory advanced solid tumours.",
    method: "Clinical and imaging signs", kind: "clinical", treated: 24, sampled: null, positive: null,
    headline: "10 of 24", note: "Treated patients with signs of germination and breakdown of the injected tumour.",
    facts: [["8","patients with paired immune biopsies"],["Unreported","cohort tissue-culture rate"]],
    tissue: "Investigators assessed local germination using clinical and imaging findings. Eight patients gave paired biopsies to assess immune infiltration. The culture-positive fraction for the whole cohort is unreported.",
    safety: "Three dose-limiting events were reported. Two patients developed grade 4 sepsis and one developed grade 4 gas gangrene.",
    detailTitle: "One confirmed tissue result",
    detail: "A separate report of the first participant describes a positive tumour aspirate culture and bacteria visible on biopsy. It is one case from this same cohort.",
    shortFinding: "10 of 24 showed clinical or imaging signs of germination. One case has direct tissue confirmation. The cohort culture rate is unknown.",
    readout: "Local germination signs, with direct tissue evidence in a reported case.",
    url: "https://doi.org/10.1158/1078-0432.CCR-20-2065",
    extra: {label:"First participant’s tissue result",url:"https://pubmed.ncbi.nlm.nih.gov/25122639/"},
    journal: "Clinical Cancer Research", locator: "Results, germination, safety and host immune response",
  },
  {
    id: "synb", group: "Direct tumour injection", route: "Intratumoral", name: "SYNB1891",
    authors: "Luke et al.", year: 2023, short: "SYNB1891 · day-7 tissue test",
    population: "32 people with refractory advanced cancers, 24 on monotherapy and eight with atezolizumab.",
    method: "Tumour DNA assay", kind: "unquantified", treated: 32, sampled: null, positive: null,
    headline: "No detection", note: "The bacterial DNA test was negative in sampled tumours seven days after the first injection.",
    facts: [["32","patients treated"],["Unreported","day-7 patient denominator"]],
    tissue: "The report describes a negative strain-specific DNA assay in day-7 tumour aspirates. It does not state how many patients contributed to that assay result.",
    safety: "Five cytokine release syndrome events occurred on monotherapy. One grade 3 event met the trial’s dose-limiting toxicity criteria.",
    detailTitle: "Two different tissue tests",
    detail: "The 12 patients with paired core biopsies contributed to a later immune gene-expression analysis. Using 12 or 32 as the day-7 bacterial test denominator would answer the wrong question.",
    shortFinding: "Bacterial DNA was undetectable in day-7 tumour samples after direct injection. The tested patient count is unstated.",
    readout: "A negative DNA test at one time after direct injection.",
    url: "https://pubmed.ncbi.nlm.nih.gov/37227176/", full: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11225568/",
    journal: "Clinical Cancer Research", locator: "Results, biodistribution, pharmacodynamics and safety",
  },
  {
    id: "ecn", group: "Oral administration", route: "Oral", name: "E. coli Nissle",
    authors: "Gurbatri et al.", year: 2024, short: "E. coli Nissle · paired bowel tissue",
    population: "Preoperative colorectal study with 35 recruited. The human paired-tissue analysis included six probiotic recipients and two placebo recipients.",
    method: "Paired tissue comparison", kind: "paired", treated: null, sampled: 6, positive: null,
    headline: "Tumour enrichment", note: "The oral probiotic produced a stronger signal in tumour than in adjacent normal tissue across the analysed active group.",
    facts: [["6","active-arm patients analysed"],["2","placebo patients analysed"]],
    tissue: "The team compared paired neoplastic and normal bowel tissue using culture followed by strain-specific PCR. Two of six probiotic recipients did not show preferential tumour enrichment.",
    safety: "This preoperative study investigated colonisation with a probiotic. A dose-limiting toxicity count was not reported.",
    detailTitle: "What enrichment means",
    detail: "The comparison measures relative signal in paired tissues. An absolute patient-level culture-positive rate cannot be read from that result. The human arm studied the unmodified probiotic.",
    shortFinding: "Six active and two placebo recipients had evaluable paired tissue. Tumour enrichment varied between participants.",
    readout: "Relative enrichment after oral exposure in colorectal tissue.",
    url: "https://doi.org/10.1038/s41467-024-44776-4", full:"https://pmc.ncbi.nlm.nih.gov/articles/PMC10799955/",
    journal: "Nature Communications", locator: "Figure 2J–K, human study Methods and Discussion",
  },
];

export const firstStudy = studies[0];
export const peerFor = id => studies.find(s => s.id === (id === "tapet" ? "toso" : "tapet"));
export function canSwitch(study) {
  return study.kind === "culture" && study.sampled < study.treated;
}
export function observed(study, base = "sampled") {
  if (study.kind !== "culture") return null;
  const treatedBase = canSwitch(study) && base === "treated";
  return {
    denominator: treatedBase ? study.treated : study.sampled,
    positive: study.positive, negative: study.sampled - study.positive,
    unlisted: treatedBase ? study.treated - study.sampled : 0,
    treatedBase,
  };
}
export function selection(search) {
  const query = new URLSearchParams(search);
  const study = studies.find(s => s.id === query.get("study")) ?? firstStudy;
  const peer = studies.find(s => s.id === query.get("with") && s.id !== study.id) ?? null;
  return {study, peer, base:canSwitch(study) && query.get("base") === "treated" ? "treated" : "sampled"};
}
export function linkFor(url, study, base, peer) {
  const link = new URL(url);
  link.searchParams.set("study", study.id);
  if (base === "treated" && canSwitch(study)) link.searchParams.set("base", base);
  else link.searchParams.delete("base");
  if (peer && peer.id !== study.id) link.searchParams.set("with", peer.id);
  else link.searchParams.delete("with");
  link.hash = "";
  return link;
}
export function citation(study, base="sampled") {
  const count = observed(study,base);
  const qualifier = count?.treatedBase
    ? " There were " + count.positive + " documented positive tissue results among " + count.denominator + " treated. " + count.unlisted + " had no tumour-culture result listed."
    : "";
  return study.authors + " (" + study.year + "), " + study.name + " · " + study.route + ". " +
    study.shortFinding + qualifier + " " + study.safety + "\n" + study.journal + ", " + study.locator + ". " + study.url;
}
