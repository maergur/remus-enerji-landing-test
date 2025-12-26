import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import { useTranslation } from 'react-i18next';
import { fetchBlogPostBySlug, fetchBlogPosts, isContentfulConfigured, BlogPost } from '@/lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { Calendar, User, ArrowLeft, ArrowRight, Clock, Check, Link2, Newspaper } from 'lucide-react';
import { ScrollAnimate } from '@/hooks/use-scroll-animation';

// Social share icons
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// Reading Progress Bar component
const ReadingProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  if (progress < 5) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-[100]">
      <div 
        className="h-full bg-primary transition-all duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

// Related Posts component
const RelatedPosts: React.FC<{ currentPostId: string; t: any; formatDate: (date: string) => string }> = ({ currentPostId, t, formatDate }) => {
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const { i18n } = useTranslation();

  useEffect(() => {
    const loadRelated = async () => {
      const allPosts = await fetchBlogPosts(i18n.language);
      const filtered = allPosts.filter(p => p.id !== currentPostId).slice(0, 3);
      setRelatedPosts(filtered);
    };
    loadRelated();
  }, [currentPostId, i18n.language]);

  if (relatedPosts.length === 0) return null;

  return (
    <ScrollAnimate animation="fadeUp">
      <div className="mt-16 pt-12 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">{t('blog.relatedPosts')}</h3>
        <div className="grid gap-6 md:grid-cols-3">
          {relatedPosts.map((post, index) => (
            <ScrollAnimate key={post.id} animation="fadeUp" delay={index * 100}>
              <a
                href={`/blog/${post.slug}`}
                className="group block feature-card card-hover overflow-hidden p-0"
              >
                <div className="relative h-32 overflow-hidden">
                  {post.coverImageUrl ? (
                    <img
                      src={post.coverImageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <Newspaper className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 text-sm">
                    {post.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(post.publishedAt)}
                  </p>
                </div>
              </a>
            </ScrollAnimate>
          ))}
        </div>
      </div>
    </ScrollAnimate>
  );
};

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setError('notFound');
        setLoading(false);
        return;
      }

      if (!isContentfulConfigured()) {
        setError('notConfigured');
        setLoading(false);
        return;
      }

      try {
        const data = await fetchBlogPostBySlug(slug, i18n.language);
        if (!data) {
          setError('notFound');
        } else {
          setPost(data);
        }
      } catch (err) {
        setError('fetchError');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
    window.scrollTo(0, 0);
  }, [slug, i18n.language]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getReadingTime = (body: any): number => {
    if (!body) return 1;
    const text = JSON.stringify(body);
    const words = text.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, []);

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post?.title || '')}&url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const shareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(post?.title || '')}%20${encodeURIComponent(window.location.href)}`, '_blank');
  };

  // Rich text renderer options - light theme
  const richTextOptions = {
    renderMark: {
      [MARKS.BOLD]: (text: React.ReactNode) => <strong className="font-semibold text-gray-900">{text}</strong>,
      [MARKS.ITALIC]: (text: React.ReactNode) => <em>{text}</em>,
      [MARKS.CODE]: (text: React.ReactNode) => (
        <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-primary">{text}</code>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => (
        <p className="mb-5 text-gray-600 leading-relaxed">{children}</p>
      ),
      [BLOCKS.HEADING_1]: (node: any, children: React.ReactNode) => (
        <h1 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => (
        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node: any, children: React.ReactNode) => (
        <h3 className="text-lg font-bold text-gray-900 mt-6 mb-3">{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (node: any, children: React.ReactNode) => (
        <h4 className="text-base font-semibold text-gray-900 mt-6 mb-3">{children}</h4>
      ),
      [BLOCKS.UL_LIST]: (node: any, children: React.ReactNode) => (
        <ul className="list-disc pl-6 mb-5 space-y-2 marker:text-primary">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node: any, children: React.ReactNode) => (
        <ol className="list-decimal pl-6 mb-5 space-y-2 marker:text-primary">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node: any, children: React.ReactNode) => (
        <li className="text-gray-600">{children}</li>
      ),
      [BLOCKS.QUOTE]: (node: any, children: React.ReactNode) => (
        <blockquote className="border-l-4 border-primary/50 pl-5 my-6 italic text-gray-600">
          {children}
        </blockquote>
      ),
      [BLOCKS.HR]: () => <hr className="my-8 border-gray-200" />,
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const { file, title } = node.data.target.fields;
        return (
          <figure className="my-6">
            <img
              src={`https:${file.url}`}
              alt={title || ''}
              className="w-full rounded-xl"
            />
            {title && (
              <figcaption className="text-center text-sm text-gray-500 mt-2">
                {title}
              </figcaption>
            )}
          </figure>
        );
      },
      [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => (
        <a
          href={node.data.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {children}
        </a>
      ),
    },
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      <Navbar />
      
      {post && <ReadingProgressBar />}

      <main className="container mx-auto px-4 pt-32 pb-20">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-200 border-t-primary"></div>
          </div>
        ) : error === 'notFound' ? (
          <div className="max-w-md mx-auto text-center py-20">
            <h1 className="text-7xl font-bold text-gray-200 mb-4">404</h1>
            <p className="text-gray-600 mb-8">{t('blog.postNotFound')}</p>
            <button
              onClick={() => navigate('/blog')}
              className="cta-button inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('blog.backToBlog')}
            </button>
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto text-center py-20">
            <p className="text-gray-600">{t('blog.error')}</p>
          </div>
        ) : post ? (
          <article className="max-w-2xl mx-auto">
            {/* Back button */}
            <ScrollAnimate animation="fadeIn">
              <button
                onClick={() => navigate('/blog')}
                className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8 text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('blog.backToBlog')}
              </button>
            </ScrollAnimate>

            {/* Header */}
            <ScrollAnimate animation="fadeUp" delay={100}>
              <header className="mb-8">
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-3 py-1 bg-gray-100 text-gray-600 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-5 leading-tight">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.publishedAt)}
                </span>
                {post.author && (
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {getReadingTime(post.body)} {t('blog.minRead')}
                </span>
              </div>

              {/* Cover Image */}
              {post.coverImageUrl && (
                <div className="relative rounded-2xl overflow-hidden mb-8">
                  <img
                    src={post.coverImageUrl}
                    alt={post.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              {/* Excerpt */}
              <p className="text-lg text-gray-600 leading-relaxed">
                {post.excerpt}
              </p>
            </header>
            </ScrollAnimate>

            {/* Body */}
            <ScrollAnimate animation="fadeUp" delay={200}>
              <div className="prose max-w-none">
                {post.body && documentToReactComponents(post.body, richTextOptions)}
              </div>
            </ScrollAnimate>

            {/* Share Footer */}
            <ScrollAnimate animation="fadeUp" delay={300}>
              <footer className="mt-10 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <button
                  onClick={() => navigate('/blog')}
                  className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t('blog.backToBlog')}
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-sm mr-1">{t('blog.share')}:</span>
                  <button
                    onClick={shareTwitter}
                    className="w-9 h-9 rounded-xl bg-gray-100 border border-gray-200 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-all"
                    title="Twitter"
                  >
                    <TwitterIcon />
                  </button>
                  <button
                    onClick={shareLinkedIn}
                    className="w-9 h-9 rounded-xl bg-gray-100 border border-gray-200 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-all"
                    title="LinkedIn"
                  >
                    <LinkedInIcon />
                  </button>
                  <button
                    onClick={shareWhatsApp}
                    className="w-9 h-9 rounded-xl bg-gray-100 border border-gray-200 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-all"
                    title="WhatsApp"
                  >
                    <WhatsAppIcon />
                  </button>
                  <button
                    onClick={copyLink}
                    className="w-9 h-9 rounded-xl bg-gray-100 border border-gray-200 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-all"
                    title={t('blog.copyLink')}
                  >
                    {copied ? <Check className="w-4 h-4 text-primary" /> : <Link2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </footer>
            </ScrollAnimate>

            {/* Related Posts */}
            <RelatedPosts currentPostId={post.id} t={t} formatDate={formatDate} />
          </article>
        ) : null}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default BlogPostPage;
