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

## Why Digital Marketing Kuala Lumpur Matters

With over 8 million people in the Greater Kuala Lumpur area, the digital landscape is thriving. Malaysian internet penetration exceeds 90%, making digital marketing Kuala Lumpur strategies crucial for business success. Whether you're a startup in Bangsar or an established enterprise in KLCC, understanding local digital marketing dynamics can transform your business.

## Key Digital Marketing Strategies for KL Businesses

### 1. Local SEO Optimization
Optimizing for "near me" searches and Google Maps visibility is crucial. Businesses ranking in the local pack see 5x more engagement than those who don't.

### 2. Social Media Marketing Malaysia
Malaysians spend an average of 3 hours daily on social media. Facebook remains dominant, but TikTok and Instagram are rapidly growing among younger demographics.

### 3. Google Ads Malaysia
Pay-per-click advertising delivers immediate visibility. Strategic keyword bidding for terms like "digital marketing Kuala Lumpur" can generate qualified leads within days.

## Choosing a Digital Marketing Agency

When selecting a top digital marketing agency Malaysia, consider:
- Proven track record with Malaysian businesses
- Transparent reporting and communication
- Understanding of local market nuances
- Comprehensive service offerings

The right digital marketing partner can help your Kuala Lumpur business achieve sustainable growth through data-driven strategies and continuous optimization.`,
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

## Understanding SEO Services Pricing Malaysia

SEO pricing in Malaysia varies significantly based on scope, competition, and agency expertise. Here's what influences costs:

### Factors Affecting SEO Pricing

1. **Industry Competition**: Highly competitive industries like finance, real estate, and healthcare typically require larger investments.

2. **Current Website Status**: Sites with technical issues or penalties need more work upfront.

3. **Target Keywords**: High-volume keywords like "digital marketing kuala lumpur" (3,600 monthly searches) require more resources than niche terms.

4. **Geographic Scope**: Local SEO Malaysia campaigns differ from national or international targeting.

## Typical SEO Packages Malaysia

### Starter Packages (RM 1,500 - 3,000/month)
- Basic on-page optimization
- Google My Business setup
- Monthly reporting
- 5-10 target keywords

### Professional Packages (RM 3,000 - 8,000/month)
- Comprehensive SEO audit
- Technical SEO fixes
- Content creation (2-4 articles/month)
- Link building
- 15-30 target keywords

### Enterprise Packages (RM 8,000+/month)
- Full-service SEO management
- Dedicated account manager
- Advanced technical optimization
- Premium content strategy
- Competitive link building

## What to Look for in SEO Services

A reputable Malaysia SEO consultant should provide:
- Free SEO analysis Malaysia before engagement
- Clear deliverables and timelines
- Transparent reporting
- No guaranteed rankings (ethical SEO)
- Focus on ROI, not just rankings

Investing in quality SEO services delivers long-term organic traffic growth that compounds over time, making it one of the most cost-effective digital marketing investments.`,
    excerpt: 'Complete breakdown of SEO services pricing Malaysia. Understand what different SEO packages include and how to choose the right investment for your business.',
    author: 'SEO Team',
    publishedAt: new Date('2024-12-10'),
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    tags: ['seo services pricing malaysia', 'seo packages malaysia', 'malaysia seo'],
  },
  {
    title: 'Social Media Marketing Malaysia: Complete Strategy Guide for 2024',
    content: `Social media marketing Malaysia has evolved dramatically, with businesses recognizing its power to connect with the nation's highly connected population. This guide explores how to build an effective social media marketing strategy for Malaysian audiences.

## The Malaysian Social Media Landscape

Malaysia boasts one of the highest social media penetration rates in Southeast Asia at 91.7%. Understanding platform preferences is essential:

- **Facebook**: 22 million users (all demographics)
- **Instagram**: 14 million users (18-34 primary)
- **TikTok**: 11 million users (Gen Z dominant)
- **LinkedIn**: 5 million users (B2B focus)

## Building Your Social Media Marketing Strategy

### 1. Platform Selection
Not every platform suits every business. A social media marketing agency Malaysia will help identify where your audience spends time.

### 2. Content Strategy
Malaysian audiences respond to:
- Local cultural references
- Bilingual content (English/Malay)
- User-generated content
- Behind-the-scenes glimpses

### 3. Paid Social Advertising
Social media marketing packages Malaysia typically include:
- Facebook & Instagram Ads
- Audience targeting and retargeting
- Creative development
- Performance optimization

## Facebook Marketing Malaysia

As the dominant platform, Facebook marketing Malaysia deserves special attention:

**Best Practices:**
- Post during peak hours (12pm-2pm, 8pm-10pm)
- Use video content for higher engagement
- Leverage Facebook Groups for community building
- Implement Messenger automation for customer service

## Measuring Success

Track these KPIs for social media marketing:
- Engagement rate (aim for 3%+ organic)
- Reach and impressions
- Click-through rate
- Conversion rate
- Cost per acquisition

Partner with a social media agency marketing specialist to maximize your return on social media investment in Malaysia.`,
    excerpt: 'Master social media marketing Malaysia with this comprehensive guide. Learn platform strategies, content tips, and advertising best practices for Malaysian audiences.',
    author: 'Social Media Team',
    publishedAt: new Date('2024-12-05'),
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
    tags: ['social media marketing malaysia', 'social media agency marketing', 'facebook marketing malaysia'],
  },
  {
    title: 'Free SEO Analysis Malaysia: How to Audit Your Website and Improve Rankings',
    content: `Getting a free SEO analysis Malaysia is the first step toward understanding your website's search performance. This guide shows you what a comprehensive SEO audit includes and how to interpret the results.

## What is a Free SEO Analysis?

A free SEO analysis Malaysia evaluates your website's current search engine optimization status. It identifies:

- Technical issues affecting crawlability
- On-page optimization opportunities
- Content gaps and keyword opportunities
- Backlink profile analysis
- Competitor comparison

## Key Areas of SEO Analysis

### 1. Technical SEO Audit
- **Site Speed**: Pages should load in under 3 seconds
- **Mobile-Friendliness**: Essential for Google's mobile-first indexing
- **Crawlability**: Proper robots.txt and sitemap configuration
- **HTTPS Security**: SSL certificate implementation
- **Core Web Vitals**: LCP, FID, and CLS metrics

### 2. On-Page SEO Review
- Title tags and meta descriptions
- Header hierarchy (H1-H6)
- Internal linking structure
- Image optimization
- Keyword usage and density

### 3. Content Analysis
- Content quality and depth
- Keyword targeting
- User intent alignment
- Freshness and updates

### 4. Off-Page Factors
- Backlink profile quality
- Domain authority
- Brand mentions
- Social signals

## How to Request Your Free Analysis

When seeking free SEO analysis Malaysia from a Malaysia SEO consultant:

1. Provide your website URL
2. Share your target keywords
3. Describe your business goals
4. Identify your main competitors

A reputable Malaysia SEO specialist will deliver actionable insights, not just a generic report. Look for agencies offering personalized recommendations rather than automated tools alone.

## Taking Action on Your SEO Audit

After receiving your free SEO analysis:
1. Prioritize technical fixes
2. Address quick wins first
3. Develop a content strategy
4. Plan for ongoing optimization

The insights from a professional SEO audit can increase organic traffic by 50-200% when properly implemented.`,
    excerpt: 'Learn what a free SEO analysis Malaysia includes and how to use the insights to improve your website rankings. Comprehensive guide to SEO auditing.',
    author: 'Technical SEO Team',
    publishedAt: new Date('2024-11-28'),
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    tags: ['free seo analysis malaysia', 'seo audit', 'malaysia seo consultant'],
  },
  {
    title: 'Google Ads Agency Malaysia: How to Choose and What to Expect',
    content: `Choosing the right Google Ads agency Malaysia can dramatically impact your advertising ROI. This guide helps you understand what to look for and what results to expect from professional Google Ads management.

## Why Use a Google Ads Agency Malaysia?

Google Ads (formerly AdWords) is powerful but complex. A Google Ads agency Malaysia offers:

- **Expertise**: Certified professionals who manage campaigns daily
- **Time Savings**: Focus on your business while experts handle advertising
- **Better ROI**: Optimization techniques that reduce wasted spend
- **Advanced Tools**: Access to premium bid management and analytics tools

## What Google Ads Services Include

### Search Advertising
Text ads appearing on Google search results for keywords like "google ads malaysia" or industry-specific terms.

### Display Advertising
Visual banner ads across Google's network of 2 million+ websites.

### Google Shopping Ads
Google product listing ads for e-commerce businesses showing products with images and prices.

### YouTube Advertising
Video ads on the world's second-largest search engine.

### Remarketing
Re-engaging visitors who didn't convert on their first visit.

## Google Ads Pricing in Malaysia

Most Google Ads agency Malaysia services charge:

**Management Fees:**
- Percentage of ad spend (15-25%)
- Flat monthly fee (RM 1,000-5,000+)
- Hybrid model

**Ad Budget:**
- You control your daily/monthly spend
- Minimum recommended: RM 3,000/month for meaningful data

## What to Look for in a Google Ads Agency

1. **Google Partner Status**: Indicates certified expertise
2. **Industry Experience**: Ask for case studies in your sector
3. **Transparent Reporting**: Regular updates on performance
4. **Clear Communication**: Responsive and proactive
5. **Focus on Conversions**: Not just clicks

## Expected Results Timeline

- **Week 1-2**: Campaign setup and launch
- **Month 1**: Data gathering and initial optimizations
- **Month 2-3**: Significant performance improvements
- **Month 4+**: Scaled, optimized campaigns

Professional Google Ads Malaysia management typically delivers 3-10x return on ad spend when properly executed.`,
    excerpt: 'Complete guide to choosing a Google Ads agency Malaysia. Understand services, pricing, and what results to expect from professional PPC management.',
    author: 'PPC Team',
    publishedAt: new Date('2024-11-20'),
    imageUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800',
    tags: ['google ads agency malaysia', 'google ads malaysia', 'google ads agency'],
  },
  {
    title: 'Local SEO Malaysia: Dominating Google Maps and Local Search Results',
    content: `Local SEO Malaysia is essential for businesses targeting customers in specific geographic areas. Whether you're in SEO Kuala Lumpur or SEO Penang, this guide shows how to dominate local search results.

## Understanding Local SEO Malaysia

Local SEO focuses on optimizing your online presence to attract customers from relevant local searches. When someone searches "restaurant near me" or "plumber in KL," local SEO determines which businesses appear.

## The Local Pack: Your Primary Goal

The Local Pack (or Map Pack) shows the top 3 local business listings on Google. Appearing here can increase:
- Phone calls by 50%+
- Website clicks by 35%+
- Direction requests by 42%+

## Key Local SEO Ranking Factors

### 1. Google Business Profile Optimization
Your Google Business Profile (formerly Google My Business) is crucial:
- Complete all business information
- Choose accurate categories
- Add high-quality photos
- Encourage and respond to reviews
- Post regular updates

### 2. NAP Consistency
Ensure your Name, Address, and Phone number are identical across:
- Your website
- Business directories
- Social media profiles
- Industry listings

### 3. Local Citations
Build listings on Malaysian directories:
- Malaysia Business Directory
- Mudah.my
- Lowyat.net
- Industry-specific directories

### 4. Reviews and Reputation
Google reviews directly impact local rankings:
- Ask satisfied customers for reviews
- Respond to all reviews professionally
- Aim for 4.5+ star average

### 5. Localized Content
Create content targeting local keywords:
- "Best [service] in Kuala Lumpur"
- "[Industry] Penang guide"
- Location-specific landing pages

## SEO Kuala Lumpur vs SEO Penang

Different cities require tailored approaches:
- **KL**: Higher competition, requires more aggressive strategies
- **Penang**: Strong tourism angle for hospitality businesses
- **JB**: Cross-border considerations for Singapore traffic

## Measuring Local SEO Success

Track these metrics:
- Google Business Profile insights
- Local keyword rankings
- Phone call tracking
- Direction requests
- Website traffic from local searches

Partner with a Malaysia SEO specialist who understands local market nuances for best results.`,
    excerpt: 'Master local SEO Malaysia to dominate Google Maps and local search results. Learn optimization strategies for SEO Kuala Lumpur, SEO Penang, and beyond.',
    author: 'Local SEO Team',
    publishedAt: new Date('2024-11-15'),
    imageUrl: 'https://images.unsplash.com/photo-1526948531399-320e7e40f0ca?w=800',
    tags: ['local seo malaysia', 'seo kuala lumpur', 'seo penang'],
  },
  {
    title: 'Top Digital Marketing Agency Malaysia: How to Find the Right Partner',
    content: `Finding a top digital marketing agency Malaysia that aligns with your business goals can be challenging. This guide helps you navigate the selection process and identify the best partner for your needs.

## What Makes a Top Digital Marketing Agency?

The best agencies share common characteristics:

### 1. Proven Track Record
Look for:
- Case studies with measurable results
- Client testimonials and reviews
- Industry recognition and awards
- Long-term client relationships

### 2. Comprehensive Services
A true top digital marketing agency Malaysia offers:
- SEO services pricing Malaysia options
- Social media marketing Malaysia expertise
- Google Ads agency Malaysia capabilities
- Content marketing
- Web development
- Analytics and reporting

### 3. Data-Driven Approach
Modern digital marketing requires:
- Advanced analytics implementation
- Regular reporting and insights
- A/B testing methodology
- ROI-focused strategies

## Questions to Ask Potential Agencies

Before partnering with any agency:

1. **What industries do you specialize in?**
Industry experience accelerates results.

2. **Can you share relevant case studies?**
Look for specific numbers and outcomes.

3. **How do you measure success?**
Ensure alignment with your business goals.

4. **What's your communication process?**
Regular updates and accessibility matter.

5. **What tools do you use?**
Modern agencies use premium marketing technology.

6. **What's included in your pricing?**
Understand exactly what you're paying for.

## Red Flags to Avoid

Be wary of agencies that:
- Guarantee specific rankings (no one can)
- Won't share their strategy
- Use manipulative tactics
- Have no client references
- Pressure quick decisions

## Making Your Decision

Compare agencies on:
- Relevant experience
- Pricing transparency
- Cultural fit
- Communication style
- Proposed strategy

The right digital marketing partner becomes an extension of your team, invested in your success. Take time to find the right fit rather than rushing into a decision.`,
    excerpt: 'How to identify and choose a top digital marketing agency Malaysia. Learn what to look for, questions to ask, and red flags to avoid.',
    author: 'Business Development Team',
    publishedAt: new Date('2024-11-10'),
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    tags: ['top digital marketing agency malaysia', 'digital marketing agency', 'malaysia marketing'],
  },
  {
    title: 'Malaysia SEO Consultant vs SEO Agency: Which is Right for Your Business?',
    content: `Choosing between a Malaysia SEO consultant and an SEO agency is a critical decision for businesses investing in search optimization. This guide helps you understand the differences and make the right choice.

## Understanding Your Options

### Malaysia SEO Consultant
An individual expert who provides personalized SEO services:

**Pros:**
- Direct communication with the expert
- Often more affordable for smaller budgets
- Personalized attention
- Flexible arrangements

**Cons:**
- Limited bandwidth for large projects
- May lack specialized skills (technical, content, links)
- Availability concerns
- Single point of failure

### Malaysia SEO Specialist (Agency)
A team of specialists working together:

**Pros:**
- Diverse expertise (technical, content, links)
- Scalable resources
- Established processes
- Continuity if team members change

**Cons:**
- Higher minimum budgets
- May feel less personal
- Communication through account managers
- Potential for cookie-cutter approaches

## When to Choose a Consultant

A Malaysia SEO consultant works best for:
- Small businesses with limited budgets
- Specific, focused projects
- Businesses wanting hands-on involvement
- Those needing strategic guidance over execution

## When to Choose an Agency

An agency is better for:
- Larger websites requiring diverse skills
- Businesses wanting full-service execution
- Companies needing scalability
- Organizations requiring enterprise-level reporting

## Finding a Best SEO Expert in Malaysia

Whether consultant or agency, look for:

1. **Proven Results**
Ask for case studies showing organic traffic growth, ranking improvements, and business impact.

2. **Technical Knowledge**
Understanding of site architecture, Core Web Vitals, and technical optimization.

3. **Ethical Practices**
White-hat SEO only—avoid anyone promising shortcuts.

4. **Clear Communication**
Regular reporting and accessible explanations.

5. **Industry Understanding**
Familiarity with your sector's competitive landscape.

## The Hybrid Approach

Many businesses benefit from combining:
- Strategic consulting for direction
- Agency execution for implementation
- Internal resources for ongoing maintenance

This provides expert guidance while maintaining control over your SEO investment.`,
    excerpt: 'Compare Malaysia SEO consultant vs SEO agency options. Understand pros, cons, and which is right for your business needs and budget.',
    author: 'SEO Strategy Team',
    publishedAt: new Date('2024-11-05'),
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800',
    tags: ['malaysia seo consultant', 'malaysia seo expert', 'best seo expert in malaysia'],
  },
  {
    title: 'Digital Marketing Training Malaysia: Building Your Team\'s Skills',
    content: `Digital marketing training Malaysia has become essential as businesses recognize the need for in-house marketing capabilities. This guide explores training options and how to develop your team's digital skills.

## Why Invest in Digital Marketing Training?

### Business Benefits
- Reduced dependency on agencies
- Faster execution of campaigns
- Better understanding of digital metrics
- Improved agency oversight
- Cost savings over time

### Career Benefits
- Enhanced employability
- Higher earning potential
- Future-proof skills
- Industry certification

## Types of Digital Marketing Training

### 1. Formal Education
**Digital marketing degree** and **diploma in digital marketing** programs:
- University of Malaya
- Taylor's University
- HELP University
- Various private institutions

Duration: 1-4 years
Investment: RM 20,000 - 100,000+

### 2. Professional Certifications
Industry-recognized certifications:
- Google Ads Certification (free)
- Google Analytics Certification (free)
- HubSpot Inbound Marketing (free)
- Facebook Blueprint (free/paid)
- SEMrush Academy (free)

### 3. Digital Marketing Course Malaysia
Short courses from:
- General Assembly
- NEXT Academy
- Leadzap Marketing Training
- Industry workshops

Duration: 1 day - 3 months
Investment: RM 500 - 10,000

### 4. Corporate Training
Customized training for teams:
- On-site workshops
- Virtual training sessions
- Hands-on campaign practice
- Industry-specific focus

## Key Skills to Develop

### Foundation Skills
- Marketing fundamentals
- Customer journey understanding
- Data analysis basics
- Content creation

### Technical Skills
- SEO and SEM
- Social media marketing
- Email marketing
- Analytics and reporting

### Advanced Skills
- Marketing automation
- Conversion optimization
- Attribution modeling
- Strategic planning

## Building a Training Program

For businesses developing internal capabilities:

1. **Assess Current Skills**
Identify gaps in your team's knowledge.

2. **Define Objectives**
What should team members be able to do post-training?

3. **Choose Format**
In-person, online, or hybrid approach.

4. **Practice Application**
Real campaigns reinforce learning.

5. **Measure Progress**
Track skill development and application.

Digital marketing training is an investment that pays dividends through improved campaign performance and reduced external costs.`,
    excerpt: 'Explore digital marketing training Malaysia options for individuals and teams. Compare degrees, certifications, and courses to build marketing skills.',
    author: 'Training Team',
    publishedAt: new Date('2024-10-28'),
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800',
    tags: ['digital marketing training malaysia', 'digital marketing course malaysia', 'diploma in digital marketing'],
  },
  {
    title: 'Advantages of Digital Marketing for Malaysian Businesses in 2024',
    content: `Understanding the advantages of digital marketing helps Malaysian businesses make informed investment decisions. This comprehensive guide explores why digital marketing delivers superior ROI compared to traditional methods.

## Top Advantages of Digital Marketing

### 1. Cost-Effectiveness
Digital marketing offers superior cost efficiency:
- Lower entry barriers than traditional advertising
- Pay-per-click means paying only for results
- Better ROI tracking and optimization
- Scalable budgets for any business size

**Example**: A RM 3,000 monthly investment in Google Ads Malaysia can generate 100+ qualified leads, compared to RM 30,000+ for a single newspaper advertisement.

### 2. Precise Targeting
Reach exactly who you want:
- Demographic targeting (age, location, income)
- Interest and behavior targeting
- Retargeting previous visitors
- Lookalike audience expansion

### 3. Measurable Results
Every action is trackable:
- Real-time campaign performance
- Attribution modeling
- ROI calculation
- Continuous optimization

### 4. Level Playing Field
Small businesses can compete:
- Quality content beats big budgets
- Niche targeting finds your audience
- Agility advantages over large competitors
- Direct customer relationships

### 5. Global Reach with Local Focus
Expand beyond borders:
- Target international customers
- Maintain local SEO Malaysia presence
- Multi-language campaigns
- Time-zone appropriate scheduling

### 6. Engagement and Interaction
Two-way communication:
- Social media conversations
- Real-time customer feedback
- Community building
- Brand personality development

### 7. Flexibility and Adaptability
Quick pivots possible:
- Adjust campaigns in real-time
- Test and learn approach
- Seasonal adjustments
- Market response adaptation

## Digital vs Traditional Marketing

| Aspect | Digital | Traditional |
|--------|---------|-------------|
| Cost | Lower, scalable | Higher, fixed |
| Targeting | Precise | Broad |
| Measurement | Exact | Estimated |
| Speed | Immediate | Weeks/months |
| Adjustment | Real-time | Difficult |

## Getting Started

For Malaysian businesses new to digital marketing:

1. **Start Small**: Begin with one channel (often Google Ads or Facebook)
2. **Learn and Iterate**: Use data to improve
3. **Scale What Works**: Increase investment in proven channels
4. **Diversify Gradually**: Add channels as you grow

The advantages of digital marketing compound over time. Early investment in digital channels builds assets (SEO rankings, audience data, content library) that continue generating returns.`,
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
 *  Provider（Firestore 实时 + 可选首批导入）
 *  ======================= */
export function ContentProvider({ children }: { children: ReactNode }) {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const bootstrappedRef = useRef(false);
  const BOOTSTRAP = String(import.meta.env.VITE_FIREBASE_BOOTSTRAP || '').toLowerCase() === 'true';

  // 订阅 BlogPosts
  useEffect(() => {
    const q = query(collection(db, 'blogPosts'), orderBy('publishedAt', 'desc'));
    const unsub = onSnapshot(q, async (snap) => {
      const list = snap.docs.map(docToBlogPost);
      setBlogPosts(list);

      // 若允许导入且当前库为空，则导入本地初始数据（只做一次）
      if (BOOTSTRAP && !bootstrappedRef.current && list.length === 0) {
        bootstrappedRef.current = true;
        try {
          // 导入本地三篇文章
          for (const item of initialBlogPosts) {
            await addDoc(collection(db, 'blogPosts'), {
              title: item.title,
              content: item.content,
              excerpt: item.excerpt,
              author: item.author,
              imageUrl: item.imageUrl || '',
              tags: sanitizeTags(item.tags),
              featured: !!item.featured,
              // 保留你设定的历史日期，写入 Firestore 会自动转 Timestamp
              publishedAt: item.publishedAt,
            });
          }
        } catch (e) {
          console.error('Bootstrap blogPosts failed:', e);
        }
      }
    });
    return () => unsub();
  }, [BOOTSTRAP]);

  // 订阅 Testimonials
  useEffect(() => {
    const q = query(collection(db, 'testimonials'));
    const unsub = onSnapshot(q, async (snap) => {
      const list = snap.docs.map(docToTestimonial);
      setTestimonials(list);

      if (BOOTSTRAP && !bootstrappedRef.current && list.length === 0) {
        // 注意：上面 blog 的订阅也会设置 bootstrappedRef；这里再兜底一次
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
    });
    return () => unsub();
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
