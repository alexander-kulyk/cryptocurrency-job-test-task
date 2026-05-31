'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { CornerDownRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  fadeScale,
  fadeUp,
  motionTransition,
  staggerContainer,
} from '@/07.shared/lib';
import { Button } from '@/07.shared/ui';
import { LandingNav } from '../LandingNav';
import styles from './LandingHero.module.css';

const LandingHero: React.FC = () => {
  const t = useTranslations('landing.hero');
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section
      id='hero'
      className='relative w-full overflow-hidden bg-landing-surface'
    >
      <LandingNav />

      <motion.div
        variants={staggerContainer}
        initial='hidden'
        animate='visible'
        className='relative mx-auto flex w-full max-w-laptop flex-col items-center px-5 pb-16 pt-6 text-center tablet:pb-24 tablet:pt-10'
      >
        <motion.div
          variants={fadeUp}
          transition={motionTransition(reduceMotion, 0.5)}
          className='mb-5 self-center tablet:mb-2 tablet:self-end'
        >
          <span className={styles.heroBadge}>
            {t('badge')}
          </span>
        </motion.div>

        <motion.div
          variants={fadeScale}
          transition={motionTransition(reduceMotion, 0.7)}
          className='relative aspect-[600/180] w-full max-w-[80rem]'
        >
          <span aria-hidden='true' className={styles.smile} />
          <Image
            src='/landing/phase-wordmark.png'
            alt={t('wordmarkAlt')}
            fill
            priority
            sizes='(max-width: 767px) 92vw, 1280px'
            className='object-contain'
          />
        </motion.div>

        <motion.p
          variants={fadeUp}
          transition={motionTransition(reduceMotion, 0.5)}
          className='mt-8 max-w-xl text-base text-landing-muted tablet:text-lg'
        >
          {t('tagline')}
        </motion.p>

        <motion.div
          variants={fadeUp}
          transition={motionTransition(reduceMotion, 0.5)}
          className='mt-7'
        >
          <Button
            variant='primary'
            size='lg'
            block={false}
            className={`bg-landing-highlight text-landing-highlight-foreground transition-transform hover:translate-y-1 hover:bg-landing-highlight/90 focus-visible:ring-landing-highlight/40 ${styles.ctaButton}`}
          >
            <CornerDownRight
              aria-hidden='true'
              className='size-6 shrink-0'
              strokeWidth={2.5}
            />
            <span>{t('cta')}</span>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LandingHero;
