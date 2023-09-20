from lingua import Language, LanguageDetectorBuilder
# English, Norwegian Bokmål, Canada, Australia
languages = [Language.ENGLISH, Language.BOKMAL]
detector = LanguageDetectorBuilder.from_languages(*languages).build()



# Return the language as well as the confidence
def detect_language(text):
    languagesDetected = []
    
    confidence_values = detector.compute_language_confidence_values(text)
    for language, value in confidence_values:
        languagesDetected.append((language, value))
    return languagesDetected