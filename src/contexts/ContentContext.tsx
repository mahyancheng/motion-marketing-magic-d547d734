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
    title: 'Getting Started with Modern Web Development',
    content: 'Modern web development has evolved significantly over the past decade. With the rise of frameworks like React, Vue, and Angular, developers now have powerful tools at their disposal to create dynamic, interactive web applications...',
    excerpt: 'Explore the fundamentals of modern web development and the tools that are shaping the future.',
    author: 'John Doe',
    publishedAt: new Date('2024-01-15'),
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
    tags: ['web development', 'react', 'javascript']
  },
  {
    id: '2',
    title: 'The Future of AI in Software Development',
    content: 'Artificial Intelligence is revolutionizing how we approach software development. From code generation to automated testing, AI tools are becoming indispensable for modern developers...',
    excerpt: 'Discover how AI is transforming the software development landscape.',
    author: 'Jane Smith',
    publishedAt: new Date('2024-01-10'),
    imageUrl: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=400&fit=crop',
    tags: ['ai', 'automation', 'future']
  }
];

const initialTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Ava Green',
    username: '@ava',
    body: 'This platform made my workflow 10x faster!',
    img: 'https://randomuser.me/api/portraits/women/32.jpg',
    country: '🇦🇺 Australia',
  },
  {
    id: '2',
    name: 'Ana Miller',
    username: '@ana',
    body: 'Amazing user experience and great support!',
    img: 'https://randomuser.me/api/portraits/women/68.jpg',
    country: '🇩🇪 Germany',
  },
  {
    id: '3',
    name: 'Mateo Rossi',
    username: '@mat',
    body: 'The animations are buttery smooth!',
    img: 'https://randomuser.me/api/portraits/men/51.jpg',
    country: '🇮🇹 Italy',
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