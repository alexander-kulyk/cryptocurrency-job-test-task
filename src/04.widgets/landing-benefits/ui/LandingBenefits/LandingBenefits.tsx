'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { mediaUp } from '@/07.shared/config';
import { fadeUp, motionTransition, VIEWPORT_ONCE } from '@/07.shared/lib';
import { useMediaQuery } from '@/07.shared/hooks';
import { BENEFIT_ROWS, useBenefitsHighlight } from '../../model';
import { BenefitRow } from '../BenefitRow';

const LandingBenefits: React.FC = () => {
  const t = useTranslations('landing.benefits');
  const reduceMotion = useReducedMotion() ?? false;

  const isTabletUp = useMediaQuery(mediaUp('tablet'));
  const autoCyclePaused = reduceMotion || !isTabletUp;

  const { values, handlers } = useBenefitsHighlight({
    count: BENEFIT_ROWS.length,
    paused: autoCyclePaused,
  });

  return (
    <section className='w-full bg-landing-ink'>
      <div className='mx-auto w-full max-w-desktop'>
        {BENEFIT_ROWS.map((row, index) => (
          <motion.div
            key={row.key}
            variants={fadeUp}
            initial='hidden'
            whileInView='visible'
            viewport={VIEWPORT_ONCE}
            transition={motionTransition(reduceMotion, 0.5, index * 0.06)}
          >
            <BenefitRow
              description={t(`${row.key}.description`)}
              title={t(`${row.key}.title`)}
              tag={t(`${row.key}.tag`)}
              image={row.image}
              isActive={index === values.activeIndex}
              reduceMotion={reduceMotion}
              onActivate={() => handlers.activate(index)}
              onRelease={handlers.release}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LandingBenefits;
