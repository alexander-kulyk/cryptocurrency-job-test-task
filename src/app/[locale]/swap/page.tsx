import { SwapView } from "@/03.views";

interface ISwapPageProps {
  params: Promise<{ locale: string }>;
}

const SwapPage = async ({ params }: ISwapPageProps) => {
  const { locale } = await params;

  return <SwapView homeHref={`/${locale}`} />;
};

export default SwapPage;
