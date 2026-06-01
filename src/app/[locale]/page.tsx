import { HomeView } from "@/03.views";

interface IHomePageProps {
  params: Promise<{ locale: string }>;
}

const Home = async ({ params }: IHomePageProps) => {
  const { locale } = await params;

  return <HomeView locale={locale} />;
};

export default Home;
