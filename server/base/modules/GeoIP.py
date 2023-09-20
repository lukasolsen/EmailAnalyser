from ip2geotools.databases.noncommercial import DbIpCity

def GeoIP(ip):
  response = DbIpCity.get(ip, api_key='free')
  if response is not None:
    return response.to_json()
  else:
    return None