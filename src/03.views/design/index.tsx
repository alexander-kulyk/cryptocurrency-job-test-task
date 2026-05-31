import {
  LandingBenefits,
  LandingHero,
  LandingManifesto,
  LandingSteps,
} from '@/04.widgets';

const DesignView: React.FC = () => {
  return (
    <main className='w-full overflow-x-hidden bg-landing-surface'>
      <LandingHero />
      <LandingManifesto />
      <LandingSteps />
      <LandingBenefits />
    </main>
  );
};

export default DesignView;
