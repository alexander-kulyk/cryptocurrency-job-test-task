import {
  LandingBenefits,
  LandingHero,
  LandingManifesto,
  LandingSteps,
} from '@/04.widgets';

const DesignView: React.FC = () => {
  return (
    <main className='w-full max-w-full overflow-x-clip bg-landing-surface'>
      <LandingHero />
      <LandingManifesto />
      <LandingSteps />
      <LandingBenefits />
    </main>
  );
};

export default DesignView;
