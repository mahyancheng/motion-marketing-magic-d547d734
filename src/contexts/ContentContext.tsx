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
    title: 'How Push-Pull Marketing Transforms Small Business Growth',
    content:
      "The digital marketing landscape has become increasingly complex, but our proprietary Push-Pull framework simplifies the process by creating a seamless customer journey. Push marketing involves strategic paid advertising campaigns that actively promote your brand to your target audience through social media platforms like Facebook, Instagram, and LinkedIn. Meanwhile, Pull marketing focuses on creating valuable, SEO-optimized content that naturally attracts users through search engines when they're actively looking for solutions. When these strategies work together, businesses typically see a 300% increase in qualified leads within the first 90 days. The key is understanding that modern consumers interact with brands across multiple touchpoints before making a purchase decision. Our framework ensures your message is consistent and compelling at every stage of the customer journey, from initial awareness through final conversion.",
    excerpt:
      'Discover how our proprietary Push-Pull marketing framework helps small businesses achieve 300% growth in qualified leads within 90 days.',
    author: 'Leadzap Marketing Team',
    publishedAt: new Date('2024-01-15'),
    imageUrl: Push_Pull as unknown as string,
    tags: ['digital marketing', 'push-pull strategy', 'lead generation'],
    featured: true,
  },
  {
    title: 'The ROI of Strategic Social Media Advertising in 2024',
    content:
      "Social media advertising has evolved far beyond simple boosted posts. Today's successful campaigns require sophisticated audience targeting, compelling creative assets, and data-driven optimization strategies. Our clients typically see an average return on ad spend (ROAS) of 4:1 within the first 60 days of implementation. The secret lies in understanding the unique characteristics of each platform: Facebook excels at detailed demographic targeting and life event marketing, Instagram drives engagement through visual storytelling, LinkedIn captures high-value B2B leads, and TikTok reaches younger demographics with authentic, trend-based content. However, the real magic happens in the integration - using insights from one platform to optimize performance across all channels. We've developed proprietary algorithms that analyze cross-platform user behavior to predict the optimal ad placement, timing, and creative format for each individual prospect.",
    excerpt:
      'Learn how strategic social media advertising delivers 4:1 ROAS and transforms your business growth trajectory.',
    author: 'Sarah Chen, Paid Ads Specialist',
    publishedAt: new Date('2024-01-10'),
    imageUrl: Push_ADS as unknown as string,
    tags: ['social media ads', 'roas', 'paid advertising'],
  },
  {
    title: 'SEO Secrets: How Content Strategy Drives Organic Traffic',
    content:
      "Search engine optimization in 2024 requires a fundamental shift from keyword stuffing to user intent optimization. Google's latest algorithm updates prioritize content that genuinely answers user questions and provides comprehensive value. Our SEO strategy focuses on creating topic clusters that establish domain authority while targeting both high-volume competitive keywords and long-tail opportunities. The process begins with comprehensive competitor analysis and keyword gap identification, followed by content planning that aligns with your buyer's journey. We've developed a proprietary content scoring system that predicts ranking potential before publication, allowing us to optimize for both search engines and user engagement. Our clients typically see a 250% increase in organic traffic within 6 months, with many achieving first-page rankings for their primary business keywords.",
    excerpt:
      'Unlock the SEO strategies that drive 250% organic traffic growth and first-page Google rankings.',
    author: 'Mike Rodriguez, SEO Director',
    publishedAt: new Date('2024-01-05'),
    imageUrl: Org_Traffic as unknown as string,
    tags: ['seo', 'content strategy', 'organic traffic'],
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
