import { motion } from "framer-motion";
import { useContent, BlogPost } from "@/contexts/ContentContext";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogSectionProps {
  tags: string[];
  title?: string;
  subtitle?: string;
}

const BlogSection = ({ tags, title = "Latest Insights", subtitle = "Stay updated with our latest blog posts and industry insights" }: BlogSectionProps) => {
  const { blogPosts } = useContent();

  // Filter blog posts that have any of the specified tags
  const filteredPosts = blogPosts.filter(post => 
    post.tags.some(tag => 
      tags.some(filterTag => 
        tag.toLowerCase().includes(filterTag.toLowerCase()) || 
        filterTag.toLowerCase().includes(tag.toLowerCase())
      )
    )
  ).slice(0, 3); // Show maximum 3 posts

  if (filteredPosts.length === 0) {
    return null; // Don't render if no posts match the tags
  }

  return (
    <div className="py-16 bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{title}</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="bg-black rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              viewport={{ once: true }}
            >
              {post.imageUrl && (
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.publishedAt.toISOString()}>
                      {post.publishedAt.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 text-white hover:text-yellow-400 transition-colors">
                  <Link to={`/blog/${post.id}`} className="line-clamp-2">
                    {post.title}
                  </Link>
                </h3>

                <p className="text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="bg-yellow-400/10 text-yellow-400 text-xs px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-yellow-400 hover:text-yellow-300 transition-colors flex items-center gap-1 text-sm font-medium"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredPosts.length > 0 && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-md font-medium hover:bg-yellow-300 transition-colors"
            >
              View All Articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BlogSection;