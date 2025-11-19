import { useParams, Link, Navigate } from 'react-router-dom';
import { useContent } from '@/contexts/ContentContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Navbar } from './Index';

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const { blogPosts } = useContent();
  
  const post = blogPosts.find(p => p.id === id);
  
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Use same navbar as home page */}
      <Navbar />

      {/* Hero Image */}
      {post.imageUrl && (
        <div className="relative h-96 overflow-hidden">
          <img 
            src={post.imageUrl} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>
      )}

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 py-12 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-400">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{post.publishedAt.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-400 hover:text-yellow-400 p-0"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: post.title,
                    text: post.excerpt,
                    url: window.location.href
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
            >
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </Button>
          </div>

          {/* Excerpt */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8">
            <p className="text-xl text-gray-300 italic leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg prose-invert max-w-none">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="text-gray-300 leading-relaxed mb-6 text-lg">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-12 bg-gradient-to-r from-yellow-400/10 to-transparent border border-yellow-400/20 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4 text-yellow-400">Ready to Transform Your Marketing?</h3>
            <p className="text-gray-300 mb-6">
              Don't let your competitors get ahead. Contact us today for a free consultation and discover how our proven strategies can accelerate your business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button className="bg-yellow-400 text-black hover:bg-yellow-300 font-medium">
                  Get Free Consultation
                </Button>
              </Link>
              <Link to="/blog">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  Read More Articles
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </article>

      {/* Related Posts */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {blogPosts
              .filter(p => p.id !== post.id)
              .slice(0, 2)
              .map((relatedPost) => (
                <Link 
                  key={relatedPost.id} 
                  to={`/blog/${relatedPost.id}`}
                  className="group"
                >
                  <div className="bg-black border border-gray-800 rounded-lg overflow-hidden hover:border-yellow-400/30 transition-all duration-300">
                    {relatedPost.imageUrl && (
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={relatedPost.imageUrl} 
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex flex-wrap gap-1 mb-3">
                        {relatedPost.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs bg-yellow-400/20 text-yellow-400">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-yellow-400 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="text-sm text-gray-500">
                        {relatedPost.publishedAt.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2024 Leadzap Marketing. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}