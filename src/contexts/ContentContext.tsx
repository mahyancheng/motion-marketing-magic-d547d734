import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: Date;
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
  addBlogPost: (post: Omit<BlogPost, 'id' | 'publishedAt'>) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  setFeaturedPost: (id: string) => void;
  getFeaturedPost: () => BlogPost | undefined;
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}

const initialBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How Push-Pull Marketing Transforms Small Business Growth',
    content: 'The digital marketing landscape has become increasingly complex, but our proprietary Push-Pull framework simplifies the process by creating a seamless customer journey. Push marketing involves strategic paid advertising campaigns that actively promote your brand to your target audience through social media platforms like Facebook, Instagram, and LinkedIn. Meanwhile, Pull marketing focuses on creating valuable, SEO-optimized content that naturally attracts users through search engines when they\'re actively looking for solutions. When these strategies work together, businesses typically see a 300% increase in qualified leads within the first 90 days. The key is understanding that modern consumers interact with brands across multiple touchpoints before making a purchase decision. Our framework ensures your message is consistent and compelling at every stage of the customer journey, from initial awareness through final conversion.',
    excerpt: 'Discover how our proprietary Push-Pull marketing framework helps small businesses achieve 300% growth in qualified leads within 90 days.',
    author: 'LeadZap Marketing Team',
    publishedAt: new Date('2024-01-15'),
    imageUrl: '/lovable-uploads/3a2eb97b-644e-417a-88db-c0bf8d2e32a8.png',
    tags: ['digital marketing', 'push-pull strategy', 'lead generation'],
    featured: true
  },
  {
    id: '2',
    title: 'The ROI of Strategic Social Media Advertising in 2024',
    content: 'Social media advertising has evolved far beyond simple boosted posts. Today\'s successful campaigns require sophisticated audience targeting, compelling creative assets, and data-driven optimization strategies. Our clients typically see an average return on ad spend (ROAS) of 4:1 within the first 60 days of implementation. The secret lies in understanding the unique characteristics of each platform: Facebook excels at detailed demographic targeting and life event marketing, Instagram drives engagement through visual storytelling, LinkedIn captures high-value B2B leads, and TikTok reaches younger demographics with authentic, trend-based content. However, the real magic happens in the integration - using insights from one platform to optimize performance across all channels. We\'ve developed proprietary algorithms that analyze cross-platform user behavior to predict the optimal ad placement, timing, and creative format for each individual prospect.',
    excerpt: 'Learn how strategic social media advertising delivers 4:1 ROAS and transforms your business growth trajectory.',
    author: 'Sarah Chen, Paid Ads Specialist',
    publishedAt: new Date('2024-01-10'),
    imageUrl: '/lovable-uploads/0187c1c5-f772-4140-8e30-6a1c4a91a51e.png',
    tags: ['social media ads', 'roas', 'paid advertising']
  },
  {
    id: '3',
    title: 'SEO Secrets: How Content Strategy Drives Organic Traffic',
    content: 'Search engine optimization in 2024 requires a fundamental shift from keyword stuffing to user intent optimization. Google\'s latest algorithm updates prioritize content that genuinely answers user questions and provides comprehensive value. Our SEO strategy focuses on creating topic clusters that establish domain authority while targeting both high-volume competitive keywords and long-tail opportunities. The process begins with comprehensive competitor analysis and keyword gap identification, followed by content planning that aligns with your buyer\'s journey. We\'ve developed a proprietary content scoring system that predicts ranking potential before publication, allowing us to optimize for both search engines and user engagement. Our clients typically see a 250% increase in organic traffic within 6 months, with many achieving first-page rankings for their primary business keywords.',
    excerpt: 'Unlock the SEO strategies that drive 250% organic traffic growth and first-page Google rankings.',
    author: 'Mike Rodriguez, SEO Director',
    publishedAt: new Date('2024-01-05'),
    imageUrl: '/lovable-uploads/587b4a19-4c03-47a5-ac99-74983c6e259a.png',
    tags: ['seo', 'content strategy', 'organic traffic']
  }
];

const initialTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Jennifer Martinez',
    username: '@jmartinez_ceo',
    body: 'LeadZap\'s Push-Pull strategy increased our leads by 400% in just 3 months!',
    img: 'https://randomuser.me/api/portraits/women/32.jpg',
    country: '🇺🇸 United States',
  },
  {
    id: '2',
    name: 'David Thompson',
    username: '@davidthompson',
    body: 'Their social media ads generated $50k in revenue within 60 days. Amazing ROI!',
    img: 'https://randomuser.me/api/portraits/men/45.jpg',
    country: '🇨🇦 Canada',
  },
  {
    id: '3',
    name: 'Maria Rodriguez',
    username: '@mariarod_biz',
    body: 'Finally hit #1 on Google for our main keywords. Organic traffic is through the roof!',
    img: 'https://randomuser.me/api/portraits/women/68.jpg',
    country: '🇪🇸 Spain',
  },
  {
    id: '4',
    name: 'James Wilson',
    username: '@jwilson_startup',
    body: 'From zero to 10k followers and consistent sales. LeadZap delivers results!',
    img: 'https://randomuser.me/api/portraits/men/51.jpg',
    country: '🇬🇧 United Kingdom',
  },
  {
    id: '5',
    name: 'Lisa Chen',
    username: '@lisachen_coach',
    body: 'Best marketing investment I\'ve ever made. My business has completely transformed!',
    img: 'https://randomuser.me/api/portraits/women/53.jpg',
    country: '🇸🇬 Singapore',
  }
];

export function ContentProvider({ children }: { children: ReactNode }) {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);

  const addBlogPost = (post: Omit<BlogPost, 'id' | 'publishedAt'>) => {
    const newPost: BlogPost = {
      ...post,
      id: Math.random().toString(36).substr(2, 9),
      publishedAt: new Date()
    };
    setBlogPosts(prev => [newPost, ...prev]);
  };

  const updateBlogPost = (id: string, updatedPost: Partial<BlogPost>) => {
    setBlogPosts(prev => prev.map(post => 
      post.id === id ? { ...post, ...updatedPost } : post
    ));
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts(prev => prev.filter(post => post.id !== id));
  };

  const setFeaturedPost = (id: string) => {
    setBlogPosts(prev => prev.map(post => ({
      ...post,
      featured: post.id === id
    })));
  };

  const getFeaturedPost = (): BlogPost | undefined => {
    return blogPosts.find(post => post.featured);
  };

  const addTestimonial = (testimonial: Omit<Testimonial, 'id'>) => {
    const newTestimonial: Testimonial = {
      ...testimonial,
      id: Math.random().toString(36).substr(2, 9)
    };
    setTestimonials(prev => [...prev, newTestimonial]);
  };

  const updateTestimonial = (id: string, updatedTestimonial: Partial<Testimonial>) => {
    setTestimonials(prev => prev.map(testimonial => 
      testimonial.id === id ? { ...testimonial, ...updatedTestimonial } : testimonial
    ));
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(testimonial => testimonial.id !== id));
  };

  const value = {
    blogPosts,
    testimonials,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    setFeaturedPost,
    getFeaturedPost,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
}