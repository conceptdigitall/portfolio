"use client";

import React, { useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import Hero from '@/components/Hero';
import Background from '@/components/Background';

// Lazy Load heavy components
const MethodEvolution = dynamic(() => import('@/features/method/MethodEvolution'), {
    loading: () => <div className="min-h-screen bg-concept-blue" />,
    ssr: false // Optional: Disable SSR if not critical for initial SEO or uses window
});

const ProjectsSection = dynamic(() => import('@/components/ProjectsSection'), {
    loading: () => <div className="min-h-screen bg-concept-blue" />,
});

const SystemsWaaS = dynamic(() => import('@/components/SystemsWaaS'), {
    loading: () => <div className="min-h-screen bg-concept-blue" />,
});

const Contact = dynamic(() => import('@/components/Contact'), {
    loading: () => <div className="min-h-[500px] bg-concept-blue" />,
});

const HomeContent = () => {
    const searchParams = useSearchParams();

    useEffect(() => {
        const scrollTo = searchParams?.get('scrollTo');
        if (scrollTo) {
            // Slight delay to ensure content is loaded/rendered
            setTimeout(() => {
                const element = document.getElementById(scrollTo);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }, [searchParams]);

    return (
        <>
            <Background />
            <Hero />
            <ProjectsSection />
            <SystemsWaaS />
            <MethodEvolution />
            <Contact />
        </>
    );
};

export default function Home() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-concept-blue" />}>
            <HomeContent />
        </Suspense>
    );
}
