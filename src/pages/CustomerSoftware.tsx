import { OrderProvider } from '@/contexts/OrderContext';
import { Navbar } from './Index';
import Footer from './Footer';
import { useEffect, useState, lazy, Suspense, useRef } from 'react';
import CustomSoftwareHero from '@/components/custom-software/Hero';
import ServicesSection from '@/components/custom-software/Services';
import BenefitsSection from '@/components/custom-software/Benefits';
import ProcessSection from '@/components/custom-software/Process';
import FAQSection from '@/components/custom-software/FAQ';
import CTASection from '@/components/custom-software/CTA';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

// ---- Lazy & Preload ----
const DemoShowcase = lazy(() => import('@/components/custom-software/DemoShowcase'));
// 预加载函数（鼠标移入/聚焦触发）
const preloadDemoShowcase = () => {
  import('@/components/custom-software/DemoShowcase');
};

const CustomerSoftware = () => {
  const [open, setOpen] = useState(false);
  const hasPrefetched = useRef(false);

  // Basic SEO setup for this page
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Custom Software Development Solutions Malaysia';

    const ensureMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
      return el;
    };

    ensureMeta(
      'description',
      'Software development company in Malaysia offering custom software development services, custom business systems, and automation tools for cost optimization.'
    );

    // Canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', `${window.location.origin}/customer-software-demo`);

    // FAQ JSON-LD
    const faqJson = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What are custom software development solutions?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              'Custom software development solutions are tailored applications built to your exact business needs—ensuring better fit, efficiency, and ROI.'
          }
        },
        {
          '@type': 'Question',
          name: 'Are you a software development company in Malaysia?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              'Yes, we are a software company in Malaysia providing full-cycle custom software development services for local and international clients.'
          }
        },
        {
          '@type': 'Question',
          name: 'How do custom business systems improve efficiency?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              'By aligning to your workflows, custom business systems reduce manual work through business automation software and software automation tools.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can you integrate with existing platforms?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              'As a software provider we integrate CRMs, ERPs, and other platforms to create efficient software ecosystems.'
          }
        },
        {
          '@type': 'Question',
          name: 'How do you approach cost optimization?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              'We design for maintainability, automate where it matters, and prioritize high-impact features to optimize total cost of ownership.'
          }
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(faqJson);
    document.head.appendChild(script);

    return () => {
      document.title = prevTitle;
      script.remove();
      // leave meta and canonical in place
    };
  }, []);

  // 进入视口时也尝试预加载（可选）
  useEffect(() => {
    const el = document.getElementById('demo');
    if (!el || hasPrefetched.current) return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        preloadDemoShowcase();
        hasPrefetched.current = true;
        io.disconnect();
      }
    }, { rootMargin: '200px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <OrderProvider>
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <Navbar />
        <main>
          <CustomSoftwareHero subtitle="Custom software, automation tools, and systems engineered for efficiency and cost optimization." />
          <ServicesSection />
          <BenefitsSection />
          <ProcessSection />
          <CTASection />

          <section id="demo" className="py-12">
            <div className="container mx-auto px-4 md:px-6">
              <Collapsible open={open} onOpenChange={setOpen}>
                <div className="flex justify-center">
                  <CollapsibleTrigger
                    className="bg-yellow-400 text-black px-6 py-3 rounded-md font-medium hover:bg-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400/70"
                    onMouseEnter={() => !hasPrefetched.current && (preloadDemoShowcase(), (hasPrefetched.current = true))}
                    onFocus={() => !hasPrefetched.current && (preloadDemoShowcase(), (hasPrefetched.current = true))}
                  >
                    {open ? 'Hide Demo' : 'Try Our Demo'}
                  </CollapsibleTrigger>
                </div>

                {/* Smooth transition using data-state from Radix */}
                <CollapsibleContent
                  className={`
                    mt-8 overflow-hidden transition-all duration-500 ease-in-out
                    data-[state=closed]:max-h-0
                    data-[state=open]:max-h-auto
                    data-[state=closed]:opacity-0
                    data-[state=open]:opacity-100
                    data-[state=open]:translate-y-0
                    data-[state=closed]:-translate-y-1
                  `}
                >
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <Suspense
                      fallback={
                        <div className="flex h-40 items-center justify-center">
                          <div className="animate-pulse text-sm text-white/70">Loading demo…</div>
                        </div>
                      }
                    >
                      <DemoShowcase />
                    </Suspense>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </section>

          <FAQSection />
          <Footer />
        </main>
      </div>
    </OrderProvider>
  );
};

export default CustomerSoftware;
