import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap } from "lucide-react";
import { getTranslation, type Locale } from "@/lib/i18n";
import CollegeCard from "../collage-card";
import { getCollages } from "@/prisma/seed";
import summarizeHtmlContent from "@/lib/summarize-html-content";

interface CollegesSectionProps {
  locale: Locale;
}

const CollegesSection: React.FC<CollegesSectionProps> = async ({ locale }) => {
  // Sample colleges data - you can expand this to include all 19+ colleges
  const collegesa = [
    {
      nameAr: "كلية الطب",
      nameEn: "Faculty of Medicine",
      descriptionAr: "تقدم برامج طبية متقدمة لإعداد أطباء مؤهلين لخدمة المجتمع",
      descriptionEn:
        "Offers advanced medical programs to prepare qualified doctors to serve the community",
      studentsCount: 850,
      programsCount: 12,
      image: "/placeholder.svg",
      color: "bg-forest-500",
    },
    {
      nameAr: "كلية الهندسة",
      nameEn: "Faculty of Engineering",
      descriptionAr: "تضم تخصصات هندسية متنوعة مع التركيز على التطبيق العملي",
      descriptionEn:
        "Includes diverse engineering specializations with focus on practical application",
      studentsCount: 1200,
      programsCount: 8,
      image: "/placeholder.svg",
      color: "bg-sage-500",
    },
    {
      nameAr: "كلية العلوم",
      nameEn: "Faculty of Science",
      descriptionAr:
        "تقدم برامج علمية في الرياضيات والفيزياء والكيمياء والأحياء",
      descriptionEn:
        "Offers scientific programs in mathematics, physics, chemistry and biology",
      studentsCount: 650,
      programsCount: 15,
      image: "/placeholder.svg",
      color: "bg-olive-500",
    },
    {
      nameAr: "كلية الآداب",
      nameEn: "Faculty of Arts",
      descriptionAr: "تشمل اللغات والتاريخ والجغرافيا والفلسفة",
      descriptionEn: "Includes languages, history, geography and philosophy",
      studentsCount: 920,
      programsCount: 18,
      image: "/placeholder.svg",
      color: "bg-forest-600",
    },
    {
      nameAr: "كلية إدارة الأعمال",
      nameEn: "Faculty of Business Administration",
      descriptionAr: "تقدم برامج في الإدارة والمحاسبة والاقتصاد",
      descriptionEn: "Offers programs in management, accounting and economics",
      studentsCount: 1100,
      programsCount: 10,
      image: "/placeholder.svg",
      color: "bg-sage-600",
    },
    {
      nameAr: "كلية القانون",
      nameEn: "Faculty of Law",
      descriptionAr: "تختص في القانون المدني والجنائي والدولي",
      descriptionEn: "Specializes in civil, criminal and international law",
      studentsCount: 780,
      programsCount: 6,
      image: "/placeholder.svg",
      color: "bg-olive-600",
    },
  ];
  const collages = await getCollages();

  return (
    <section className="py-20 bg-gradient-to-br from-sage-50 via-white to-olive-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-forest-300"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-sage-300"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-olive-300"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-forest-500 rounded-full flex items-center justify-center mr-3 rtl:mr-0 rtl:ml-3">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div className="h-1 w-20 bg-gradient-to-r from-forest-500 to-sage-500 rounded"></div>
          </div>

          <h3 className="text-4xl md:text-5xl font-bold text-forest-800 mb-6">
            {getTranslation(locale, "faculties")}
          </h3>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {locale === "ar"
              ? "تضم جامعة الزيتونة أكثر من 19 كلية متميزة تقدم برامج أكاديمية شاملة في مختلف التخصصات"
              : "Al-Zaytouna University comprises more than 19 distinguished faculties offering comprehensive academic programs across various specializations"}
          </p>
        </div>

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {collages.map((college, index) => (
            <div
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CollegeCard
                locale={locale}
                college={{
                  id: college.id,
                  nameAr: college.ArCollageData?.title || "غير معروف",
                  nameEn: college.EnCollageData?.title || "Unknown",
                  descriptionAr:
                    summarizeHtmlContent(
                      college.ArCollageData?.content ?? ""
                    ) || "لا يوجد وصف",
                  descriptionEn:
                    summarizeHtmlContent(
                      college.EnCollageData?.content ?? ""
                    ) || "No description available",
                  color: "bg-forest-500",
                  image: college.logo || "/placeholder.svg",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollegesSection;
