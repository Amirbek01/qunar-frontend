import Head from 'next/head';
import Header from '@/components/Header';
import Features from '@/components/Features';
import AiSection from '@/components/AiSection';
import ProductSection from '@/components/ProductSection';
import Sustainability from '@/components/Sustainability';
import FaqSection from '@/components/FaqSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { FaGlobe } from 'react-icons/fa';




export default function Home() {

  return (
    <>
      <Head>
        <title>QUNAR — Спаситель ваших грядок</title>
      </Head>
      <Header />
      <main>

        <section className="relative w-full h-screen">
          <Image
            src="/hero-bg.png"
            alt="Hero background"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-white bg-opacity-5 text-center px-4">
            <h1 className="text-white text-[32px] md:text-5xl font-bold mb-4">
              Представляем вам <span className="text-green-400" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>QUNAR</span>
            </h1>
            <p className="text-white text-base md:text-lg mb-8">
              Спаситель ваших грядок и вашего сада
            </p>
            <Link href="/ai">
              <button className="border border-white text-white px-6 md:px-8 py-2 md:py-3 rounded-full hover:bg-white hover:text-green-500 transition">
                ПОПРОБОВАТЬ
              </button>
            </Link>
          </div>
        </section>




        {/* 🔥 Новый блок "Особенности" */}
        <Features />


        <ProductSection />

        <Sustainability />


        <FaqSection />
        {/* <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-0">
          <FaqSection />
          <AboutSection />
        </div> */}
        <Footer />

      </main >
    </>
  );
}
