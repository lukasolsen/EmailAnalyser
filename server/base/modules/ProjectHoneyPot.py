import feedparser

HoneyPotFeed = feedparser.parse("https://www.projecthoneypot.org/list_of_ips.php?rss=1")

def ProjectHoneyPot(ip):
    for entry in HoneyPotFeed.entries:
        print(entry.title)
        if entry.title == ip:
            return entry.summary
    return "IP not found in Project Honey Pot"