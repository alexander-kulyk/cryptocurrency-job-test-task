import { DesignView } from "@/03.views";

interface IDesignPageProps {
  params: Promise<{ locale: string }>;
}

const DesignPage = async ({ params }: IDesignPageProps) => {
  const { locale } = await params;

  return <DesignView homeHref={`/${locale}`} />;
};

export default DesignPage;
