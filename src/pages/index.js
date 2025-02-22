import Head from 'next/head';
import Header from '@/components/Header';
import Features from '@/components/Features';
import AiSection from '@/components/AiSection';
import ProductSection from '@/components/ProductSection';
import Sustainability from '@/components/Sustainability';
import FaqSection from '@/components/FaqSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>QUNAR — Спаситель ваших грядок</title>
      </Head>
      <Header />
      <main>
        <section
          className="h-screen bg-cover bg-center flex flex-col justify-center items-center"
          style={{ backgroundImage: "url('/hero-bg.png')" }}
        >
          <h1 className="text-white text-5xl font-bold mb-4">
            Представляем вам <span className="text-green-400">QUNAR</span>
          </h1>
          <p className="text-white text-lg mb-8">
            Спаситель ваших грядок и вашего сада
          </p>
          <button className="border border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-green-500 transition">
            ПОПРОБОВАТЬ
          </button>
        </section>

        {/* 🔥 Новый блок "Особенности" */}
        <Features />

        <AiSection />

        <ProductSection />

        <Sustainability />

        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-0">
          <FaqSection />
          <AboutSection />
        </div>
        <Footer />

      </main>
    </>
  );
}
