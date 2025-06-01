import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { type Locale, getTranslation } from "@/lib/i18n";
import Image from "next/image";
import summarizeHtmlContent from "@/lib/summarize-html-content";
import { cn } from "@/lib/utils";
import { CustomLink } from "./custom-link";

interface NewsItem {
  id: string;
  title: { ar: string; en: string };
  excerpt: { ar: string; en: string };
  image: string;
  date: string;
  category: { ar: string; en: string };
  featured: boolean;
}

interface NewsCardProps {
  news: NewsItem;
  locale: Locale;
  featured?: boolean;
  className?: string;
  style?: React.CSSProperties;
  href: string;
  priority?: boolean;
}

const ReusableCard: React.FC<NewsCardProps> = ({
  news,
  locale,
  featured = false,
  className = "",
  style,
  href,
  priority,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (locale === "ar") {
      return date.toLocaleDateString("ar-SA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const arTitle = news.title.ar.length > 0 ? news.title.ar : news.title.en;
  const enTitle = news.title.en.length > 0 ? news.title.en : news.title.ar;

  return (
    <Card
      className={`group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-sage-200 overflow-hidden ${className}`}
      style={style}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <div className="aspect-video bg-gradient-to-br from-sage-200 to-olive-200 relative">
          <Image
            src={news.image}
            alt={locale === "ar" ? arTitle : enTitle}
            fill
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 600px"
            priority={priority}
          />
          {/* Overlay with olive pattern */}
          <div className="absolute inset-0 bg-gradient-to-t from-forest-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-forest-600/90 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
              {locale === "ar" ? news.category.ar : news.category.en}
            </span>
          </div>

          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-4 right-4">
              <span className="bg-olive-600/90 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                {locale === "ar" ? "مميز" : "Featured"}
              </span>
            </div>
          )}
        </div>
      </div>

      <CardHeader className="pb-3">
        {/* Date */}
        <div className="flex items-center gap-2 text-sage-600 text-sm mb-2">
          <Calendar className="h-4 w-4" />
          <span>
            {getTranslation(locale, "publishedOn")} {formatDate(news.date)}
          </span>
        </div>

        {/* Title */}
        <h3
          className={`font-bold text-forest-800 group-hover:text-sage-600 transition-colors leading-tight ${
            featured ? "text-xl md:text-2xl" : "text-lg"
          }`}
        >
          {locale === "ar" ? news.title.ar : news.title.en}
        </h3>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Excerpt */}
        <p className="text-forest-600 leading-relaxed mb-4 line-clamp-3">
          {locale === "ar"
            ? summarizeHtmlContent(news.excerpt.ar)
            : summarizeHtmlContent(news.excerpt.en)}
        </p>

        {/* Read More Button */}
        <CustomLink
          href={href}
          variant="ghost"
          className="h-auto text-sage-600 hover:text-forest-700 font-medium group/btn"
        >
          <span className={cn(locale === "ar" ? "ml-2" : "mr-2")}>
            {getTranslation(locale, "readMore")}
          </span>
          <ArrowRight
            className={`h-4 w-4 group-hover/btn:translate-x-1 transition-transform ${
              locale === "ar" ? "rotate-180" : ""
            }`}
          />
        </CustomLink>

        {/* Decorative Olive Branch */}
        <div className="mt-4 opacity-20 group-hover:opacity-40 transition-opacity">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-sage-400 to-transparent relative">
            <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-3 h-3 bg-olive-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReusableCard;
