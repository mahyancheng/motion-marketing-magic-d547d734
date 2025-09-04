import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '@/contexts/ContentContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { PlusCircle, Edit, Trash2, Users, FileText } from 'lucide-react';
import { BlogPost, Testimonial } from '@/contexts/ContentContext';

export default function AdminDashboard() {
  const { 
    blogPosts, 
    testimonials, 
    addBlogPost, 
    updateBlogPost, 
    deleteBlogPost,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial
  } = useContent();

  const [isAddingPost, setIsAddingPost] = useState(false);
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: '',
    imageUrl: '',
    tags: ''
  });

  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    username: '',
    body: '',
    img: '',
    country: ''
  });

  const handleAddPost = () => {
    if (newPost.title && newPost.content && newPost.author) {
      addBlogPost({
        title: newPost.title,
        content: newPost.content,
        excerpt: newPost.excerpt || newPost.content.substring(0, 150) + '...',
        author: newPost.author,
        imageUrl: newPost.imageUrl,
        tags: newPost.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      });
      setNewPost({ title: '', content: '', excerpt: '', author: '', imageUrl: '', tags: '' });
      setIsAddingPost(false);
    }
  };

  const handleUpdatePost = () => {
    if (editingPost) {
      const tagsArray = Array.isArray(editingPost.tags) 
        ? editingPost.tags
        : (editingPost.tags as string).split(',').map((tag: string) => tag.trim()).filter(Boolean);
        
      updateBlogPost(editingPost.id, {
        title: editingPost.title,
        content: editingPost.content,
        excerpt: editingPost.excerpt,
        author: editingPost.author,
        imageUrl: editingPost.imageUrl,
        tags: tagsArray
      });
      setEditingPost(null);
    }
  };

  const handleAddTestimonial = () => {
    if (newTestimonial.name && newTestimonial.body) {
      addTestimonial(newTestimonial);
      setNewTestimonial({ name: '', username: '', body: '', img: '', country: '' });
      setIsAddingTestimonial(false);
    }
  };

  const handleUpdateTestimonial = () => {
    if (editingTestimonial) {
      updateTestimonial(editingTestimonial.id, editingTestimonial);
      setEditingTestimonial(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
          <nav className="flex gap-6">
            <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
              View Blog
            </Link>
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{blogPosts.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Testimonials</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{testimonials.length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="posts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="posts">Blog Posts</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          </TabsList>

          {/* Blog Posts Tab */}
          <TabsContent value="posts" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Manage Blog Posts</h2>
              <Dialog open={isAddingPost} onOpenChange={setIsAddingPost}>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add New Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Blog Post</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={newPost.title}
                        onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter post title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        value={newPost.author}
                        onChange={(e) => setNewPost(prev => ({ ...prev, author: e.target.value }))}
                        placeholder="Author name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="imageUrl">Image URL</Label>
                      <Input
                        id="imageUrl"
                        value={newPost.imageUrl}
                        onChange={(e) => setNewPost(prev => ({ ...prev, imageUrl: e.target.value }))}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tags">Tags (comma separated)</Label>
                      <Input
                        id="tags"
                        value={newPost.tags}
                        onChange={(e) => setNewPost(prev => ({ ...prev, tags: e.target.value }))}
                        placeholder="web development, react, javascript"
                      />
                    </div>
                    <div>
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Textarea
                        id="excerpt"
                        value={newPost.excerpt}
                        onChange={(e) => setNewPost(prev => ({ ...prev, excerpt: e.target.value }))}
                        placeholder="Brief description of the post"
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        value={newPost.content}
                        onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="Write your blog post content here..."
                        rows={8}
                      />
                    </div>
                    <Button onClick={handleAddPost} className="w-full">
                      Create Post
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {blogPosts.map((post) => (
                <Card key={post.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <CardTitle className="text-lg">{post.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          by {post.author} • {post.publishedAt.toLocaleDateString()}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Dialog open={editingPost?.id === post.id} onOpenChange={() => setEditingPost(editingPost?.id === post.id ? null : post)}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Edit Blog Post</DialogTitle>
                            </DialogHeader>
                            {editingPost && (
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="edit-title">Title</Label>
                                  <Input
                                    id="edit-title"
                                    value={editingPost.title}
                                    onChange={(e) => setEditingPost(prev => prev ? { ...prev, title: e.target.value } : null)}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-author">Author</Label>
                                  <Input
                                    id="edit-author"
                                    value={editingPost.author}
                                    onChange={(e) => setEditingPost(prev => prev ? { ...prev, author: e.target.value } : null)}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-imageUrl">Image URL</Label>
                                  <Input
                                    id="edit-imageUrl"
                                    value={editingPost.imageUrl || ''}
                                    onChange={(e) => setEditingPost(prev => prev ? { ...prev, imageUrl: e.target.value } : null)}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-tags">Tags</Label>
                                  <Input
                                    id="edit-tags"
                                    value={Array.isArray(editingPost.tags) ? editingPost.tags.join(', ') : editingPost.tags}
                                    onChange={(e) => setEditingPost(prev => prev ? { 
                                      ...prev, 
                                      tags: e.target.value.split(',').map((tag: string) => tag.trim()).filter(Boolean)
                                    } : null)}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-excerpt">Excerpt</Label>
                                  <Textarea
                                    id="edit-excerpt"
                                    value={editingPost.excerpt}
                                    onChange={(e) => setEditingPost(prev => prev ? { ...prev, excerpt: e.target.value } : null)}
                                    rows={2}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-content">Content</Label>
                                  <Textarea
                                    id="edit-content"
                                    value={editingPost.content}
                                    onChange={(e) => setEditingPost(prev => prev ? { ...prev, content: e.target.value } : null)}
                                    rows={8}
                                  />
                                </div>
                                <Button onClick={handleUpdatePost} className="w-full">
                                  Update Post
                                </Button>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => deleteBlogPost(post.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Manage Testimonials</h2>
              <Dialog open={isAddingTestimonial} onOpenChange={setIsAddingTestimonial}>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add New Testimonial
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Testimonial</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={newTestimonial.name}
                        onChange={(e) => setNewTestimonial(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Customer name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={newTestimonial.username}
                        onChange={(e) => setNewTestimonial(prev => ({ ...prev, username: e.target.value }))}
                        placeholder="@username"
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={newTestimonial.country}
                        onChange={(e) => setNewTestimonial(prev => ({ ...prev, country: e.target.value }))}
                        placeholder="🇺🇸 United States"
                      />
                    </div>
                    <div>
                      <Label htmlFor="img">Profile Image URL</Label>
                      <Input
                        id="img"
                        value={newTestimonial.img}
                        onChange={(e) => setNewTestimonial(prev => ({ ...prev, img: e.target.value }))}
                        placeholder="https://example.com/profile.jpg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="body">Testimonial</Label>
                      <Textarea
                        id="body"
                        value={newTestimonial.body}
                        onChange={(e) => setNewTestimonial(prev => ({ ...prev, body: e.target.value }))}
                        placeholder="Write the testimonial text here..."
                        rows={3}
                      />
                    </div>
                    <Button onClick={handleAddTestimonial} className="w-full">
                      Create Testimonial
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <img 
                          src={testimonial.img} 
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold">{testimonial.name}</h3>
                          <p className="text-sm text-muted-foreground">{testimonial.username}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.country}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Dialog open={editingTestimonial?.id === testimonial.id} onOpenChange={() => setEditingTestimonial(editingTestimonial?.id === testimonial.id ? null : testimonial)}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Testimonial</DialogTitle>
                            </DialogHeader>
                            {editingTestimonial && (
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="edit-name">Name</Label>
                                  <Input
                                    id="edit-name"
                                    value={editingTestimonial.name}
                                    onChange={(e) => setEditingTestimonial(prev => prev ? { ...prev, name: e.target.value } : null)}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-username">Username</Label>
                                  <Input
                                    id="edit-username"
                                    value={editingTestimonial.username}
                                    onChange={(e) => setEditingTestimonial(prev => prev ? { ...prev, username: e.target.value } : null)}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-country">Country</Label>
                                  <Input
                                    id="edit-country"
                                    value={editingTestimonial.country}
                                    onChange={(e) => setEditingTestimonial(prev => prev ? { ...prev, country: e.target.value } : null)}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-img">Profile Image URL</Label>
                                  <Input
                                    id="edit-img"
                                    value={editingTestimonial.img}
                                    onChange={(e) => setEditingTestimonial(prev => prev ? { ...prev, img: e.target.value } : null)}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-body">Testimonial</Label>
                                  <Textarea
                                    id="edit-body"
                                    value={editingTestimonial.body}
                                    onChange={(e) => setEditingTestimonial(prev => prev ? { ...prev, body: e.target.value } : null)}
                                    rows={3}
                                  />
                                </div>
                                <Button onClick={handleUpdateTestimonial} className="w-full">
                                  Update Testimonial
                                </Button>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => deleteTestimonial(testimonial.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">"{testimonial.body}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}