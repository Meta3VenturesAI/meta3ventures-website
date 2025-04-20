import Head from 'next/head';
import Script from 'next/script';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';

// Horizontal logo carousel with navigation
function LogoCarousel() {
  const containerRef = useRef(null);
  const scrollBy = 200;

  const scroll = (direction) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollBy : scrollBy,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative">
      <button
        aria-label="Scroll left"
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
      >
        &larr;
      </button>
      <div ref={containerRef} className="flex overflow-x-auto space-x-8 py-4 px-6">
        {['/logos/company1.png', '/logos/company2.png', '/logos/company3.png', '/logos/company4.png'].map((src, idx) => (
          <Image key={idx} src={src} alt={`Company ${idx + 1}`} width={120} height={60} />
        ))}
      </div>
      <button
        aria-label="Scroll right"
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
      >
        &rarr;
      </button>
    </div>
  );
}

export default function Home() {
  const [leadForm, setLeadForm] = useState({ name: '', email: '', role: 'Founder' });
  const [leadStatus, setLeadStatus] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');

  const handleLeadChange = useCallback((e) => {
    const { name, value } = e.target;
    setLeadForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleLeadSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLeadStatus('Sending...');
      try {
        const res = await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadForm),
        });
        const data = await res.json();
        setLeadStatus(data.message || 'Lead received');
      } catch (error) {
        setLeadStatus('Error sending lead');
      }
    },
    [leadForm]
  );

  const handleNewsletterChange = useCallback((e) => {
    setNewsletterEmail(e.target.value);
  }, []);

  const handleNewsletterSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setNewsletterStatus('Subscribing...');
      try {
        const res = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: newsletterEmail }),
        });
        const data = await res.json();
        setNewsletterStatus(data.message || 'Subscribed');
      } catch (error) {
        setNewsletterStatus('Error subscribing');
      }
    },
    [newsletterEmail]
  );

  const currentYear = new Date().getFullYear();

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Meta3Ventures – AI Venture Studio & Fund</title>
        <meta
          name="description"
          content="Meta3Ventures is the AI venture studio + fund building startups at the intersection of agentic AI, Web3, robotics, and automation."
        />
        {/* JSON-LD Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Meta3Ventures",
              "url": "https://meta3ventures.com",
              "logo": "https://meta3ventures.com/logo.png",
              "sameAs": [
                "https://twitter.com/meta3ventures",
                "https://linkedin.com/company/meta3ventures"
              ]
            }),
          }}
        />
      </Head>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config','${process.env.NEXT_PUBLIC_GA_ID}',{ page_path: window.location.pathname });`}
      </Script>
      <main className="flex flex-col items-center">
        {/* Hero Section */}
        <section id="hero" className="w-full bg-gray-100 py-20 text-center">
          <h1 className="text-5xl font-extrabold mb-4 leading-tight">
            Powering the Next Generation of Intelligent Ventures
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-700">
            Meta3Ventures is the only AI venture studio + fund that builds and backs startups at the intersection of agentic AI, Web3, robotics, and automation.
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="primary" onClick={() => window.location.href = '#get-involved'}>
              Apply for Funding
            </Button>
            <Button variant="secondary" onClick={() => window.location.href = '#agents'}>
              Meet Our AI Agents
            </Button>
          </div>
        </>
      ); // truncated for brevity in this demonstration; include full JSX content in actual file
