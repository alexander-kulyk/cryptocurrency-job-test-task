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

const LandingManifesto: React.FC = () => {
  const t = useTranslations('landing.manifesto');
  const reduceMotion = useReducedMotion() ?? false;
  const textTransition = motionTransition(reduceMotion, 0.6);
  const mediaTransition = motionTransition(reduceMotion, 0.7);
  const headlineLineOne = t('headlineLines.one');
  const headlineLineTwo = t('headlineLines.two');
  const headlineLineThree = t('headlineLines.three');
  const headlineLineFour = t('headlineLines.four');
  const imageAlt = t('imageAlt');
  const actionAlt = t('actionAlt');

  return (
    <section
      id='manifesto'
      className='relative w-full overflow-hidden bg-muted pt-16 tablet:pt-20 laptop:pt-24'
    >
      <motion.div
        variants={staggerContainer}
        initial='hidden'
        whileInView='visible'
        viewport={VIEWPORT_ONCE}
        className='relative mx-auto flex min-h-[36rem] w-full max-w-desktop flex-col items-center px-5 pb-16 tablet:min-h-[40rem] tablet:px-10 tablet:pb-20 laptop:min-h-[39rem] laptop:pb-16 desktop:min-h-[43rem]'
      >
        <motion.p
          variants={fadeUp}
          transition={textTransition}
          className='text-center text-base font-medium text-landing-foreground tablet:text-xl'
        >
          {t('eyebrow')}
        </motion.p>

        <div className='relative mt-6 w-full max-w-[78rem] tablet:mt-7 laptop:mt-8 desktop:max-w-[86rem]'>
          <motion.div
            variants={fadeScale}
            transition={mediaTransition}
            className='pointer-events-none absolute -top-9 left-[13%] z-20 w-36 rotate-[-2deg] tablet:-top-7 tablet:left-[20%] tablet:w-44 laptop:left-[23%] laptop:w-52 desktop:left-[22%]'
            aria-hidden='true'
          >
            <Image
              src='/landing/our-mission.svg'
              alt=''
              width={164}
              height={44}
              unoptimized
              className='h-auto w-full'
            />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            transition={textTransition}
            aria-label={t('headline')}
            className='mx-auto max-w-[72rem] whitespace-nowrap text-center text-[2.55rem] font-black uppercase leading-[0.78] text-landing-foreground tablet:text-[6.5rem] laptop:text-[8.75rem] desktop:text-[9.75rem]'
          >
            <span className='block'>{headlineLineOne}</span>
            <span className='block'>{headlineLineTwo}</span>
            <span className='block'>{headlineLineThree}</span>
            <span className='block'>{headlineLineFour}</span>
          </motion.h2>

          <motion.div
            variants={fadeScale}
            transition={mediaTransition}
            className='absolute right-[2%] top-[25%] z-10 hidden aspect-[2.05/1] w-[13.5rem] overflow-hidden border border-landing-surface tablet:block laptop:right-[2%] laptop:top-[23%] laptop:w-56 desktop:right-[3%] desktop:w-60'
          >
            <Image
              src='/landing/editorial-1.png'
              alt={imageAlt}
              fill
              sizes='(max-width: 1279px) 240px, 320px'
              className='object-cover'
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={textTransition}
            className='absolute right-2 top-[42%] z-20 hidden max-w-[10rem] rotate-[-7deg] text-right text-xl font-semibold italic leading-[0.86] text-landing-highlight tablet:block laptop:right-[-1rem] laptop:top-[38%] laptop:text-3xl'
          >
            {t('audienceNote')}
          </motion.div>

          <motion.div
            variants={fadeScale}
            transition={mediaTransition}
            className='pointer-events-none absolute bottom-[7%] right-[12%] z-20 hidden w-9 tablet:bottom-[9%] tablet:right-[16%] tablet:block tablet:w-11 laptop:right-[14%] desktop:right-[17%]'
            aria-hidden='true'
          >
            <Image
              src='/landing/manifesto-heart.svg'
              alt=''
              width={34}
              height={46}
              unoptimized
              className='h-auto w-full'
            />
          </motion.div>

          <motion.div
            variants={fadeScale}
            transition={mediaTransition}
            className='absolute bottom-[-14rem] left-5 z-30 w-44 bg-landing-surface p-0 shadow-2xl tablet:bottom-[-10rem] tablet:left-14 tablet:w-56 laptop:left-[-5.5rem] laptop:bottom-[-12.5rem]'
          >
            <div className='relative aspect-[1.5/1] w-full overflow-hidden'>
              <Image
                src='/landing/editorial-1.png'
                alt={imageAlt}
                fill
                sizes='(max-width: 767px) 176px, 224px'
                className='object-cover'
              />
              <div
                className='pointer-events-none absolute right-1 top-1 w-12 tablet:right-2 tablet:top-2 tablet:w-14'
                aria-hidden='true'
              >
                <Image
                  src='/landing/manifesto-smile.svg'
                  alt=''
                  width={70}
                  height={70}
                  unoptimized
                  className='h-auto w-full'
                />
              </div>
            </div>
            <div className='relative h-20 tablet:h-24'>
              <Image
                src='/landing/action-not-words.svg'
                alt={actionAlt}
                width={154}
                height={61}
                unoptimized
                className='absolute left-5 top-3 h-auto w-32 rotate-[-7deg] tablet:left-6 tablet:w-40'
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial='hidden'
        whileInView='visible'
        viewport={VIEWPORT_ONCE}
        className='relative grid min-h-[28rem] w-full overflow-hidden [clip-path:polygon(0_0,50%_6%,100%_0,100%_100%,0_100%)] tablet:grid-cols-2 laptop:min-h-[30rem]'
      >
        <motion.div
          variants={fadeScale}
          transition={mediaTransition}
          className='relative min-h-[28rem] overflow-hidden bg-landing-ink laptop:min-h-[30rem]'
        >
          <Image
            src='/landing/editorial-2.png'
            alt={imageAlt}
            fill
            sizes='(max-width: 767px) 100vw, 50vw'
            className='object-cover'
          />
          <div className='absolute inset-0 bg-landing-ink/20' />
          <div className='absolute bottom-20 left-5 max-w-[28rem] text-landing-on-ink tablet:left-12 laptop:left-20'>
            <p className='text-xl font-semibold leading-tight text-landing-highlight-foreground tablet:text-2xl'>
              <span className='box-decoration-clone rounded-[0.4rem] bg-landing-highlight px-1 leading-tight'>
                {t('tribeLine')}
              </span>
              <br />
              <span className='box-decoration-clone rounded-[0.4rem] bg-landing-highlight px-1 leading-tight'>
                {t('noiseLine')}
              </span>
            </p>
            <p className='mt-6 max-w-[25rem] text-xl font-medium leading-[1.15] tablet:text-2xl'>
              {t('communityBody')}
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={fadeScale}
          transition={mediaTransition}
          className='relative min-h-[28rem] overflow-hidden laptop:min-h-[30rem]'
        >
          <Image
            src='/landing/editorial-3.png'
            alt={imageAlt}
            fill
            sizes='(max-width: 767px) 100vw, 50vw'
            className='object-cover'
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LandingManifesto;
