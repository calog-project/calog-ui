import Image from 'next/image';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import LandingHeader from '@/components/LandingHeader/LandingHeader';
import sectionOne from '../../public/images/section1.svg';
import sectionSecond from '../../public/images/section2.svg';
import sectionThird from '../../public/images/section3.svg';
import AnimationSection from '@/components/AnimationSection/AnimationSection';

const Section = ({ children, className }: { children: ReactNode; className?: string }) => {
  const sectionClass = twMerge('mx-auto flex w-full gap-3 h-screen ' + className);
  return <section className={sectionClass}>{children}</section>;
};

export default function Home() {
  return (
    <>
      <LandingHeader />

      <AnimationSection className="h-screen w-full overflow-hidden scroll-smooth">
        <Section className="flex justify-center items-center">
          <Image src={sectionOne} alt="첫번째섹션 이미지" priority className="z-0" />
          <div>
            <h1 className="text-[48px] font-bold">모든 일정을 한눈에, 함께하는 즐거움!</h1>
            <p className="text-[24px] font-semibold mb-[51px]">캘린더로 일정을 공유하고, 모임을 만들고, 소통하세요.</p>

            {/* 버튼 공통컴포넌트 만든 후 적용 */}
            <button>시작하기</button>
          </div>
        </Section>

        <Section className="flex flex-row-reverse justify-center items-center bg-[#EFEFEF]">
          <Image src={sectionSecond} alt="두번째섹션 이미지" priority />
          <div className="flex flex-col gap-[55px]">
            <h1 className="text-[48px] font-bold">당신의 일상을 공유하고, 친구들과 소통하세요!</h1>
            <div className="flex flex-col gap-[35px] items-end">
              <p className="text-[24px] font-semibold">
                실시간 스레드로 더 가까워지는 소셜 네트워크 경험을 만나보세요.
              </p>
              <p className="text-[24px] font-semibold">친구들과 함께하는 특별한 순간들을 기록하고 공유하세요.</p>
              <p className="text-[24px] font-semibold">다양한 주제의 스레드에서 새로운 사람들과 소통해보세요.</p>
            </div>
          </div>
        </Section>

        <Section className="flex justify-center items-center">
          <Image src={sectionThird} alt="세번째섹션 이미지" priority />
          <div className="flex flex-col gap-[55px]">
            <h1 className="text-[48px] font-bold flex justify-center">검증된 이용 후기!</h1>
            <div className="flex flex-col gap-[35px]">
              <p className="text-[24px] font-semibold">&quot;이 앱 덕분에 친구들과 더 자주 소통하게 되었어요!&quot;</p>
              <p className="text-[24px] font-semibold flex justify-end">
                &quot;캘린더 기능이 정말 유용해요. 일정을 쉽게 관리할 수 있어요.&quot;
              </p>
              <p className="text-[24px] font-semibold pr-[74px]">
                &quot;스레드 기능 덕분에 친구들과의 대화가 더 재미있어졌어요. 정말 추천합니다!&quot;
              </p>
            </div>
          </div>
        </Section>
      </AnimationSection>
    </>
  );
}
