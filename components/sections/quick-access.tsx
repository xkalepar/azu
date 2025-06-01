import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { User, Calendar, Folder, Contact } from "lucide-react";
import { type Locale } from "@/lib/i18n";

interface QuickAccessProps {
  locale: Locale;
}

const QuickAccess: React.FC<QuickAccessProps> = ({ locale }) => {
  const quickLinks = [
    {
      enTitle: "Student Portal",
      arTitle: "التعليم الإلكتروني",
      icon: User,
      color: "bg-forest-500",
    },
    {
      enTitle: "Admissions & Registration",
      arTitle: "التسجيل والقبول",
      icon: Contact,
      color: "bg-sage-500",
    },
    {
      enTitle: "Digital Library",
      arTitle: "المكتبة الإلكترونية",
      icon: Calendar,
      color: "bg-olive-500",
    },
    {
      enTitle: "Repository",
      arTitle: "المستودع الرقمي",
      icon: Folder,
      color: "bg-forest-600",
    },
  ] as const;

  const heading = locale === "ar" ? "روابط سريعة" : "Quick Access";

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-forest-800 mb-4">
            {heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link, index) => (
            <Card
              key={link.enTitle}
              className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-3 cursor-pointer group border-sage-200 bg-white/80 backdrop-blur-sm"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`w-16 h-16 ${link.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <link.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-forest-800 group-hover:text-sage-600 transition-colors">
                  {locale === "ar" ? link.arTitle : link.enTitle}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickAccess;
