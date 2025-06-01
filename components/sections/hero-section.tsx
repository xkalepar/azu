import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, TreePine } from "lucide-react";
import { getTranslation, type Locale } from "@/lib/i18n";
import Link from "next/link";

interface HeroProps {
  locale: Locale;
}

const Hero: React.FC<HeroProps> = ({ locale }) => {
  return (
    <section
      id="home"
      className="relative min-h-screen max-md:py-10 flex items-center justify-center bg-gradient-to-br from-forest-800 via-olive-700 to-sage-600 overflow-hidden"
    >
      {/* Olive Tree Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 animate-sway">
          <TreePine className="h-32 w-32 text-sage-300" />
        </div>
        <div
          className="absolute top-20 right-20 animate-sway"
          style={{ animationDelay: "1s" }}
        >
          <TreePine className="h-24 w-24 text-olive-300" />
        </div>
        <div
          className="absolute bottom-20 left-1/4 animate-sway"
          style={{ animationDelay: "2s" }}
        >
          <TreePine className="h-28 w-28 text-forest-300" />
        </div>
        <div
          className="absolute bottom-32 right-1/3 animate-sway"
          style={{ animationDelay: "0.5s" }}
        >
          <TreePine className="h-20 w-20 text-sage-400" />
        </div>
      </div>

      {/* Decorative Olive Leaves Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNNDAgNDBjOC44IDAgMTYtNy4yIDE2LTE2czEuMi0xNi0xNi0xNi0xNiA3LjItMTYgMTYgNy4yIDE2IDE2IDE2eiIvPjwvZz48L2c+PC9zdmc+')] bg-repeat"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        {/* University Logo with Olive Tree */}
        <div className="mb-8 animate-float">
          <div className="w-40 h-40 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-4 border-sage-300/30">
            <div className="flex flex-col justify-center items-center">
              <div className="text-3xl font-bold text-white">{"AZU"}</div>
              <TreePine className="h-16 w-16 text-sage-200" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
            {getTranslation(locale, "universityName")}
          </h1>

          <h2 className="text-xl md:text-3xl font-light mb-8 text-sage-100 max-w-4xl mx-auto leading-relaxed">
            {getTranslation(locale, "heroTitle")}
          </h2>

          <p className="text-xl md:text-2xl text-sage-200 max-w-3xl mx-auto mb-12 leading-relaxed">
            {getTranslation(locale, "heroSubtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-sage-500 max-md:w-full hover:bg-sage-600 text-white font-semibold px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {getTranslation(locale, "explorePrograms")}
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-sage-200 text-sage-400 max-md:w-full hover:bg-sage-200 hover:text-forest-800 font-semibold px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105"
            >
              {getTranslation(locale, "applyNow")}
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
      </div>
      <div className="absolute max-md:hidden bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Link href={"#about"}>
          <ArrowDown className="h-6 w-6 text-sage-200/70" />
        </Link>
      </div>
    </section>
  );
};

export default Hero;
