import yara

class YaraManager:
    def __init__(self):
        self.yaraRules = [
            {
                "name": "Rule 1",
                "description": "Rule 1 description",
                "rule": "rule rule1 {strings: $a = \"rule1\" condition: $a}"
            },
            {
                "name": "Rule 2",
                "description": "Rule 2 description",
                "rule": "rule rule2 {strings: $a = \"K-Pop\" condition: $a}"
            }
        ]
    def analyze_email(self, email_content):
        # Create an empty result dictionary
        analysis_result = {"matches": []}

        try:
            # Scan the email content against the YARA rule
            for rule in self.yaraRules:
                yaraScan = yara.compile(source=rule["rule"])
                matches = yaraScan.match(data=email_content)

                # If there are matches, add them to the result
                if matches:
                    for match in matches:
                        analysis_result["matches"].append({
                            "rule_name": match.rule,
                            "rule_namespace": match.namespace,
                            "matched_text": match.strings[0],
                        })

            # Return the analysis result
            return analysis_result

        except yara.Error as e:
            # Handle YARA rule compilation or matching errors
            return {"error": str(e)}