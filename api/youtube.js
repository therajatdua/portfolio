export default async function handler(req, res) {
  // Set Cache-Control for Vercel Edge caching (1 hour)
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing YOUTUBE_API_KEY environment variable on server." });
  }

  const channels = {
    techChannel: "UCXSpYbOKkIx1SFyA-gu9quA",
    dailyChannel: "UCkbk4RAI7BYy3UC_qoTUhwg"
  };

  try {
    const results = {};

    for (const [key, channelId] of Object.entries(channels)) {
      // 1. Fetch channel metadata (subscribers, uploads playlist ID)
      const channelRes = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=contentDetails,statistics&id=${channelId}&key=${apiKey}`
      );
      if (!channelRes.ok) {
        throw new Error(`Failed to fetch channel details for ${channelId}: status ${channelRes.status}`);
      }
      
      const channelData = await channelRes.json();
      if (!channelData.items || channelData.items.length === 0) {
        throw new Error(`Channel details not found for ID: ${channelId}`);
      }

      const item = channelData.items[0];
      const subscriberCount = parseInt(item.statistics.subscriberCount, 10) || 0;
      const videoCount = parseInt(item.statistics.videoCount, 10) || 0;
      const uploadsPlaylistId = item.contentDetails.relatedPlaylists.uploads;

      // Initialize defaults
      let latestVideo = { id: "", title: "", thumbnailUrl: "", publishedAt: "" };
      let popularVideo = { id: "", title: "", thumbnailUrl: "", viewCount: 0 };

      if (uploadsPlaylistId) {
        // 2. Fetch recent uploads (maxResults=15 to evaluate popular video within recent batch)
        const playlistRes = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=15&key=${apiKey}`
        );
        if (playlistRes.ok) {
          const playlistData = await playlistRes.json();
          const playlistItems = playlistData.items || [];

          if (playlistItems.length > 0) {
            // First item is the latest video
            const firstSnippet = playlistItems[0].snippet;
            const latestVideoId = firstSnippet.resourceId.videoId;
            const latestThumb = firstSnippet.thumbnails?.high?.url || 
                               firstSnippet.thumbnails?.medium?.url || 
                               firstSnippet.thumbnails?.default?.url || "";

            latestVideo = {
              id: latestVideoId,
              title: firstSnippet.title,
              thumbnailUrl: latestThumb,
              publishedAt: firstSnippet.publishedAt
            };

            // Collect IDs for statistics lookup to find most popular
            const videoIds = playlistItems.map(vi => vi.snippet.resourceId.videoId).join(',');

            // 3. Fetch view counts for all these videos in a single batch (1 quota unit)
            const videosStatsRes = await fetch(
              `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIds}&key=${apiKey}`
            );
            if (videosStatsRes.ok) {
              const videosStatsData = await videosStatsRes.json();
              const videoItems = videosStatsData.items || [];

              let maxViews = -1;
              let mostPopularItem = null;

              for (const videoItem of videoItems) {
                const views = parseInt(videoItem.statistics.viewCount, 10) || 0;
                if (views > maxViews) {
                  maxViews = views;
                  mostPopularItem = videoItem;
                }
              }

              if (mostPopularItem) {
                const popularThumb = mostPopularItem.snippet.thumbnails?.high?.url || 
                                     mostPopularItem.snippet.thumbnails?.medium?.url || 
                                     mostPopularItem.snippet.thumbnails?.default?.url || "";
                popularVideo = {
                  id: mostPopularItem.id,
                  title: mostPopularItem.snippet.title,
                  thumbnailUrl: popularThumb,
                  viewCount: maxViews
                };
              }
            }
          }
        }
      }

      results[key] = {
        subscriberCount,
        videoCount,
        latestVideo,
        popularVideo
      };
    }

    return res.status(200).json({
      ...results,
      fetchedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error("Serverless YouTube endpoint error:", error);
    return res.status(500).json({ error: error.message || "Failed fetching YouTube channel data." });
  }
}
