"use client"

import { createContext, useContext, useState, useEffect } from "react"

const LanguageContext = createContext()

export const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
]

const translations = {
  en: {
    financing: "Financing",
    creditEngine: "Credit Engine",
    academy: "Academy",
    marketplace: "Marketplace",
    about: "About",
    impact: "Impact",
    getStarted: "Get Started",
    learnMore: "Learn More",
    heroTitle: "Inclusive Growth",
    heroSubtitle: "For MSMEs",
    heroDescription:
      "EmpowerMSME provides alternative financing, AI-powered credit evaluation, and personalized financial education designed specifically for women-led businesses across India.",
    empoweringGrowth: "Empowering Growth Through Innovation",
    comprehensivePlatform: "Our comprehensive platform combines cutting-edge technology with personalized support",
    alternativeFinancing: "Alternative Financing",
    alternativeFinancingDesc: "Crowdfunding and revenue-based funding options tailored for MSMEs",
    aiCreditEngine: "AI Credit Engine",
    aiCreditEngineDesc: "Smart credit evaluation powered by advanced AI algorithms",
    msmeAcademy: "MSME Academy",
    msmeAcademyDesc: "Personalized financial education and business development resources",
    communityEcosystem: "Community Ecosystem",
    communityEcosystemDesc: "Connect with investors, mentors, and fellow entrepreneurs",
    featuredBusinesses: "Featured Businesses",
    discoverMSMEs: "Discover verified MSMEs seeking funding and partnerships",
    ourImpact: "Our Impact",
    creatingChange: "Creating meaningful change across India",
    businessesFunded: "Businesses Funded",
    communitiesImpacted: "Communities Impacted",
    jobsCreated: "Jobs Created",
    verified: "Verified",
    sector: "Sector",
    location: "Location",
    fundingGoal: "Funding Goal",
    viewProfile: "View Profile",
    exploreAll: "Explore All Businesses",
    spamCheckBubble: "Got a business-related SMS? Wanna check if it's spam or not?",
    checkMessage: "Check Message",
    pasteSMS: "Paste the SMS message here",
  },
  hi: {
    financing: "वित्तपोषण",
    creditEngine: "क्रेडिट इंजन",
    academy: "अकादमी",
    marketplace: "बाज़ार",
    about: "हमारे बारे में",
    impact: "प्रभाव",
    getStarted: "शुरू करें",
    learnMore: "और जानें",
    heroTitle: "समावेशी विकास",
    heroSubtitle: "एमएसएमई के लिए",
    heroDescription:
      "EmpowerMSME वैकल्पिक वित्तपोषण, AI-संचालित क्रेडिट मूल्यांकन और व्यक्तिगत वित्तीय शिक्षा प्रदान करता है जो विशेष रूप से भारत भर में महिला-नेतृत्व वाले व्यवसायों के लिए डिज़ाइन किया गया है।",
    empoweringGrowth: "नवाचार के माध्यम से विकास को सशक्त बनाना",
    comprehensivePlatform: "हमारा व्यापक प्लेटफॉर्म अत्याधुनिक तकनीक को व्यक्तिगत समर्थन के साथ जोड़ता है",
    alternativeFinancing: "वैकल्पिक वित्तपोषण",
    alternativeFinancingDesc: "MSMEs के लिए तैयार किए गए क्राउडफंडिंग और राजस्व-आधारित वित्तपोषण विकल्प",
    aiCreditEngine: "AI क्रेडिट इंजन",
    aiCreditEngineDesc: "उन्नत AI एल्गोरिदम द्वारा संचालित स्मार्ट क्रेडिट मूल्यांकन",
    msmeAcademy: "MSME अकादमी",
    msmeAcademyDesc: "व्यक्तिगत वित्तीय शिक्षा और व्यावसायिक विकास संसाधन",
    communityEcosystem: "समुदाय पारिस्थितिकी तंत्र",
    communityEcosystemDesc: "निवेशकों, सलाहकारों और साथी उद्यमियों से जुड़ें",
    featuredBusinesses: "विशेष व्यवसाय",
    discoverMSMEs: "सत्यापित MSMEs की खोज करें जो वित्त पोषण और भागीदारी की तलाश में हैं",
    ourImpact: "हमारा प्रभाव",
    creatingChange: "भारत भर में सार्थक परिवर्तन बनाना",
    businessesFunded: "वित्त पोषित व्यवसाय",
    communitiesImpacted: "प्रभावित समुदाय",
    jobsCreated: "नौकरियां बनाई गईं",
    verified: "सत्यापित",
    sector: "क्षेत्र",
    location: "स्थान",
    fundingGoal: "वित्तपोषण लक्ष्य",
    viewProfile: "प्रोफाइल देखें",
    exploreAll: "सभी व्यवसायों की खोज करें",
    spamCheckBubble: "क्या आपको एक व्यावसायिक SMS मिला? क्या आप जांचना चाहते हैं कि यह स्पैम है या नहीं?",
    checkMessage: "संदेश जांचें",
    pasteSMS: "SMS संदेश यहां पेस्ट करें",
  },
  ta: {
    financing: "நிதியுதவி",
    creditEngine: "கடன் எஞ்சின்",
    academy: "அகாடமி",
    marketplace: "சந்தை",
    about: "பற்றி",
    impact: "தாக்கம்",
    getStarted: "தொடங்கவும்",
    learnMore: "மேலும் அறிக",
    heroTitle: "உள்ளடக்கமான வளர்ச்சி",
    heroSubtitle: "MSMEs க்கு",
    heroDescription: "EmpowerMSME மாற்று நிதியுதவி, AI-சக்திவாய்ந்த கடன் மূல்யாய்ப்பு மற்றும் ব்যক்திப்படு நிதியுதவி கல்வி வழங்குகிறது",
    spamCheckBubble: "ஒரு ஆண்டி-வணிக SMS கிடைத்தது? இது ஸ்பாம் இல்லையா என சரிபார்க்க விரும்புகிறீர்கள்?",
    checkMessage: "செய்தி சரிபார்க்கவும்",
    pasteSMS: "SMS செய்தியை இங்கே ஒட்டவும்",
  },
  te: {
    financing: "ఆర్థిక సహాయం",
    creditEngine: "క్రెడిట్ ఇంజిన్",
    academy: "అకాడమీ",
    marketplace: "మార్కెట్‌ప్లేస్",
    about: "గురించి",
    impact: "ప్రభావం",
    getStarted: "ప్రారంభించండి",
    learnMore: "మరింత తెలుసుకోండి",
    heroTitle: "సమावేశ ఆర్థిక",
    heroSubtitle: "MSMEs కోసం",
    heroDescription: "EmpowerMSME ప్రత్యామ్నాయ ఆర్థిక సహాయం, AI-శక్తితో కూడిన క్రెడిట్ మూల్యాంకనం మరియు ప్రత్యక్ష ఆర్థిక విద్య అందిస్తుంది",
    spamCheckBubble: "ఒక ఉద్యోగ సంబంధిత SMS పొందారా? ఇది స్పామ్ కాదా అని తనిఖీ చేయాలనుకుంటున్నారా?",
    checkMessage: "సందేశం తనిఖీ చేయండి",
    pasteSMS: "SMS సందేశాన్ని ఇక్కడ అతికించండి",
  },
  kn: {
    financing: "ಪದರ",
    creditEngine: "ಕ್ರೆಡಿಟ್ ಇಂಜಿನ್",
    academy: "ಅಕಾಡೆಮಿ",
    marketplace: "ಮಾರುಕಟ್ಟೆ",
    about: "ಬಗ್ಗೆ",
    impact: "ಪ್ರಭಾವ",
    getStarted: "ಪ್ರಾರಂಭಿಸಿ",
    learnMore: "ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ",
    heroTitle: "ಸಮಾವೇಶ ಬೆಳವಣಿಗೆ",
    heroSubtitle: "MSMEs ಗಾಗಿ",
    heroDescription: "EmpowerMSME ಪರ್ಯಾಯ ಪದರ, AI-ಶಕ್ತಿಸುವ ಸ್ಥಿರತೆ ಮೂಲ್ಯಾಂಕನ ಮತ್ತು ವ್ಯಕ್ತಿಗತ ಪದರ ಶಿಕ್ಷೆ ಒದಗಿಸುತ್ತದೆ",
    spamCheckBubble: "ಒಂದು ವ್ಯವಹಾರ ಸಂಬಂಧಿತ SMS ಪಡೆದುಕೊಂಡಿದ್ದೀರಾ? ಇದು ಸ್ಪ್ಯಾಮ್ ಅಲ್ಲವೋ ಎಂದು ಪರಿಶೀಲಿಸಬೇಕೆ?",
    checkMessage: "ಸಂದೇಶ ಪರಿಶೀಲಿಸಿ",
    pasteSMS: "SMS ಸಂದೇಶವನ್ನು ಇಲ್ಲಿ ಅಂಟಿಸಿ",
  },
  ml: {
    financing: "ധനസഹായം",
    creditEngine: "ക്രെഡിറ്റ് ഇഞ്ജിൻ",
    academy: "അക്കാദമി",
    marketplace: "മാർക്കെറ്റ്പ്ലേസ്",
    about: "കുറിച്ച്",
    impact: "പ്രഭാവം",
    getStarted: "ആരംഭിക്കുക",
    learnMore: "കൂടുതൽ അറിയുക",
    heroTitle: "സമാവേശ വളർച്ച",
    heroSubtitle: "MSMEs യ്ക്കായി",
    heroDescription: "EmpowerMSME ബദൽ ധനസഹായം, AI-സശക്ത ക്രെഡിറ്റ് മൂല്യനിർണ്ണയം കൂടാതെ വ്യക്തിഗത ധനകാര്യ വിദ്യ പ്രദാനം ചെയ്യുന്നു",
    spamCheckBubble: "ഒരു ബിസിനസ് അനുബന്ധിത SMS ലഭിച്ചുവോ? ഇതു സ്പാം അല്ലെന്ന് പരിശോധിക്കാൻ ആഗ്രഹിക്കുന്നുവോ?",
    checkMessage: "സന്ദേശം പരിശോധിക്കുക",
    pasteSMS: "SMS സന്ദേശം ഇവിടെ ചെപ്പിടിക്കുക",
  },
  mr: {
    financing: "वित्तपोषण",
    creditEngine: "क्रेडिट इंजिन",
    academy: "एकेडमी",
    marketplace: "मार्केटप्लेस",
    about: "बद्दल",
    impact: "प्रभाव",
    getStarted: "सुरू करा",
    learnMore: "आणखी जाणून घ्या",
    heroTitle: "सर्वसमावेशक वृद्धी",
    heroSubtitle: "MSMEs साठी",
    heroDescription: "EmpowerMSME पर्यायी वित्तपोषण, AI-चालित क्रेडिट मूल्यांकन आणि व्यक्तिगतकृत आर्थिक शिक्षा प्रदान करते",
    spamCheckBubble: "व्यावसायिक संबंधित SMS मिळाले? ते स्पॅम आहे की नाही हे तपासू इच्छा आहे?",
    checkMessage: "संदेश तपासा",
    pasteSMS: "SMS संदेश येथे पेस्ट करा",
  },
  bn: {
    financing: "অর্থায়ন",
    creditEngine: "ক্রেডিট ইঞ্জিন",
    academy: "একাডেমি",
    marketplace: "বাজার",
    about: "সম্পর্কে",
    impact: "প্রভাব",
    getStarted: "শুরু করুন",
    learnMore: "আরও জানুন",
    heroTitle: "অন্তর্ভুক্তিমূলক বৃদ্ধি",
    heroSubtitle: "MSMEs এর জন্য",
    heroDescription: "EmpowerMSME বিকল্প অর্থায়ন, AI-চালিত ক্রেডিট মূল্যায়ন এবং ব্যক্তিগতকৃত আর্থিক শিক্ষা প্রদান করে",
    spamCheckBubble: "একটি ব্যবসায়-সম্পর্কিত এসএমএস পেয়েছেন? এটি স্প্যাম কিনা তা পরীক্ষা করতে চান?",
    checkMessage: "বার্তা পরীক্ষা করুন",
    pasteSMS: "এসএমএস বার্তা এখানে পেস্ট করুন",
  },
  gu: {
    financing: "ફાઈનાન્સિંગ",
    creditEngine: "ક્રેડિટ ઇજિન",
    academy: "એકેડેમી",
    marketplace: "માર્કેટપ્લેસ",
    about: "વિશે",
    impact: "અસર",
    getStarted: "શરૂ કરો",
    learnMore: "વધુ શીખો",
    heroTitle: "સમાવેશક વૃદ્ધિ",
    heroSubtitle: "MSMEs માટે",
    heroDescription: "EmpowerMSME વૈકલ્પિક ફાઈનાન્સિંગ, AI-સંચાલિત ક્રેડિટ મૂલ્યાંકન અને વ્યક્તિગતકૃત આર્થિક શિક્ષા પ્રદાન કરે છે",
    spamCheckBubble: "એક વ્યવસાય-સંબંધિત એસએમએસ મળ્યો? તમે તે સ્પામ છે કે નહીં તે ચકાસવા માંગો છો?",
    checkMessage: "સંદેશ ચકાસો",
    pasteSMS: "SMS સંદેશ અહીં પેસ્ટ કરો",
  },
  pa: {
    financing: "ਵਿੱਤ",
    creditEngine: "ਕ੍ਰੇਡਿਟ ਇੰਜਨ",
    academy: "ਅਕੈਡਮੀ",
    marketplace: "ਮਾਰਕੈਟਪਲੇਸ",
    about: "ਬਾਰੇ",
    impact: "ਪ੍ਰਭਾਵ",
    getStarted: "ਸ਼ੁਰੂ ਕਰੋ",
    learnMore: "ਹੋਰ ਜਾਣੋ",
    heroTitle: "ਸਮਾਵੇਸ਼ੀ ਵਿਕਾਸ",
    heroSubtitle: "MSMEs ਲਈ",
    heroDescription: "EmpowerMSME ਵਿਕਲਪਿਕ ਵਿੱਤ, AI-ਸੰਚਾਲਿਤ ਕ੍ਰੇਡਿਟ ਮੁਲਾਂਕਣ ਅਤੇ ਵਿਅਕਤੀਗਤ ਵਿੱਤੀ ਸਿੱਖਿਆ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ",
    spamCheckBubble: "ਇੱਕ ਕਾਰੋਬਾਰ-ਸੰਬੰਧਿਤ SMS ਮਿਲਿਆ? ਕੀ ਤੁਸੀਂ ਜਾਂਚ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ ਕਿ ਇਹ ਸਪੈਮ ਹੈ ਜਾ ਨਹੀਂ?",
    checkMessage: "ਸਨੇਹਾ ਜਾਂਚੋ",
    pasteSMS: "SMS ਸਨੇਹਾ ਇੱਥੇ ਚੇਪੋ",
  },
}

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState("en")

  useEffect(() => {
    const saved = localStorage.getItem("preferred_language")
    if (saved) {
      setCurrentLanguage(saved)
    }
  }, [])

  const changeLanguage = (code) => {
    setCurrentLanguage(code)
    localStorage.setItem("preferred_language", code)
  }

  const t = (key) => {
    return translations[currentLanguage]?.[key] || translations.en[key] || key
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
