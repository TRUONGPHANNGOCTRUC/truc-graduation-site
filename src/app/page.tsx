import Head from 'next/head';
import EventInfoSection from "./EventInfoSection/eventInfo";
import IntroSection from './IntroSection/introSection';
import MemorySection from './MemorySection/memorySection';
import RSPVFormSection from './RSVPFormSection/rspvFormSection';
import GoogleMapSection from './GoogleMap/googleMapSection';
import CountDownSection from './CountDownSection/countdownSection';
import MusicPlayerComponent from './MusicPlayerComponent/musicPlayerComponent';
import SakuraFallComponent from './Component/SakuraComponent/SakuraComponent';
import ThankyouSection from './Thankyou/thankyouSectioc';
import GraduationMemorySection from './GraduationMemory/graduationMemory';
export default function Home() {
  return (
    <div className=" w-full bg-white">
      <Head>
        <title>Thiệp Tốt Nghiệp Ngọc Trúc</title>
        <meta name="description" content="Mời bạn đến tham dự lễ tốt nghiệp của Ngọc Trúc đáng yêu 🥹🎓" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" min-h-screen bg-gradient-to-b from-pink-100 to-pink-200 text-gray-800 font-sans ">
        <MusicPlayerComponent/>
        <SakuraFallComponent/>
        <IntroSection />
        <CountDownSection />
        <MemorySection />
        <EventInfoSection />
        <GoogleMapSection />
        <RSPVFormSection />
        <ThankyouSection/>
        <GraduationMemorySection/>
      </main>
    </div>
  )
}
