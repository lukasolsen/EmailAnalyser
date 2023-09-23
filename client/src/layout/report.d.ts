interface IReport {
  id?: string;
  hash: string;
  ip: string;
  tags: string[];
  detections: number;
  firstReport: string;
  lastReport: string;
  submitters: string[];
  icon: string;

  // Optional fields
  yara_results?: YaraResults[];
}

interface YaraResults {
  description: string;
  source: string;
  author: string;
  ruleset_name: string;
  rule_name: string;
  ruleset_id: string;
}
