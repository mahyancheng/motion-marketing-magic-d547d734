import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  ReactNode,
} from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

// 你的图片（本地初始数据会用到；若不需要导入演示数据，可删掉这三行）
import Push_Pull from '@/image/Push-Pull-MarketingFrame.png';
import Push_ADS from '@/image/Push-ADS.png';
import Org_Traffic from '@/image/Org-Traffic.png';

/** =======================
 *  Types（保持与你原来一致）
 *  ======================= */
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: Date; // Firestore Timestamp -> JS Date
  imageUrl?: string;
  tags: string[];
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  username: string;
  body: string;
  img: string;
  country: string;
}

interface ContentContextType {
  blogPosts: BlogPost[];
  testimonials: Testimonial[];
  addBlogPost: (post: Omit<BlogPost, 'id' | 'publishedAt'>) => Promise<void>;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
  setFeaturedPost: (id: string) => void;
  getFeaturedPost: () => BlogPost | undefined;
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);
export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within a ContentProvider');
  return ctx;
}

/** =======================
 *  本地初始数据（可选导入）
 *  ======================= */
const initialBlogPosts: Omit<BlogPost, 'id'>[] = [
  {
    title: 'Digital Marketing Kuala Lumpur: Complete Guide to Growing Your Business Online in 2024',
    content: `Digital marketing Kuala Lumpur has become essential for businesses seeking growth in Malaysia's competitive marketplace. As the economic heart of Malaysia, Kuala Lumpur presents unique opportunities and challenges for digital marketers.

With over 8 million people in the Greater Kuala Lumpur area, the digital landscape is thriving. Malaysian internet penetration exceeds 90%, making digital marketing strategies crucial for business success. Whether you're a startup in Bangsar or an established enterprise in KLCC, understanding local digital marketing dynamics can transform your business.

When it comes to key strategies, local SEO optimization stands out as essential. Optimizing for "near me" searches and Google Maps visibility is crucial, with businesses ranking in the local pack seeing 5x more engagement than those who don't.

Social media marketing Malaysia also plays a vital role. Malaysians spend an average of 3 hours daily on social media. Facebook remains dominant, but TikTok and Instagram are rapidly growing among younger demographics.

Google Ads Malaysia delivers immediate visibility through pay-per-click advertising. Strategic keyword bidding for terms related to digital marketing can generate qualified leads within days.

When selecting a top digital marketing agency Malaysia, consider their proven track record with Malaysian businesses, transparent reporting and communication, understanding of local market nuances, and comprehensive service offerings. The right digital marketing partner can help your Kuala Lumpur business achieve sustainable growth through data-driven strategies and continuous optimization.`,
    excerpt: 'Comprehensive guide to digital marketing in Kuala Lumpur. Learn proven strategies for SEO, social media, and paid advertising to grow your business in Malaysia.',
    author: 'Leadzap Marketing Team',
    publishedAt: new Date('2024-12-15'),
    imageUrl: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800',
    tags: ['digital marketing kuala lumpur', 'digital marketing', 'malaysia marketing'],
    featured: true,
  },
  {
    title: 'SEO Services Pricing Malaysia: What to Expect and How to Choose the Right Package',
    content: `Understanding SEO services pricing Malaysia is crucial for businesses planning their digital marketing budget. This comprehensive guide breaks down what you should expect when investing in SEO services in Malaysia.

SEO pricing in Malaysia varies significantly based on scope, competition, and agency expertise. Several factors influence the overall cost of SEO services.

Industry competition plays a major role. Highly competitive industries like finance, real estate, and healthcare typically require larger investments to achieve meaningful rankings. Current website status also matters significantly, as sites with technical issues or penalties need more work upfront before optimization can begin.

Target keywords affect pricing as well. High-volume keywords like "digital marketing kuala lumpur" with 3,600 monthly searches require more resources than niche terms with lower competition. Geographic scope is another consideration, since local SEO Malaysia campaigns differ substantially from national or international targeting in terms of strategy and investment.

Typical SEO packages in Malaysia fall into three tiers. Starter packages range from RM 1,500 to 3,000 per month and include basic on-page optimization, Google My Business setup, monthly reporting, and targeting 5-10 keywords. Professional packages range from RM 3,000 to 8,000 per month, offering comprehensive SEO audits, technical SEO fixes, content creation of 2-4 articles monthly, link building, and targeting 15-30 keywords. Enterprise packages start at RM 8,000 per month and above, providing full-service SEO management with a dedicated account manager, advanced technical optimization, premium content strategy, and competitive link building.

A reputable Malaysia SEO consultant should provide a free SEO analysis Malaysia before engagement, clear deliverables and timelines, transparent reporting, and a focus on ROI rather than just rankings. Be wary of any agency that guarantees specific rankings, as ethical SEO cannot make such promises.

Investing in quality SEO services delivers long-term organic traffic growth that compounds over time, making it one of the most cost-effective digital marketing investments available.`,
    excerpt: 'Complete breakdown of SEO services pricing Malaysia. Understand what different SEO packages include and how to choose the right investment for your business.',
    author: 'SEO Team',
    publishedAt: new Date('2024-12-10'),
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    tags: ['seo services pricing malaysia', 'seo packages malaysia', 'malaysia seo'],
  },
  {
    title: 'Social Media Marketing Malaysia: Complete Strategy Guide for 2024',
    content: `Social media marketing Malaysia has evolved dramatically, with businesses recognizing its power to connect with the nation's highly connected population. This guide explores how to build an effective social media marketing strategy for Malaysian audiences.

Malaysia boasts one of the highest social media penetration rates in Southeast Asia at 91.7%. Understanding platform preferences is essential for success. Facebook leads with 22 million users across all demographics. Instagram follows with 14 million users, primarily in the 18-34 age range. TikTok has grown rapidly to 11 million users with Gen Z as the dominant demographic. LinkedIn serves 5 million users with a B2B focus.

Building an effective social media marketing strategy starts with platform selection. Not every platform suits every business, and a social media marketing agency Malaysia can help identify where your target audience spends their time.

Content strategy is equally important. Malaysian audiences respond well to local cultural references, bilingual content in English and Malay, user-generated content, and behind-the-scenes glimpses of your business operations.

Paid social advertising rounds out a comprehensive approach. Social media marketing packages Malaysia typically include Facebook and Instagram Ads, audience targeting and retargeting, creative development, and performance optimization.

Facebook marketing Malaysia deserves special attention as the dominant platform. Best practices include posting during peak hours from 12pm to 2pm and 8pm to 10pm, using video content for higher engagement, leveraging Facebook Groups for community building, and implementing Messenger automation for customer service.

Measuring success requires tracking key performance indicators including engagement rate with a goal of 3% or higher organic engagement, reach and impressions, click-through rate, conversion rate, and cost per acquisition. Partner with a social media agency marketing specialist to maximize your return on social media investment in Malaysia.`,
    excerpt: 'Master social media marketing Malaysia with this comprehensive guide. Learn platform strategies, content tips, and advertising best practices for Malaysian audiences.',
    author: 'Social Media Team',
    publishedAt: new Date('2024-12-05'),
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
    tags: ['social media marketing malaysia', 'social media agency marketing', 'facebook marketing malaysia'],
  },
  {
    title: 'Free SEO Analysis Malaysia: How to Audit Your Website and Improve Rankings',
    content: `Getting a free SEO analysis Malaysia is the first step toward understanding your website's search performance. This guide shows you what a comprehensive SEO audit includes and how to interpret the results.

A free SEO analysis Malaysia evaluates your website's current search engine optimization status. It identifies technical issues affecting crawlability, on-page optimization opportunities, content gaps and keyword opportunities, backlink profile strengths and weaknesses, and how you compare against competitors.

The analysis covers several key areas. Technical SEO audit examines site speed, which should be under 3 seconds for optimal performance. It checks mobile-friendliness, which is essential for Google's mobile-first indexing approach. Crawlability is assessed through proper robots.txt and sitemap configuration. HTTPS security through SSL certificate implementation is verified. Core Web Vitals metrics including LCP, FID, and CLS are measured.

On-page SEO review covers title tags and meta descriptions, header hierarchy from H1 through H6, internal linking structure, image optimization, and keyword usage and density.

Content analysis evaluates content quality and depth, keyword targeting effectiveness, user intent alignment, and content freshness and update frequency.

Off-page factors include backlink profile quality, domain authority, brand mentions across the web, and social signals.

When seeking a free SEO analysis Malaysia from a Malaysia SEO consultant, you should provide your website URL, share your target keywords, describe your business goals, and identify your main competitors. A reputable Malaysia SEO specialist will deliver actionable insights, not just a generic report. Look for agencies offering personalized recommendations rather than automated tools alone.

After receiving your free SEO analysis, prioritize technical fixes first, address quick wins, develop a content strategy, and plan for ongoing optimization. The insights from a professional SEO audit can increase organic traffic by 50 to 200 percent when properly implemented.`,
    excerpt: 'Learn what a free SEO analysis Malaysia includes and how to use the insights to improve your website rankings. Comprehensive guide to SEO auditing.',
    author: 'Technical SEO Team',
    publishedAt: new Date('2024-11-28'),
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    tags: ['free seo analysis malaysia', 'seo audit', 'malaysia seo consultant'],
  },
  {
    title: 'Google Ads Agency Malaysia: How to Choose and What to Expect',
    content: `Choosing the right Google Ads agency Malaysia can dramatically impact your advertising ROI. This guide helps you understand what to look for and what results to expect from professional Google Ads management.

Google Ads, formerly known as AdWords, is powerful but complex. A Google Ads agency Malaysia offers expertise through certified professionals who manage campaigns daily. They provide time savings so you can focus on your business while experts handle advertising. Better ROI comes through optimization techniques that reduce wasted spend. Access to advanced tools including premium bid management and analytics platforms is another key benefit.

Google Ads services encompass several areas. Search advertising displays text ads on Google search results for industry-specific terms. Display advertising places visual banner ads across Google's network of over 2 million websites. Google Shopping Ads, also called Google product listing ads, showcase products with images and prices for e-commerce businesses. YouTube advertising reaches audiences on the world's second-largest search engine. Remarketing re-engages visitors who didn't convert on their first visit.

Google Ads pricing in Malaysia varies by agency. Management fees typically follow one of three models: a percentage of ad spend ranging from 15 to 25 percent, a flat monthly fee from RM 1,000 to RM 5,000 or more, or a hybrid combination. Your ad budget remains under your control with daily and monthly spend limits. A minimum recommended budget of RM 3,000 per month provides enough data for meaningful optimization.

When evaluating a Google Ads agency, look for Google Partner Status which indicates certified expertise. Ask for case studies demonstrating industry experience in your sector. Transparent reporting with regular performance updates is essential. Clear and responsive communication shows professionalism. Most importantly, the agency should focus on conversions, not just clicks.

The typical results timeline begins with campaign setup and launch in weeks one and two. Month one focuses on data gathering and initial optimizations. Months two and three bring significant performance improvements. From month four onward, you can expect scaled and optimized campaigns. Professional Google Ads Malaysia management typically delivers 3 to 10 times return on ad spend when properly executed.`,
    excerpt: 'Complete guide to choosing a Google Ads agency Malaysia. Understand services, pricing, and what results to expect from professional PPC management.',
    author: 'PPC Team',
    publishedAt: new Date('2024-11-20'),
    imageUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800',
    tags: ['google ads agency malaysia', 'google ads malaysia', 'google ads agency'],
  },
  {
    title: 'Local SEO Malaysia: Dominating Google Maps and Local Search Results',
    content: `Local SEO Malaysia is essential for businesses targeting customers in specific geographic areas. Whether you're focused on SEO Kuala Lumpur or SEO Penang, this guide shows how to dominate local search results.

Local SEO focuses on optimizing your online presence to attract customers from relevant local searches. When someone searches "restaurant near me" or "plumber in KL," local SEO determines which businesses appear.

The Local Pack, also called the Map Pack, shows the top 3 local business listings on Google. Appearing here can increase phone calls by over 50 percent, website clicks by more than 35 percent, and direction requests by 42 percent or more.

Several key factors influence local SEO rankings. Google Business Profile optimization is crucial. Your profile should have complete business information, accurate categories, high-quality photos, customer reviews with responses, and regular updates.

NAP consistency ensures your Name, Address, and Phone number are identical across your website, business directories, social media profiles, and industry listings. Inconsistencies confuse search engines and hurt rankings.

Local citations build trust through listings on Malaysian directories like Malaysia Business Directory, Mudah.my, Lowyat.net, and industry-specific platforms.

Reviews and reputation directly impact local rankings. Ask satisfied customers for reviews, respond to all reviews professionally, and aim for a 4.5-star average or higher.

Localized content targets local keywords through phrases like "Best service in Kuala Lumpur" and location-specific landing pages tailored to different service areas.

Different cities require tailored approaches. SEO Kuala Lumpur faces higher competition and requires more aggressive strategies. SEO Penang benefits from a strong tourism angle for hospitality businesses. Johor Bahru requires cross-border considerations for Singapore traffic.

Measuring local SEO success involves tracking Google Business Profile insights, local keyword rankings, phone call tracking, direction requests, and website traffic from local searches. Partner with a Malaysia SEO specialist who understands local market nuances for the best results.`,
    excerpt: 'Master local SEO Malaysia to dominate Google Maps and local search results. Learn optimization strategies for SEO Kuala Lumpur, SEO Penang, and beyond.',
    author: 'Local SEO Team',
    publishedAt: new Date('2024-11-15'),
    imageUrl: 'https://images.unsplash.com/photo-1526948531399-320e7e40f0ca?w=800',
    tags: ['local seo malaysia', 'seo kuala lumpur', 'seo penang'],
  },
  {
    title: 'Top Digital Marketing Agency Malaysia: How to Find the Right Partner',
    content: `Finding a top digital marketing agency Malaysia that aligns with your business goals can be challenging. This guide helps you navigate the selection process and identify the best partner for your needs.

The best agencies share common characteristics that set them apart. A proven track record is essential, demonstrated through case studies with measurable results, client testimonials and reviews, industry recognition and awards, and long-term client relationships.

Comprehensive services distinguish leading agencies. A top digital marketing agency Malaysia should offer SEO services with transparent pricing options, social media marketing Malaysia expertise, Google Ads agency capabilities, content marketing, web development, and robust analytics and reporting.

A data-driven approach is equally critical for modern digital marketing success. This means advanced analytics implementation, regular reporting with actionable insights, A/B testing methodology, and ROI-focused strategies that tie directly to business objectives.

Before partnering with any agency, ask important questions to evaluate their fit. Inquire about their industry specializations, as experience in your sector accelerates results. Request relevant case studies with specific numbers and outcomes. Understand how they measure success to ensure alignment with your goals. Ask about their communication process since regular updates and accessibility matter. Find out what tools they use, as modern agencies rely on premium marketing technology. Finally, clarify what's included in their pricing so you understand exactly what you're paying for.

Be wary of certain red flags when evaluating agencies. Avoid those who guarantee specific rankings, as no one can honestly make that promise. Be cautious of agencies that won't share their strategy, use manipulative tactics, have no client references, or pressure you into quick decisions.

When making your decision, compare agencies on relevant experience, pricing transparency, cultural fit, communication style, and proposed strategy. The right digital marketing partner becomes an extension of your team, invested in your success. Take time to find the right fit rather than rushing into a decision.`,
    excerpt: 'How to identify and choose a top digital marketing agency Malaysia. Learn what to look for, questions to ask, and red flags to avoid.',
    author: 'Business Development Team',
    publishedAt: new Date('2024-11-10'),
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    tags: ['top digital marketing agency malaysia', 'digital marketing agency', 'malaysia marketing'],
  },
  {
    title: 'Malaysia SEO Consultant vs SEO Agency: Which is Right for Your Business?',
    content: `Choosing between a Malaysia SEO consultant and an SEO agency is a critical decision for businesses investing in search optimization. This guide helps you understand the differences and make the right choice.

A Malaysia SEO consultant is an individual expert who provides personalized SEO services. The advantages include direct communication with the expert, often more affordable pricing for smaller budgets, personalized attention to your specific needs, and flexible arrangements. However, there are limitations to consider. Individual consultants have limited bandwidth for large projects, may lack specialized skills across technical SEO, content, and link building, face availability concerns, and represent a single point of failure if they become unavailable.

A Malaysia SEO specialist working within an agency offers different benefits. You gain access to diverse expertise across technical, content, and link building disciplines. Resources can scale with your needs. Established processes ensure consistent delivery. And continuity is maintained even if team members change. The trade-offs include higher minimum budgets, potentially less personal relationships, communication through account managers rather than direct access, and the possibility of cookie-cutter approaches.

A consultant works best for small businesses with limited budgets, specific focused projects, businesses wanting hands-on involvement, and those needing strategic guidance over execution.

An agency is the better choice for larger websites requiring diverse skills, businesses wanting full-service execution, companies needing scalability, and organizations requiring enterprise-level reporting.

When finding the best SEO expert in Malaysia, whether consultant or agency, look for proven results through case studies showing organic traffic growth, ranking improvements, and business impact. Verify technical knowledge including understanding of site architecture, Core Web Vitals, and technical optimization. Ensure they practice ethical white-hat SEO only and avoid anyone promising shortcuts. Evaluate their clear communication through regular reporting and accessible explanations. Check for industry understanding and familiarity with your sector's competitive landscape.

Many businesses benefit from a hybrid approach that combines strategic consulting for direction, agency execution for implementation, and internal resources for ongoing maintenance. This provides expert guidance while maintaining control over your SEO investment.`,
    excerpt: 'Compare Malaysia SEO consultant vs SEO agency options. Understand pros, cons, and which is right for your business needs and budget.',
    author: 'SEO Strategy Team',
    publishedAt: new Date('2024-11-05'),
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800',
    tags: ['malaysia seo consultant', 'malaysia seo expert', 'best seo expert in malaysia'],
  },
  {
    title: 'Digital Marketing Training Malaysia: Building Your Team\'s Skills',
    content: `Digital marketing training Malaysia has become essential as businesses recognize the need for in-house marketing capabilities. This guide explores training options and how to develop your team's digital skills.

Investing in digital marketing training delivers significant business benefits including reduced dependency on agencies, faster execution of campaigns, better understanding of digital metrics, improved agency oversight, and cost savings over time. For individuals, training enhances employability, increases earning potential, provides future-proof skills, and leads to industry certification.

Several types of digital marketing training are available in Malaysia. Formal education through digital marketing degree and diploma in digital marketing programs is offered at institutions like University of Malaya, Taylor's University, HELP University, and various private institutions. These programs typically run 1 to 4 years with investments ranging from RM 20,000 to over RM 100,000.

Professional certifications provide industry-recognized credentials. Options include Google Ads Certification which is free, Google Analytics Certification also free, HubSpot Inbound Marketing at no cost, Facebook Blueprint with free and paid options, and SEMrush Academy which is free.

Short digital marketing course Malaysia options are available from General Assembly, NEXT Academy, Leadzap Marketing Training, and industry workshops. These range from 1 day to 3 months in duration with investments from RM 500 to RM 10,000.

Corporate training provides customized learning for teams through on-site workshops, virtual training sessions, hands-on campaign practice, and industry-specific focus.

Key skills to develop span multiple levels. Foundation skills include marketing fundamentals, customer journey understanding, data analysis basics, and content creation. Technical skills cover SEO and SEM, social media marketing, email marketing, and analytics and reporting. Advanced skills encompass marketing automation, conversion optimization, attribution modeling, and strategic planning.

For businesses developing internal capabilities, start by assessing current skills to identify gaps. Define clear objectives for what team members should accomplish post-training. Choose the right format whether in-person, online, or hybrid. Incorporate practice application through real campaigns to reinforce learning. Finally, measure progress by tracking skill development and application. Digital marketing training is an investment that pays dividends through improved campaign performance and reduced external costs.`,
    excerpt: 'Explore digital marketing training Malaysia options for individuals and teams. Compare degrees, certifications, and courses to build marketing skills.',
    author: 'Training Team',
    publishedAt: new Date('2024-10-28'),
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800',
    tags: ['digital marketing training malaysia', 'digital marketing course malaysia', 'diploma in digital marketing'],
  },
  {
    title: 'Advantages of Digital Marketing for Malaysian Businesses in 2024',
    content: `Understanding the advantages of digital marketing helps Malaysian businesses make informed investment decisions. This comprehensive guide explores why digital marketing delivers superior ROI compared to traditional methods.

Cost-effectiveness stands out as a primary advantage. Digital marketing offers superior cost efficiency through lower entry barriers than traditional advertising, pay-per-click models that mean paying only for results, better ROI tracking and optimization, and scalable budgets suitable for any business size. As an example, a RM 3,000 monthly investment in Google Ads Malaysia can generate over 100 qualified leads, compared to RM 30,000 or more for a single newspaper advertisement.

Precise targeting allows you to reach exactly who you want through demographic targeting by age, location, and income. Interest and behavior targeting further refines your audience. Retargeting brings back previous visitors, and lookalike audience expansion finds new customers similar to your best existing ones.

Measurable results mean every action is trackable. You get real-time campaign performance data, attribution modeling to understand customer journeys, ROI calculation for every marketing ringgit spent, and opportunities for continuous optimization based on data.

Digital marketing creates a level playing field where small businesses can compete effectively. Quality content beats big budgets, niche targeting finds your specific audience, agility provides advantages over larger competitors, and you can build direct customer relationships.

Global reach combines with local focus. You can target international customers while maintaining local SEO Malaysia presence, run multi-language campaigns, and schedule content for appropriate time zones.

Engagement and interaction enable two-way communication through social media conversations, real-time customer feedback, community building, and brand personality development.

Flexibility and adaptability allow quick pivots when needed. You can adjust campaigns in real-time, use test and learn approaches, make seasonal adjustments, and adapt to market responses.

Comparing digital versus traditional marketing reveals clear advantages. Digital offers lower and scalable costs while traditional requires higher fixed investments. Digital targeting is precise compared to traditional's broad approach. Digital measurement is exact while traditional relies on estimates. Digital delivers immediate speed compared to weeks or months for traditional. Digital allows real-time adjustments while traditional changes are difficult.

For Malaysian businesses new to digital marketing, start small with one channel, often Google Ads or Facebook. Learn and iterate using data to improve. Scale what works by increasing investment in proven channels. Diversify gradually by adding channels as you grow. The advantages of digital marketing compound over time. Early investment in digital channels builds assets like SEO rankings, audience data, and content libraries that continue generating returns long into the future.`,
    excerpt: 'Discover the advantages of digital marketing for Malaysian businesses. Compare digital vs traditional marketing and learn how to leverage online channels.',
    author: 'Marketing Strategy Team',
    publishedAt: new Date('2024-10-20'),
    imageUrl: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800',
    tags: ['advantages of digital marketing', 'digital marketing', 'malaysia marketing'],
  },
];

const initialTestimonials: Omit<Testimonial, 'id'>[] = [
  {
    name: 'Jennifer Martinez',
    username: '@jmartinez_ceo',
    body: "Leadzap's Push-Pull strategy increased our leads by 400% in just 3 months!",
    img: 'https://randomuser.me/api/portraits/women/32.jpg',
    country: '🇺🇸 United States',
  },
  {
    name: 'David Thompson',
    username: '@davidthompson',
    body: 'Their social media ads generated $50k in revenue within 60 days. Amazing ROI!',
    img: 'https://randomuser.me/api/portraits/men/45.jpg',
    country: '🇨🇦 Canada',
  },
  {
    name: 'Maria Rodriguez',
    username: '@mariarod_biz',
    body: 'Finally hit #1 on Google for our main keywords. Organic traffic is through the roof!',
    img: 'https://randomuser.me/api/portraits/women/68.jpg',
    country: '🇪🇸 Spain',
  },
  {
    name: 'James Wilson',
    username: '@jwilson_startup',
    body: 'From zero to 10k followers and consistent sales. Leadzap delivers results!',
    img: 'https://randomuser.me/api/portraits/men/51.jpg',
    country: '🇬🇧 United Kingdom',
  },
  {
    name: 'Lisa Chen',
    username: '@lisachen_coach',
    body: "Best marketing investment I've ever made. My business has completely transformed!",
    img: 'https://randomuser.me/api/portraits/women/53.jpg',
    country: '🇸🇬 Singapore',
  },
];

/** =======================
 *  工具函数
 *  ======================= */
const sanitizeTags = (tags: unknown): string[] => {
  if (Array.isArray(tags)) return tags.map((t) => String(t).trim()).filter(Boolean);
  if (typeof tags === 'string') return tags.split(',').map((t) => t.trim()).filter(Boolean);
  return [];
};

const docToBlogPost = (snap: any): BlogPost => {
  const d = snap.data() || {};
  return {
    id: snap.id,
    title: d.title ?? '',
    content: d.content ?? '',
    excerpt: d.excerpt ?? '',
    author: d.author ?? '',
    imageUrl: d.imageUrl ?? '',
    tags: sanitizeTags(d.tags),
    featured: !!d.featured,
    publishedAt: d.publishedAt?.toDate?.() ?? new Date(0),
  };
};

const docToTestimonial = (snap: any): Testimonial => {
  const d = snap.data() || {};
  return {
    id: snap.id,
    name: d.name ?? '',
    username: d.username ?? '',
    body: d.body ?? '',
    img: d.img ?? '',
    country: d.country ?? '',
  };
};

/** =======================
 *  Provider（Firestore 实时 + 本地 fallback）
 *  ======================= */
export function ContentProvider({ children }: { children: ReactNode }) {
  // Initialize with local data as fallback
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => 
    initialBlogPosts.map((post, index) => ({
      ...post,
      id: `local-${index}`,
      publishedAt: post.publishedAt instanceof Date ? post.publishedAt : new Date(post.publishedAt),
    }))
  );
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() =>
    initialTestimonials.map((t, index) => ({
      ...t,
      id: `local-${index}`,
    }))
  );
  const bootstrappedRef = useRef(false);
  const BOOTSTRAP = String(import.meta.env.VITE_FIREBASE_BOOTSTRAP || '').toLowerCase() === 'true';

  // 订阅 BlogPosts - use Firestore if available, otherwise keep local data
  useEffect(() => {
    try {
      const q = query(collection(db, 'blogPosts'), orderBy('publishedAt', 'desc'));
      const unsub = onSnapshot(q, async (snap) => {
        const list = snap.docs.map(docToBlogPost);
        // Only update if we got data from Firestore
        if (list.length > 0) {
          setBlogPosts(list);
        }
        // If Firestore is empty and BOOTSTRAP is enabled, import local data
        if (BOOTSTRAP && !bootstrappedRef.current && list.length === 0) {
          bootstrappedRef.current = true;
          try {
            for (const item of initialBlogPosts) {
              await addDoc(collection(db, 'blogPosts'), {
                title: item.title,
                content: item.content,
                excerpt: item.excerpt,
                author: item.author,
                imageUrl: item.imageUrl || '',
                tags: sanitizeTags(item.tags),
                featured: !!item.featured,
                publishedAt: item.publishedAt,
              });
            }
          } catch (e) {
            console.error('Bootstrap blogPosts failed:', e);
          }
        }
      }, (error) => {
        console.warn('Firestore blogPosts subscription error, using local data:', error);
        // Keep using local data on error
      });
      return () => unsub();
    } catch (error) {
      console.warn('Failed to connect to Firestore, using local data:', error);
      // Keep using local data
    }
  }, [BOOTSTRAP]);

  // 订阅 Testimonials - use Firestore if available, otherwise keep local data
  useEffect(() => {
    try {
      const q = query(collection(db, 'testimonials'));
      const unsub = onSnapshot(q, async (snap) => {
        const list = snap.docs.map(docToTestimonial);
        // Only update if we got data from Firestore
        if (list.length > 0) {
          setTestimonials(list);
        }

        if (BOOTSTRAP && !bootstrappedRef.current && list.length === 0) {
          bootstrappedRef.current = true;
          try {
            for (const t of initialTestimonials) {
              await addDoc(collection(db, 'testimonials'), {
                name: t.name,
                username: t.username,
                body: t.body,
                img: t.img,
                country: t.country,
              });
            }
          } catch (e) {
            console.error('Bootstrap testimonials failed:', e);
          }
        }
      }, (error) => {
        console.warn('Firestore testimonials subscription error, using local data:', error);
      });
      return () => unsub();
    } catch (error) {
      console.warn('Failed to connect to Firestore for testimonials, using local data:', error);
    }
  }, [BOOTSTRAP]);

  /** ===========
   * CRUD: Blog
   * 保持你原函数签名：返回 void；内部 fire-and-forget 调用 Firestore
   * ============ */
  const addBlogPost: ContentContextType['addBlogPost'] = (input) => {
    return addDoc(collection(db, 'blogPosts'), {
      title: input.title,
      content: input.content,
      excerpt: input.excerpt || String(input.content).slice(0, 150) + '...',
      author: input.author,
      imageUrl: input.imageUrl || '',
      tags: sanitizeTags(input.tags),
      featured: !!input.featured,
      publishedAt: serverTimestamp(),
    }).then(() => { });
  };

  const updateBlogPost: ContentContextType['updateBlogPost'] = (id, updates) => {
    const ref = doc(db, 'blogPosts', id);
    const payload: Record<string, any> = {};
    if (updates.title !== undefined) payload.title = updates.title;
    if (updates.content !== undefined) payload.content = updates.content;
    if (updates.excerpt !== undefined) payload.excerpt = updates.excerpt;
    if (updates.author !== undefined) payload.author = updates.author;
    if (updates.imageUrl !== undefined) payload.imageUrl = updates.imageUrl;
    if (updates.tags !== undefined) payload.tags = sanitizeTags(updates.tags);
    if (updates.featured !== undefined) payload.featured = !!updates.featured;
    return updateDoc(ref, payload).then(() => { });
  };

  const deleteBlogPost: ContentContextType['deleteBlogPost'] = (id) => {
    return deleteDoc(doc(db, 'blogPosts', id)).then(() => { });
  };

  // 保证全局仅一篇 featured：用 batch 把其它全部置 false

  const setFeaturedPost: ContentContextType['setFeaturedPost'] = async (id) => {
    const batch = writeBatch(db);
    const snap = await getDocs(collection(db, 'blogPosts'));
    snap.forEach((d) => batch.update(d.ref, { featured: d.id === id }));
    await batch.commit();
  };
  
  const getFeaturedPost = useMemo(
    () => () => blogPosts.find((p) => p.featured) as BlogPost | undefined,
    [blogPosts]
  );

  /** ==================
   * CRUD: Testimonials
   * =================== */

  const addTestimonial: ContentContextType['addTestimonial'] = (t) => {
    return addDoc(collection(db, 'testimonials'), {
      name: t.name,
      username: t.username,
      body: t.body,
      img: t.img,
      country: t.country,
    }).then(() => { });
  };

  const updateTestimonial: ContentContextType['updateTestimonial'] = (id, t) => {
    const ref = doc(db, 'testimonials', id);
    const payload: Record<string, any> = {};
    if (t.name !== undefined) payload.name = t.name;
    if (t.username !== undefined) payload.username = t.username;
    if (t.body !== undefined) payload.body = t.body;
    if (t.img !== undefined) payload.img = t.img;
    if (t.country !== undefined) payload.country = t.country;
    return updateDoc(ref, payload).then(() => { });
  };

  const deleteTestimonial: ContentContextType['deleteTestimonial'] = (id) => {
    return deleteDoc(doc(db, 'testimonials', id)).then(() => { });
  };

  const value: ContentContextType = {
    blogPosts,
    testimonials,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    setFeaturedPost,
    getFeaturedPost,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}
