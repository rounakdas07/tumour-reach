# Tumour Reach

[Open the interactive review](https://rounakdas07.github.io/tumour-reach/) · [Compare IV delivery with direct injection](https://rounakdas07.github.io/tumour-reach/?study=toso&with=tapet) · [Download the evidence table](./human-studies.csv)

An independent review by Rounak Das of seven human studies of bacteria in cancer. Select a study to see the delivery route, tissue assay, patient counts and dose-limiting effects. Each finding links to a primary report. Two studies can be compared side by side and any view can be shared by copying the address.

## The question behind the project

Neobe Therapeutics is taking NEO22 through preclinical development towards a planned 2028 IND filing. One question for a first human trial is how to establish whether bacteria reached a tumour. These studies measured that in different ways, including cultures of viable organisms, bacterial DNA assays, relative tissue enrichment and clinical or imaging signs of germination. All human results here concern other products. [Cancer Research Horizons, 10 November 2026](https://www.cancerresearchhorizons.com/news-and-events/our-news/neobe-raises-68m-break-down-barriers-stop-cancer-treatments-working)

For the opening study, Toso et al. treated 25 people intravenously. Table 3 lists 18 distinct patients with tumour cultures. Three had a positive specimen, 15 had no growth in their listed specimens, and seven treated patients had no result in the table. One lesion was negative by aspiration and positive by excision on the same day. The denominator switch makes those distinctions explicit. [Original paper](https://pmc.ncbi.nlm.nih.gov/articles/PMC2064865/)

## Included reports

| Human study | Evidence available |
| --- | --- |
| [Toso et al., 2002](https://doi.org/10.1200/JCO.2002.20.1.142) | IV, viable tumour cultures, patient-level Table 3 |
| [Heimann & Rosenberg, 2003](https://pubmed.ncbi.nlm.nih.gov/12616110/) | IV, four additional people with excisional biopsies |
| [Li et al., 2026](https://doi.org/10.1200/JCO.2026.44.16_suppl.11530) | IV and/or intra-arterial, tumour DNA, conference abstract with unspecified sample count |
| [Nemunaitis et al., 2003](https://pubmed.ncbi.nlm.nih.gov/14502226/) | Direct injection, local persistence and serial cultures |
| [Janku et al., 2021](https://doi.org/10.1158/1078-0432.CCR-20-2065) | Direct injection, clinical or imaging signs. A [separate account of the first participant](https://pubmed.ncbi.nlm.nih.gov/25122639/) documents tissue confirmation |
| [Luke et al., 2023](https://pubmed.ncbi.nlm.nih.gov/37227176/) | Direct injection, day-7 tumour DNA assay, separate immune biopsies |
| [Gurbatri et al., 2024](https://doi.org/10.1038/s41467-024-44776-4) | Oral, paired neoplastic and adjacent normal bowel tissue in the human arm |

These are selected published examples. Results are study-specific, and no pooled rate is calculated. A documented positive result among everyone treated is a minimum confirmed count. The word “sampled” always refers to the stated assay. Empty fields in the CSV signify unknown or inapplicable values. For the oral study, six denotes the active arm with paired tissue analysed. Its two placebo participants are recorded in the cohort description.

## Run locally

From the project directory, use `python3 -m http.server 8000` and open `http://localhost:8000`. No accounts, secrets, build step or server-side dependencies are required.

Run `node --test` to check the patient counts, separation of assays, share links and CSV. After editing the study records in `studies.mjs`, run `node tools/export.mjs` to regenerate the CSV.
