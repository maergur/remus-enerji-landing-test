import React, { useEffect, useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import { useTranslation } from 'react-i18next';
import { fetchBlogPosts, isContentfulConfigured, BlogPost } from '@/lib/contentful';
import { Calendar, User, ArrowRight, Clock, Newspaper, ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollAnimate } from '@/hooks/use-scroll-animation';
// TODO: Özel Blog arka plan görseli eklenebilir - örn: blog-banner.jpg
import BlogBanner from '@/assets/about-us-banner.jpg';

// Skeleton card component for loading state
const SkeletonCard: React.FC<{ isHero?: boolean }> = ({ isHero }) => {
  if (isHero) {
    return (
      <div className="relative rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-lg">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="h-64 md:h-[380px] bg-gray-100 animate-pulse" />
          <div className="p-8 flex flex-col justify-center space-y-4">
            <div className="h-5 w-20 bg-gray-100 rounded-full animate-pulse" />
            <div className="h-8 w-3/4 bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse" />
            <div className="flex gap-4 mt-4">
              <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow">
      <div className="h-52 bg-gray-100 animate-pulse" />
      <div className="p-5 space-y-3">
        <div className="h-5 w-16 bg-gray-100 rounded-full animate-pulse" />
        <div className="h-6 w-3/4 bg-gray-100 rounded animate-pulse" />
        <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
        <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse" />
      </div>
    </div>
  );
};

// Featured Hero Post component
const FeaturedPost: React.FC<{ post: BlogPost; formatDate: (date: string) => string; t: any }> = ({ post, formatDate, t }) => {
  const getReadingTime = (excerpt: string): number => {
    const words = excerpt.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 50));
  };

  return (
    <a
      href={`/blog/${post.slug}`}
      className="group relative block rounded-2xl overflow-hidden glass-card mb-12 card-hover"
    >
      <div className="grid md:grid-cols-2 gap-0">
        {/* Image */}
        <div className="relative h-64 md:h-[380px] overflow-hidden bg-gray-100">
          {post.coverImageUrl ? (
            <img
              src={post.coverImageUrl}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Newspaper className="w-16 h-16 text-gray-400" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/30" />
        </div>

        {/* Content */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          {/* Featured badge */}
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
              {t('blog.featured')}
            </span>
            {post.tags && post.tags[0] && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                {post.tags[0]}
              </span>
            )}
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-primary transition-colors">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-gray-600 text-base mb-6 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {getReadingTime(post.excerpt)} {t('blog.minRead')}
            </span>
            {post.author && (
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {post.author}
              </span>
            )}
          </div>

          {/* CTA */}
          <div className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
            {t('blog.readMore')}
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </a>
  );
};

// Blog card component
const BlogCard: React.FC<{ post: BlogPost; formatDate: (date: string) => string; index: number; t: any }> = ({ post, formatDate, index, t }) => {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group block feature-card card-hover overflow-hidden p-0"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Cover Image */}
      <div className="relative h-52 overflow-hidden">
        {post.coverImageUrl ? (
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <Newspaper className="w-12 h-12 text-gray-400" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(post.publishedAt)}
          </span>
          <span className="flex items-center gap-1 text-primary font-medium group-hover:gap-2 transition-all">
            {t('blog.readMore')}
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </a>
  );
};

const POSTS_PER_PAGE = 10;

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const loadPosts = async () => {
      if (!isContentfulConfigured()) {
        setError('notConfigured');
        setLoading(false);
        return;
      }

      try {
        const data = await fetchBlogPosts(i18n.language);
        setPosts(data);
      } catch (err) {
        setError('fetchError');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [i18n.language]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Extract unique tags from all posts
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(post => {
      post.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, [posts]);

  // Filter posts by selected tag
  const filteredPosts = useMemo(() => {
    if (!selectedTag) return posts;
    return posts.filter(post => post.tags?.includes(selectedTag));
  }, [posts, selectedTag]);

  // Reset to page 1 when tag filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTag]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  // Separate featured post (first one) from rest - only on page 1
  const featuredPost = currentPage === 1 ? paginatedPosts[0] : null;
  const remainingPosts = currentPage === 1 ? paginatedPosts.slice(1) : paginatedPosts;

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      <Navbar />
      
      {/* Hero Header - Subtle background image */}
      <section className="pt-12 pb-12 relative overflow-hidden mt-20">
        {/* Background image */}
        <div className="absolute inset-0">
          <img 
            src={BlogBanner} 
            alt="" 
            className="w-full h-full object-cover object-[80%_30%]" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/70 to-white" />
        </div>
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-primary/70 rounded-full text-primary font-medium text-sm shadow-sm mb-6 animate-fade-in">
              <Newspaper className="w-4 h-4" />
              <span>{t('blog.badge')}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 animate-slide-up">
              {t('blog.title')}
            </h1>
            <p className="text-gray-600 text-lg animate-slide-up delay-100">
              {t('blog.subtitle')}
            </p>
          </div>
        </div>
      </section>
      
      <main className="container mx-auto px-4 pb-20 pt-12 bg-white">
        <section className="max-w-6xl mx-auto">
          {/* Tag Filters */}
          {!loading && !error && allTags.length > 0 && (
            <ScrollAnimate animation="fadeUp" delay={100}>
              <div className="flex flex-wrap gap-2 mb-10">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedTag === null
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {t('blog.allPosts')}
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedTag === tag
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </ScrollAnimate>
          )}

          {/* Content */}
          {loading ? (
            <div className="space-y-8">
              <SkeletonCard isHero />
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            </div>
          ) : error === 'notConfigured' ? (
            <div className="text-center py-20 px-4">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-gray-200">
                  <Newspaper className="w-10 h-10 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {t('blog.comingSoon')}
                </h2>
                <p className="text-gray-600 mb-6">
                  {t('blog.comingSoonDesc')}
                </p>
                <a
                  href="/#join"
                  className="cta-button inline-flex items-center gap-2"
                >
                  {t('blog.notifyMe')}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-gray-600">{t('blog.error')}</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600">{t('blog.noPosts')}</p>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <ScrollAnimate animation="fadeUp" delay={150}>
                  <FeaturedPost post={featuredPost} formatDate={formatDate} t={t} />
                </ScrollAnimate>
              )}

              {/* Remaining Posts Grid */}
              {remainingPosts.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {remainingPosts.map((post, index) => (
                    <ScrollAnimate key={post.id} animation="fadeUp" delay={200 + index * 100}>
                      <BlogCard
                        post={post}
                        formatDate={formatDate}
                        index={index}
                        t={t}
                      />
                    </ScrollAnimate>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  {/* Previous Button */}
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    {t('blog.previous', 'Önceki')}
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((page, index) => (
                      <React.Fragment key={index}>
                        {page === '...' ? (
                          <span className="px-3 py-2 text-gray-400">...</span>
                        ) : (
                          <button
                            onClick={() => goToPage(page as number)}
                            className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                              currentPage === page
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {page}
                          </button>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t('blog.next', 'Sonraki')}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Blog;
