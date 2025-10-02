import { Link } from 'react-router-dom';
import { useContent } from '@/contexts/ContentContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Navbar } from './Index';


export default function Blog() {
  const { blogPosts, getFeaturedPost } = useContent();
  const featuredPost = getFeaturedPost();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Use same navbar as home page */}
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 text-center bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Marketing <span className="text-yellow-400">Insights</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Discover proven strategies, expert insights, and actionable tips to accelerate your digital marketing success.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full"></div>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Featured Article</h2>

              {/* keep this group for title/color transitions, etc. */}
              <Link to={`/blog/${featuredPost.id}`} className="group">
                <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2">
                  <div className="grid md:grid-cols-2 gap-0">
                    {featuredPost.imageUrl && (
                      // ⬇️ give the image wrapper its own named group
                      <div
                        className="overflow-hidden [aspect-ratio:16/9] group/image"
                      // or className="overflow-hidden aspect-[16/9] group/image" if you use tailwind v3.3+
                      >
                        <img
                          src={featuredPost.imageUrl}
                          alt={featuredPost.title}
                          className="
                  w-full h-full object-cover
                  transition-transform duration-300
                  group-hover/image:scale-105  /* only when hovering THIS wrapper */
                  group-hover:scale-100         /* explicitly cancel parent group hover */
                "
                          loading="lazy"
                        />
                      </div>
                    )}

                    <div className="p-8 flex flex-col justify-center">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {featuredPost.tags.map((tag) => (
                          <Badge key={tag} className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* This still reacts to the outer group hover for color */}
                      <h3 className="text-3xl font-bold mb-4 group-hover:text-yellow-400 transition-colors">
                        {featuredPost.title}
                      </h3>

                      <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                        {featuredPost.excerpt}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{featuredPost.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{featuredPost.publishedAt.toLocaleDateString()}</span>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        className="group/btn p-0 h-auto font-semibold text-yellow-400 hover:text-yellow-300 w-fit"
                      >
                        Read Full Article
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.filter(post => !post.featured).map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/blog/${post.id}`} className="group">
                    <Card className="group bg-black border-gray-800 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                      {post.imageUrl && (
                        <div
                          className="overflow-hidden rounded-t-lg"
                          style={{ aspectRatio: 16 / 9 }}   // ✅ 原生 aspect-ratio
                        >
                          <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                      )}

                      <CardHeader>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {post.tags.map((tag) => (
                            <Badge key={tag} className="text-xs bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <CardTitle className="text-xl mb-2 group-hover:text-yellow-400 transition-colors text-white">
                          {post.title}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{post.publishedAt.toLocaleDateString()}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <Button variant="ghost" className="group/btn p-0 h-auto font-semibold text-yellow-400 hover:text-yellow-300">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            {blogPosts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg mb-4">No blog posts yet.</p>
                <Link to="/admin">
                  <Button className="bg-yellow-400 text-black hover:bg-yellow-300">Create Your First Post</Button>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-yellow-400/10 to-transparent">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl text-gray-300 mb-8">
              Get the latest marketing insights and strategies delivered to your inbox.
            </p>
            <Link to="/contact">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-300 text-lg px-8 py-3">
                Subscribe to Newsletter
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center text-gray-400">
            <p>&copy; 2024 LeadZap Marketing. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}