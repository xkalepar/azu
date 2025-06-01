export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ar";

export const translations = {
  ar: {
    readMore: "المزيد",
    publishedOn: "نُشر في",
    home: "الرئيسية",
    about: "حول الجامعة",
    faculties: "الكليات",
    programs: "البرامج الأكاديمية",
    admissions: "القبول والتسجيل",
    news: "الأخبار والفعاليات",
    contact: "اتصل بنا",

    // Hero Section
    universityName: "جامعة الزيتونة ترهونة",
    heroTitle: "التميز في التعليم العالي والبحث العلمي",
    heroSubtitle: "نبني جيلاً واعياً ومتعلماً لخدمة المجتمع والوطن",
    explorePrograms: "استكشف البرامج",
    applyNow: "تقدم الآن",

    // Quick Links
    quickAccess: "وصول سريع",
    studentPortal: "بوابة الطلاب",
    facultyDirectory: "دليل أعضاء هيئة التدريس",
    academicCalendar: "التقويم الأكاديمي",
    library: "المكتبة",

    // About Section
    aboutUniversity: "حول الجامعة",
    aboutDescription:
      "جامعة الزيتونة ترهونة مؤسسة تعليمية رائدة تسعى لتقديم تعليم عالي الجودة وإجراء بحوث علمية متميزة تخدم المجتمع وتساهم في التنمية المستدامة.",
    learnMore: "اعرف المزيد",

    // Stats
    students: "طالب وطالبة",
    faculty: "عضو هيئة تدريس",
    // prog/rams: "برنامج أكاديمي",
    years: "سنة من التميز",

    // Footer
    quickLinks: "روابط سريعة",
    contactInfo: "معلومات الاتصال",
    allRightsReserved: "جميع الحقوق محفوظة",

    // Contact
    address: "ترهونة، ليبيا",
    email: "info@azu.edu.ly",
    phone: "+218 21 123 4567",
  },
  en: {
    readMore: "more",
    publishedOn: "Published on",
    // Navigation
    home: "Home",
    about: "About",
    faculties: "Faculties",
    programs: "Academic Programs",
    admissions: "Admissions",
    news: "News & Events",
    contact: "Contact",

    // Hero Section
    universityName: "Al-Zaytouna University, Tarhuna",
    heroTitle: "Excellence in Higher Education and Scientific Research",
    heroSubtitle: "Building an educated generation to serve society and nation",
    explorePrograms: "Explore Programs",
    applyNow: "Apply Now",

    // Quick Links
    quickAccess: "Quick Access",
    studentPortal: "Student Portal",
    facultyDirectory: "Faculty Directory",
    academicCalendar: "Academic Calendar",
    library: "Library",

    // About Section
    aboutUniversity: "About the University",
    aboutDescription:
      "Al-Zaytouna University Tarhuna is a leading educational institution that strives to provide high-quality education and conduct distinguished scientific research that serves society and contributes to sustainable development.",
    learnMore: "Learn More",

    // Stats
    students: "Students",
    faculty: "Faculty Members",
    // programs: "Academic Programs",
    years: "Years of Excellence",

    // Footer
    quickLinks: "Quick Links",
    contactInfo: "Contact Information",
    allRightsReserved: "All Rights Reserved",

    // Contact
    address: "Tarhuna, Libya",
    email: "info@azu.edu.ly",
    phone: "+218 21 123 4567",
  },
};

export function getTranslation(
  locale: Locale,
  key: keyof typeof translations.ar
): string {
  return translations[locale][key] || translations[defaultLocale][key];
}
