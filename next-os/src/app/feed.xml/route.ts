import RSS from 'rss';
import { blogPosts } from '../../lib/data';

export async function GET() {
  const feed = new RSS({
    title: "Rajat Dua — Engineering Blog",
    description: "Technical essays exploring local-first machine learning, minimal UX architectures, and system setups.",
    feed_url: "https://rajatdua.com/feed.xml",
    site_url: "https://rajatdua.com",
    language: "en",
  });

  blogPosts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.summary,
      url: `https://rajatdua.com/blog/${post.slug}`,
      guid: post.slug,
      date: new Date(post.date),
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
