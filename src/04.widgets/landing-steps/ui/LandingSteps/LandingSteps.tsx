'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  fadeScale,
  fadeUp,
  motionTransition,
  staggerContainer,
  VIEWPORT_ONCE,
} from '@/07.shared/lib';

const LandingSteps: React.FC = () => {
  const t = useTranslations('landing.steps');
  const reduceMotion = useReducedMotion() ?? false;
  const textTransition = motionTransition(reduceMotion, 0.6);
  const mediaTransition = motionTransition(reduceMotion, 0.7);

  const headlineLineOne = t('headlineLines.one');
  const headlineLineTwo = t('headlineLines.two');
  const headlineLineThree = t('headlineLines.three');
  const headlineBadge = t('badge');
  const cardBrand = t('cards.account.brand');
  const cardEyebrow = t('cards.account.eyebrow');
  const cardTitle = t('cards.account.title');
  const cardBody = t('cards.account.body');
  const sideTitle = t('cards.share.eyebrow');
  const sideBody = t('cards.share.body');

  return (
    <section
      id='steps'
      className='w-full overflow-hidden bg-landing-ink px-5 py-20 tablet:px-10 tablet:py-24 laptop:py-28 desktop:pt-20 desktop:pb-80'
    >
      <motion.div
        variants={staggerContainer}
        initial='hidden'
        whileInView='visible'
        viewport={VIEWPORT_ONCE}
        className='mx-auto grid w-full max-w-desktop gap-12 laptop:grid-cols-[minmax(0,0.95fr)_minmax(31rem,38rem)_minmax(13rem,0.38fr)] laptop:items-center laptop:gap-10 desktop:max-w-[116rem] desktop:grid-cols-[52rem_39rem_16rem] desktop:gap-14'
      >
        <motion.div
          variants={fadeUp}
          transition={textTransition}
          className='relative max-w-[55rem] desktop:-top-12'
        >
          <h2
            aria-label={t('headline')}
            className='text-[4.25rem] font-black uppercase leading-[0.9] text-landing-on-ink tablet:text-[7rem] laptop:text-[8rem] desktop:text-[10.25rem]'
          >
            <span className='block'>{headlineLineOne}</span>
            <span className='block whitespace-nowrap'>{headlineLineTwo}</span>
            <span className='block'>{headlineLineThree}</span>
          </h2>

          <span className='absolute left-[43%] top-[53%] inline-flex rotate-[4deg] rounded-[0.45rem] bg-landing-accent px-3 py-1 text-2xl font-semibold leading-none text-landing-on-ink tablet:left-[38%] tablet:top-[55%] tablet:text-3xl laptop:left-[37%] laptop:top-[54%]'>
            {headlineBadge}
          </span>
        </motion.div>

        <motion.article
          variants={fadeScale}
          transition={mediaTransition}
          className='relative mx-auto min-h-[38rem] w-full max-w-[31rem] border-[6px] border-landing-surface bg-landing-highlight p-6 text-landing-highlight-foreground tablet:min-h-[48rem] tablet:max-w-[36rem] tablet:p-8 laptop:min-h-[49rem] desktop:min-h-[56rem] desktop:max-w-[39rem]'
        >
          <div className='absolute inset-0 overflow-hidden' aria-hidden='true'>
            <div className='absolute left-[14%] top-0 h-full w-[18%] bg-landing-surface/10' />
            <div className='absolute left-[35%] top-0 h-[66%] w-[20%] bg-landing-surface/12' />
            <div className='absolute left-[55%] top-0 h-[66%] w-[17%] bg-landing-surface/8' />
            <div className='absolute right-0 top-0 h-[43%] w-[33%] bg-landing-surface/12' />
            <div className='absolute bottom-0 left-[15%] h-[35%] w-[27%] bg-landing-surface/12' />
            <div className='absolute bottom-0 left-[42%] h-[35%] w-[26%] bg-landing-surface/8' />
          </div>

          <div className='relative z-10 flex gap-4'>
            <span className='h-1.5 flex-1 rounded-full bg-landing-ink/70' />
            <span className='h-1.5 flex-1 rounded-full bg-landing-surface' />
            <span className='h-1.5 flex-1 rounded-full bg-landing-surface' />
          </div>

          <div className='relative z-10 mt-7 flex items-center gap-4'>
            <span className='flex size-12 items-center justify-center rounded-full bg-landing-ink text-[0.6rem] font-black italic text-landing-highlight tablet:size-14 tablet:text-xs'>
              {cardBrand}
            </span>
            <span className='text-3xl font-medium'>{cardBrand}</span>
          </div>

          <Image
            src='/landing/start.svg'
            alt=''
            width={171}
            height={108}
            unoptimized
            className='pointer-events-none absolute -left-8 top-[13rem] z-20 h-auto w-36 rotate-[-2deg] tablet:-left-16 tablet:top-[13.25rem] tablet:w-56 laptop:-left-20 desktop:-left-24 desktop:top-[13rem] desktop:w-60'
            aria-hidden='true'
          />

          <Image
            src='/landing/start.svg'
            alt=''
            width={171}
            height={108}
            unoptimized
            className='pointer-events-none absolute -right-10 top-[22rem] z-20 hidden h-auto w-44 rotate-[8deg] tablet:block tablet:-right-20 tablet:top-[25rem] tablet:w-56 desktop:-right-24 desktop:top-[27rem] desktop:w-60'
            aria-hidden='true'
          />

          <div className='relative z-10 mt-48 max-w-[29rem] tablet:mt-64'>
            <p className='text-2xl font-medium'>{cardEyebrow}</p>
            <h3 className='mt-7 max-w-[31rem] text-5xl font-medium leading-[1.05] tablet:text-6xl desktop:text-7xl'>
              {cardTitle}
            </h3>
            <p className='mt-12 text-3xl font-normal leading-[1.15] tablet:text-4xl'>
              {cardBody}
            </p>
          </div>
        </motion.article>

        <motion.aside
          variants={fadeUp}
          transition={textTransition}
          className='max-w-[19rem] text-landing-on-ink laptop:self-start laptop:pt-36 desktop:pt-32'
        >
          <h3 className='text-3xl font-semibold leading-tight'>{sideTitle}</h3>
          <p className='mt-6 text-2xl font-normal leading-[1.18] text-landing-on-ink/90'>
            {sideBody}
          </p>
        </motion.aside>
      </motion.div>
    </section>
  );
};

export default LandingSteps;
