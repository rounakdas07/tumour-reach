import {writeFile} from "node:fs/promises";
import {pathToFileURL} from "node:url";
import {studies} from "../studies.mjs";

export function evidenceCSV() {
  const columns = ["study","authors","year","route","assay","population","treated","sampled_for_stated_assay","patients_positive_culture","finding","tissue_evidence","safety","interpretation","source","source_location","additional_source"];
  const rows = studies.map(s => [s.name,s.authors,s.year,s.route,s.method,s.population,s.treated,s.sampled,s.positive,s.shortFinding,s.tissue,s.safety,s.detail,s.url,s.locator,s.extra?.url]);
  return [columns,...rows].map(row => row.map(value => '"' + String(value ?? "").replaceAll('"','""') + '"').join(",")).join("\r\n") + "\r\n";
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await writeFile(new URL("../human-studies.csv", import.meta.url),evidenceCSV());
}
