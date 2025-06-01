import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, BookOpen } from "lucide-react";
import { getTranslation, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface CollegeCardProps {
  locale: Locale;
  college: {
    id: string;
    nameAr: string;
    nameEn: string;
    descriptionAr: string;
    descriptionEn: string;
    // studentsCount: number;
    // programsCount: number;
    image: string;
    color: string;
  };
}

const CollegeCard: React.FC<CollegeCardProps> = ({ locale, college }) => {
  const collegeName = locale === "ar" ? college.nameAr : college.nameEn;
  const collegeDesc =
    locale === "ar" ? college.descriptionAr : college.descriptionEn;

  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border-sage-200 bg-white/90 backdrop-blur-sm overflow-hidden">
      <div className={`h-2 w-full ${college.color}`}></div>

      <CardContent className="p-6">
        {/* College Icon/Image */}
        <div
          className={`w-16 h-16 ${college.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
        >
          <Avatar className="w-14 h-14">
            <AvatarImage src={college.image} />
            <AvatarFallback>AZU</AvatarFallback>
          </Avatar>
          {/* <BookOpen className="h-8 w-8 text-white" />
           */}
        </div>

        {/* College Name */}
        <h3 className="text-xl font-bold text-forest-800 mb-3 text-center group-hover:text-sage-600 transition-colors line-clamp-2">
          {collegeName}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 text-center line-clamp-3 leading-relaxed">
          {collegeDesc}
        </p>

        {/* Stats */}
        <div className="flex justify-between items-center mb-4 px-2">
          <div className="flex items-center gap-1 text-sage-600"></div>
        </div>

        {/* Learn More Button */}
        <Link
          href={`/${locale}/collages/${college.id}`}
          className="flex items-center justify-center text-forest-600 group-hover:text-sage-600 transition-colors"
        >
          <span className="text-sm font-medium">
            {getTranslation(locale, "learnMore")}
          </span>
          <ArrowRight
            className={cn(
              "h-4 w-4 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1 rtl:rotate-180",
              locale === "ar" ? "mr-1" : "ml-1"
            )}
          />
        </Link>
      </CardContent>
    </Card>
  );
};

export default CollegeCard;
