import { ReactNode } from "react";
import AnimatedCard from "./animated-card";
import { Card, CardContent } from "@/components/ui/card";
import { getDictionary } from "@/get-dictionary";
import { Button } from "@/components/ui/button";
import Lang from "./lang";

type StatItem = {
  title: string;
  content: string;
};

type Props = {
  children?: React.ReactNode;
};

const statsData: StatItem[] = [
  { title: "الكليات", content: "19" },
  { title: "الأقسام العلمية", content: "95" },
  { title: "الطلاب الوطنيون", content: "95" },
  { title: "الطلاب الأجانب", content: "61" },
  { title: "طلاب الدراسات العلمية", content: "724" },
  { title: "الكادر الأكاديمي", content: "1030" },
  { title: "الموظفون", content: "1883" },
  { title: "المدرجات", content: "6" },
  { title: "المكتبات", content: "1" },
  { title: "المجلات العلمية", content: "412" },
];

const Statiscs = async ({ lang }: { lang: Locale }) => {
  // const
  const dictionary = await getDictionary(lang);
  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      {/* Background Olive Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjNzg5MTVlIiBmaWxsLW9wYWNpdHk9IjAuMSI+PGVsbGlwc2UgY3g9IjUwIiBjeT0iNTAiIHJ4PSIzMCIgcnk9IjEwIiB0cmFuc2Zvcm09InJvdGF0ZSg0NSA1MCA1MCkiLz48L2c+PC9nPjwvc3ZnPg==')] bg-repeat"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid  grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-forest-800 leading-tight">
              {dictionary.pages["univeristy"]["overview"]["title"]}
            </h2>

            <p className="text-lg text-forest-600 leading-relaxed">
              {dictionary.pages["univeristy"]["overview"]["info"]}
            </p>

            <Button
              size="lg"
              className="bg-sage-600 hover:bg-sage-700 text-white px-8 py-4 shadow-lg"
            >
              <Lang lang={lang} en="Learn More" ar="المزيد من المعلومات" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-2 gap-6">
            {statsData.map((stat, index) => (
              <Card
                key={index}
                className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-sage-50 to-olive-50 border-l-4 border-l-forest-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  <div className="text-3xl md:text-4xl font-bold text-forest-700 mb-2">
                    {stat.content}+
                  </div>
                  <div className="text-sage-600 font-medium">
                    {stat.title}
                    {/* {getTranslation(locale, stat.labelKey)} */}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

type ItemProps = {
  title: string;
  content: string;
  children?: ReactNode;
};

const StatiscItem = ({ title, content, children }: ItemProps) => {
  return (
    <div className="text-center min-h-32 flex justify-center items-center flex-col transition-all hover:scale-105 rounded-md group mx-4 shadow-sm shadow-primary bg-card m-2 px-8 py-4 gap-2 md:gap-3 lg:gap-5">
      {children}
      <div className="transition-all group-hover:text-primary">{title}</div>
      <div className="group-hover:text-primary text-xl transition-all">
        {content}
      </div>
    </div>
  );
};

export default Statiscs;
