import {
  LandingBenefits,
  LandingHero,
  LandingManifesto,
  LandingSteps,
} from '@/04.widgets';
import { BackHomeLink } from '@/07.shared/ui';

interface IDesignViewProps {
  homeHref?: string;
}

const DesignView: React.FC<IDesignViewProps> = ({ homeHref = '/en' }) => {
  return (
    <main className='relative w-full max-w-full overflow-x-clip bg-landing-surface'>
      <BackHomeLink
        href={homeHref}
        tone='light'
        className='fixed left-5 top-20 z-40'
      />
      <LandingHero />
      <LandingManifesto />
      <LandingSteps />
      <LandingBenefits />
    </main>
  );
};

export default DesignView;
