import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { useContent, BlogPost, Testimonial } from "@/contexts/ContentContext";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import {
  PlusCircle,
  Edit,
  Trash2,
  Users,
  FileText,
  ArrowLeft,
} from "lucide-react";

/* ----------------------------- CreatePostForm ----------------------------- */
/** 新增文章表单：仅支持图片 URL（已移除本机上传） */
function CreatePostForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (payload: {
    title: string;
    content: string;
    excerpt: string;
    author: string;
    imageUrl?: string;
    tags: string[];
    featured?: boolean;
  }) => Promise<void> | void;
  onCancel?: () => void;
}) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>("");

  const tags = useMemo(
    () => (tagsInput || "").split(",").map((t) => t.trim()).filter(Boolean),
    [tagsInput]
  );

  const previewSrc = useMemo(() => (imageUrl ? imageUrl : ""), [imageUrl]);

  const validate = () => {
    if (!title.trim()) return "Title is required.";
    if (!author.trim()) return "Author is required.";
    if (!content.trim()) return "Content is required.";
    if (imageUrl && !/^https?:\/\//i.test(imageUrl)) {
      return "Image URL must start with http(s)://";
    }
    return "";
  };

  const handleSubmit = async () => {
    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await onSubmit({
        title: title.trim(),
        author: author.trim(),
        content: content.trim(),
        excerpt: (excerpt || content.slice(0, 150) + "...").trim(),
        imageUrl: imageUrl || undefined,
        tags,
        featured: false,
      });
    } catch (e: any) {
      setError(e?.message || "Failed to create post.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* 标题 & 作者 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
          />
        </div>
        <div>
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            value={author || ""}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author name"
          />
        </div>
      </div>

      {/* 标签 */}
      <div>
        <Label htmlFor="tags">Tags (comma separated)</Label>
        <Input
          id="tags"
          value={tagsInput || ""}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="web development, react, javascript"
        />
      </div>

      {/* 摘要 */}
      <div>
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          value={excerpt || ""}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Brief description of the post"
          rows={2}
        />
      </div>

      {/* 正文 */}
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={content || ""}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your blog post content here..."
          rows={8}
        />
      </div>

      {/* 图片 URL（仅保留 URL 模式） */}
      <div className="space-y-2">
        <Label htmlFor="imageUrl">Cover Image URL</Label>
        <Input
          id="imageUrl"
          value={imageUrl || ""}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
        {/* 预览（填了 URL 才显示） */}
        {previewSrc ? (
          <div className="mt-3 rounded-lg overflow-hidden border border-gray-800">
            <img src={previewSrc} alt="Preview" className="w-full max-h-60 object-cover" />
          </div>
        ) : null}
      </div>

      {/* 错误信息 */}
      {error && <p className="text-sm text-red-400">{error}</p>}

      {/* 操作按钮 */}
      <div className="flex gap-3">
        <Button
          disabled={submitting}
          onClick={handleSubmit}
          className="bg-yellow-400 text-black hover:bg-yellow-300 w-full"
        >
          {submitting ? "Creating..." : "Create Post"}
        </Button>
        {onCancel && (
          <Button
            variant="outline"
            className="border-gray-700 text-black hover:bg-gray-800 w-40"
            type="button"
            onClick={onCancel}
            disabled={submitting}
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------ Admin Page ------------------------------- */
export default function AdminDashboard() {
  const {
    blogPosts,
    testimonials,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    setFeaturedPost,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
  } = useContent();

  const [isAddingPost, setIsAddingPost] = useState(false);
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  // 仅用于 Testimonial 创建
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    username: "",
    body: "",
    img: "",
    country: "",
  });

  const handleUpdatePost = () => {
    if (editingPost) {
      const tagsArray = Array.isArray(editingPost.tags)
        ? editingPost.tags
        : (editingPost.tags as unknown as string)
            .toString()
            .split(",")
            .map((tag: string) => tag.trim())
            .filter(Boolean);

      updateBlogPost(editingPost.id, {
        title: editingPost.title,
        content: editingPost.content,
        excerpt: editingPost.excerpt,
        author: editingPost.author,
        imageUrl: editingPost.imageUrl,
        tags: tagsArray,
      });
      setEditingPost(null);
    }
  };

  const handleAddTestimonial = () => {
    if (newTestimonial.name && newTestimonial.body) {
      addTestimonial(newTestimonial);
      setNewTestimonial({ name: "", username: "", body: "", img: "", country: "" });
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
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-300 hover:text-yellow-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
            <h1 className="text-2xl font-bold text-yellow-400">Admin Dashboard</h1>
          </div>
          <nav className="flex gap-6">
            <Link to="/blog" className="text-gray-300 hover:text-yellow-400 transition-colors">
              View Blog
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-4">
            Welcome to <span className="text-yellow-400">LeadZap</span> Admin
          </h2>
          <p className="text-gray-300 text-lg">
            Manage your blog content and client testimonials to showcase your marketing expertise.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Total Posts</CardTitle>
                <FileText className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{blogPosts.length}</div>
                <p className="text-xs text-gray-500">Marketing insights published</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Client Testimonials</CardTitle>
                <Users className="h-4 h-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{testimonials.length}</div>
                <p className="text-xs text-gray-500">Happy client reviews</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Tabs defaultValue="posts" className="space-y-4">
          <TabsList className="bg-gray-900 border-gray-800">
            <TabsTrigger
              value="posts"
              className="text-gray-300 data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
            >
              Blog Posts
            </TabsTrigger>
            <TabsTrigger
              value="testimonials"
              className="text-gray-300 data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
            >
              Testimonials
            </TabsTrigger>
          </TabsList>

          {/* Blog Posts Tab */}
          <TabsContent value="posts" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-white">Manage Blog Posts</h2>

              {/* New Post Dialog（只有 URL） */}
              <Dialog open={isAddingPost} onOpenChange={setIsAddingPost}>
                <DialogTrigger asChild>
                  <Button className="bg-yellow-400 text-black hover:bg-yellow-300">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add New Post
                  </Button>
                </DialogTrigger>
                <DialogContent
                  className="
                    max-w-2xl max-h-[85vh] overflow-y-auto bg-gray-900 border-gray-800 text-white
                    [&_input]:text-black [&_textarea]:text-black
                    [&_input]:bg-white [&_textarea]:bg-white
                    [&_input]:placeholder:text-gray-500 [&_textarea]:placeholder:text-gray-500
                    [&_input]:border-gray-300 [&_textarea]:border-gray-300
                    [&_input:focus]:ring-yellow-400 [&_textarea:focus]:ring-yellow-400
                  "
                  onOpenAutoFocus={(e) => e.preventDefault()}
                >
                  <DialogHeader>
                    <DialogTitle className="text-yellow-400">Create New Blog Post</DialogTitle>
                  </DialogHeader>

                  <CreatePostForm
                    onSubmit={async (payload) => {
                      await addBlogPost({
                        title: payload.title,
                        content: payload.content,
                        excerpt: payload.excerpt,
                        author: payload.author,
                        imageUrl: payload.imageUrl, // 仅 URL
                        tags: payload.tags,
                        featured: payload.featured,
                      });
                      setIsAddingPost(false);
                    }}
                    onCancel={() => setIsAddingPost(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {blogPosts.map((post) => (
                <Card key={post.id} className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <CardTitle className="text-lg text-white">{post.title}</CardTitle>
                        <p className="text-sm text-gray-400">
                          by {post.author} • {post.publishedAt.toLocaleDateString()}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {post.tags.map((tag) => (
                            <Badge
                              key={tag}
                              className="text-xs bg-yellow-400/20 text-yellow-400 border-yellow-400/30"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {/* Edit Post */}
                        <Dialog
                          open={editingPost?.id === post.id}
                          onOpenChange={() =>
                            setEditingPost(editingPost?.id === post.id ? null : post)
                          }
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-700 hover:bg-gray-800"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent
                            className="
                              max-w-2xl max-h-[80vh] overflow-y-auto bg-gray-900 border-gray-800 text-white
                              [&_input]:text-black [&_textarea]:text-black
                              [&_input]:bg-white [&_textarea]:bg-white
                              [&_input]:placeholder:text-gray-500 [&_textarea]:placeholder:text-gray-500
                              [&_input]:border-gray-300 [&_textarea]:border-gray-300
                              [&_input:focus]:ring-yellow-400 [&_textarea:focus]:ring-yellow-400
                            "
                          >
                            <DialogHeader>
                              <DialogTitle className="text-yellow-400">Edit Blog Post</DialogTitle>
                            </DialogHeader>
                            {editingPost && (
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="edit-title">Title</Label>
                                  <Input
                                    id="edit-title"
                                    value={editingPost.title || ""}
                                    onChange={(e) =>
                                      setEditingPost((prev) =>
                                        prev ? { ...prev, title: e.target.value } : null
                                      )
                                    }
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-author">Author</Label>
                                  <Input
                                    id="edit-author"
                                    value={editingPost.author || ""}
                                    onChange={(e) =>
                                      setEditingPost((prev) =>
                                        prev ? { ...prev, author: e.target.value } : null
                                      )
                                    }
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-imageUrl">Image URL</Label>
                                  <Input
                                    id="edit-imageUrl"
                                    value={editingPost.imageUrl || ""}
                                    onChange={(e) =>
                                      setEditingPost((prev) =>
                                        prev ? { ...prev, imageUrl: e.target.value } : null
                                      )
                                    }
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-tags">Tags</Label>
                                  <Input
                                    id="edit-tags"
                                    value={
                                      Array.isArray(editingPost.tags)
                                        ? editingPost.tags.join(", ")
                                        : ((editingPost.tags as unknown as string) || "")
                                    }
                                    onChange={(e) =>
                                      setEditingPost((prev) =>
                                        prev
                                          ? {
                                              ...prev,
                                              tags: e.target.value
                                                .split(",")
                                                .map((tag: string) => tag.trim())
                                                .filter(Boolean),
                                            }
                                          : null
                                      )
                                    }
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-excerpt">Excerpt</Label>
                                  <Textarea
                                    id="edit-excerpt"
                                    value={editingPost.excerpt || ""}
                                    onChange={(e) =>
                                      setEditingPost((prev) =>
                                        prev ? { ...prev, excerpt: e.target.value } : null
                                      )
                                    }
                                    rows={2}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-content">Content</Label>
                                  <Textarea
                                    id="edit-content"
                                    value={editingPost.content || ""}
                                    onChange={(e) =>
                                      setEditingPost((prev) =>
                                        prev ? { ...prev, content: e.target.value } : null
                                      )
                                    }
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

                        {/* Delete */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteBlogPost(post.id)}
                          className="text-destructive hover:text-destructive border-gray-700 hover:bg-gray-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>

                        {/* Set Featured */}
                        <Button
                          variant={post.featured ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFeaturedPost(post.id)}
                          className={
                            post.featured
                              ? "bg-yellow-400 text-black hover:bg-yellow-300"
                              : "border-gray-700 hover:bg-gray-800 text-yellow-400 hover:text-yellow-300"
                          }
                        >
                          {post.featured ? "Featured" : "Set Featured"}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 line-clamp-2">{post.excerpt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-white">Manage Client Testimonials</h2>

              <Dialog open={isAddingTestimonial} onOpenChange={setIsAddingTestimonial}>
                <DialogTrigger asChild>
                  <Button className="bg-yellow-400 text-black hover:bg-yellow-300">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add New Testimonial
                  </Button>
                </DialogTrigger>
                <DialogContent
                  className="
                    max-w-2xl max-h-[80vh] overflow-y-auto bg-gray-900 border-gray-800 text-white
                    [&_input]:text-black [&_textarea]:text-black
                    [&_input]:bg-white [&_textarea]:bg-white
                    [&_input]:placeholder:text-gray-500 [&_textarea]:placeholder:text-gray-500
                    [&_input]:border-gray-300 [&_textarea]:border-gray-300
                    [&_input:focus]:ring-yellow-400 [&_textarea:focus]:ring-yellow-400
                  "
                >
                  <DialogHeader>
                    <DialogTitle className="text-yellow-400">Create New Testimonial</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={newTestimonial.name || ""}
                        onChange={(e) =>
                          setNewTestimonial((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="Customer name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={newTestimonial.username || ""}
                        onChange={(e) =>
                          setNewTestimonial((prev) => ({ ...prev, username: e.target.value }))
                        }
                        placeholder="@username"
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={newTestimonial.country || ""}
                        onChange={(e) =>
                          setNewTestimonial((prev) => ({ ...prev, country: e.target.value }))
                        }
                        placeholder="🇺🇸 United States"
                      />
                    </div>
                    <div>
                      <Label htmlFor="img">Profile Image URL</Label>
                      <Input
                        id="img"
                        value={newTestimonial.img || ""}
                        onChange={(e) =>
                          setNewTestimonial((prev) => ({ ...prev, img: e.target.value }))
                        }
                        placeholder="https://example.com/profile.jpg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="body">Testimonial</Label>
                      <Textarea
                        id="body"
                        value={newTestimonial.body || ""}
                        onChange={(e) =>
                          setNewTestimonial((prev) => ({ ...prev, body: e.target.value }))
                        }
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
                <Card key={testimonial.id} className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <img
                          src={testimonial.img}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-white">{testimonial.name}</h3>
                          <p className="text-sm text-gray-400">{testimonial.username}</p>
                          <p className="text-sm text-gray-400">{testimonial.country}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Dialog
                          open={editingTestimonial?.id === testimonial.id}
                          onOpenChange={() =>
                            setEditingTestimonial(
                              editingTestimonial?.id === testimonial.id ? null : testimonial
                            )
                          }
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-700 hover:bg-gray-800"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent
                            className="
                              max-w-2xl max-h-[80vh] overflow-y-auto bg-gray-900 border-gray-800 text-white
                              [&_input]:text-black [&_textarea]:text-black
                              [&_input]:bg-white [&_textarea]:bg-white
                              [&_input]:placeholder:text-gray-500 [&_textarea]:placeholder:text-gray-500
                              [&_input]:border-gray-300 [&_textarea]:border-gray-300
                              [&_input:focus]:ring-yellow-400 [&_textarea:focus]:ring-yellow-400
                            "
                          >
                            <DialogHeader>
                              <DialogTitle className="text-yellow-400">Edit Testimonial</DialogTitle>
                            </DialogHeader>
                            {editingTestimonial && (
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="edit-name">Name</Label>
                                  <Input
                                    id="edit-name"
                                    value={editingTestimonial.name || ""}
                                    onChange={(e) =>
                                      setEditingTestimonial((prev) =>
                                        prev ? { ...prev, name: e.target.value } : null
                                      )
                                    }
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-username">Username</Label>
                                  <Input
                                    id="edit-username"
                                    value={editingTestimonial.username || ""}
                                    onChange={(e) =>
                                      setEditingTestimonial((prev) =>
                                        prev ? { ...prev, username: e.target.value } : null
                                      )
                                    }
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-country">Country</Label>
                                  <Input
                                    id="edit-country"
                                    value={editingTestimonial.country || ""}
                                    onChange={(e) =>
                                      setEditingTestimonial((prev) =>
                                        prev ? { ...prev, country: e.target.value } : null
                                      )
                                    }
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-img">Profile Image URL</Label>
                                  <Input
                                    id="edit-img"
                                    value={editingTestimonial.img || ""}
                                    onChange={(e) =>
                                      setEditingTestimonial((prev) =>
                                        prev ? { ...prev, img: e.target.value } : null
                                      )
                                    }
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-body">Testimonial</Label>
                                  <Textarea
                                    id="edit-body"
                                    value={editingTestimonial.body || ""}
                                    onChange={(e) =>
                                      setEditingTestimonial((prev) =>
                                        prev ? { ...prev, body: e.target.value } : null
                                      )
                                    }
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
                          className="text-destructive hover:text-destructive border-gray-700 hover:bg-gray-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">"{testimonial.body}"</p>
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
