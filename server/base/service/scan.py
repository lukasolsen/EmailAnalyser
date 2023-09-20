from . import parse as parser
from modules import YaraRules, GeoIP, ProjectHoneyPot, LangDetect

class Scanner:
  def __init__(self):
    self.yara_manager = YaraRules.YaraManager()

  def parse_email(self, email_content: str):
    return parser.parse_email(email_content)

  def scan(self, email: str):
    # parse it
    parsed_email = self.parse_email(email)

    # Use LangDetect on the body of the email, check if it's HTML or not
    # If it's HTML, use BeautifulSoup to parse it
    # If it's not HTML, just continue like usual

    
    content = parsed_email.get_payload()
    #lang = LangDetect.detect_language(content)
    potentialLanguage = []

    # Loop around the content if it has multiple parts
    # Then use the LangDetect to detect the language of each part
    # Append the result to the potentialLanguage list
    if parsed_email.is_multipart():
      for part in parsed_email.walk():
        content_type = part.get_content_type()
        content_disposition = str(part.get("Content-Disposition"))

        # Extract text/plain content
        if "attachment" not in content_disposition and "text/plain" in content_type:
          content = part.get_payload(decode=True)
          print("Content -> ", content)
          # turn content into string but also fix some encoding issues, and make it prettier for it to read
          content = content.decode('utf-8', 'ignore')
          content = content.replace("\r\n", "")
          content = content.replace("\n", "")
          content = content.replace("\t", "")

          lang = LangDetect.detect_language(content)
          potentialLanguage.append(lang)
        else:
          continue

    print("Language -> ", potentialLanguage)

    # get ip and geoip
    ip = parsed_email.get("Received-SPF").split("client-ip=")[1].split(";")[0]
    print("IP Address -> " + str(ip))
    
    #geoip = GeoIP.GeoIP(ip)
    #print("GeoIP -> ", geoip)

    # check if ip is in honeypot
    honeypot = ProjectHoneyPot.ProjectHoneyPot(ip)
    print("Honeypot -> " + str(honeypot))

    # analyze it
    analysis_result = self.yara_manager.analyze_email(email)

    # return the result
    return {
      "analysis_result": analysis_result,
      "parsed_email": parsed_email,
      #"geoip": geoip,
      "honeypot": honeypot,

    }