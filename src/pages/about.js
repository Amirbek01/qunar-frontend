import AboutSectionScreens from '@/components/AboutSectionScreens';
import Header from '@/components/Header';
import Head from 'next/head';

export default function About() {
    return (
        <>
            <Head>
                <title>О нас | QUNAR</title>
                <meta name="description" content="Узнайте больше о QUNAR - инновационных решениях для вашего сада." />
            </Head>

            <main className="min-h-screen">
                <Header/>
                <AboutSectionScreens />
            </main>
        </>
    );
}
