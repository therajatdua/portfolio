import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaYoutube, FaInstagram, FaTwitter, FaPlay } from 'react-icons/fa';
import aboutImg from '../../img/about-me.png';
import CardTilt from '../../components/CardTilt';
import ImageReveal from '../../components/ImageReveal';
import { techChannel, dailyChannel, marqueeKeywords } from '../../content/socialContent';

// TODO: replace with real video data — title, thumbnail, url, date
const latestVideos = [
  {
    title: "Video Title Placeholder 1 (Latest Video)",
    thumbnailUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://youtube.com/watch?v=placeholder-1",
    publishedAt: "July 28, 2026",
    isLatest: true
  },
  {
    title: "Video Title Placeholder 2",
    thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://youtube.com/watch?v=placeholder-2",
    publishedAt: "July 14, 2026",
    isLatest: false
  },
  {
    title: "Video Title Placeholder 3",
    thumbnailUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://youtube.com/watch?v=placeholder-3",
    publishedAt: "June 30, 2026",
    isLatest: false
  },
  {
    title: "Video Title Placeholder 4",
    thumbnailUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://youtube.com/watch?v=placeholder-4",
    publishedAt: "June 18, 2026",
    isLatest: false
  }
];

export default function Social() {
  const [marqueeHovered, setMarqueeHovered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Set up liveData state checking cache as initial value
  const [liveData, setLiveData] = useState(() => {
    try {
      const cache = localStorage.getItem('youtube_cache');
      return cache ? JSON.parse(cache) : null;
    } catch {
      return null;
    }
  });

  // On mount, query the serverless endpoint
  useEffect(() => {
    let active = true;
    
    const fetchYouTube = async () => {
      try {
        const res = await fetch('/api/youtube');
        if (!res.ok) {
          throw new Error(`API returned status ${res.status}`);
        }
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        
        if (active) {
          setLiveData(data);
          setLoading(false);
          try {
            localStorage.setItem('youtube_cache', JSON.stringify(data));
          } catch (storageErr) {
            console.warn("Storage write failed:", storageErr);
          }
        }
      } catch (err) {
        console.error("Failed fetching live YouTube updates:", err);
        if (active) {
          setLoading(false);
          if (!liveData) {
            setError(true);
          }
        }
      }
    };

    fetchYouTube();
    
    return () => {
      active = false;
    };
  }, []);

  const processSteps = [
    { num: '01', title: 'Storyboarding & Notion Spec', desc: 'Detailing script flows, planning visual layouts, and reviewing source code targets.' },
    { num: '02', title: 'Multi-Cam Capture log', desc: 'Recording talk shows using Sony FX30 Log-C and compiling screen captures.' },
    { num: '03', title: 'DaVinci Cut & Render', desc: 'Syncing mechanical soundscapes, editing templates, and exporting at 80Mbps.' }
  ];

  // Resolve subscriber, videos and status variables
  const currentTechVideos = liveData?.techChannel?.videoCount || techChannel.stats.videos;
  const currentTechSubs = liveData?.techChannel?.subscriberCount 
    ? `${liveData.techChannel.subscriberCount.toLocaleString()} Subscribers` 
    : `${techChannel.stats.subscribers} Subscribers`;
  
  const currentDailyVideos = liveData?.dailyChannel?.videoCount || dailyChannel.stats.videos;
  const currentDailySubs = liveData?.dailyChannel?.subscriberCount 
    ? `${liveData.dailyChannel.subscriberCount.toLocaleString()} Subscribers` 
    : `${dailyChannel.stats.subscribers} Subscribers`;

  const stats = [
    { 
      label: 'TECH CHANNEL', 
      primaryValue: currentTechVideos, 
      primaryLabel: 'Videos',
      secondaryValue: currentTechSubs,
      status: techChannel.stats.status
    },
    { 
      label: 'VLOG CHANNEL', 
      primaryValue: currentDailyVideos, 
      primaryLabel: 'Videos',
      secondaryValue: currentDailySubs,
      status: dailyChannel.stats.status
    },
    { 
      label: 'TOTAL CREATION', 
      primaryValue: currentTechVideos + currentDailyVideos, 
      primaryLabel: 'Total Videos',
      secondaryValue: liveData 
        ? `${(liveData.techChannel.subscriberCount + liveData.dailyChannel.subscriberCount).toLocaleString()} Subscribers`
        : 'Active creators subscriber pipeline',
      status: 'Active creator pipeline'
    }
  ];

  // Map live dynamic videos payload matching specifications
  const getVideosToRender = () => {
    if (!liveData) return [];
    
    return [
      {
        id: liveData.techChannel.latestVideo.id,
        title: liveData.techChannel.latestVideo.title || "Latest Tech Episode",
        thumbnailUrl: liveData.techChannel.latestVideo.thumbnailUrl,
        infoLabel: "LATEST TECH UPLOAD",
        metaDetail: liveData.techChannel.latestVideo.publishedAt 
          ? new Date(liveData.techChannel.latestVideo.publishedAt).toLocaleDateString()
          : "",
        isLatest: true
      },
      {
        id: liveData.techChannel.popularVideo.id,
        title: liveData.techChannel.popularVideo.title || "Popular Tech Video",
        thumbnailUrl: liveData.techChannel.popularVideo.thumbnailUrl,
        infoLabel: "POPULAR TECH UPLOAD",
        metaDetail: liveData.techChannel.popularVideo.viewCount 
          ? `${liveData.techChannel.popularVideo.viewCount.toLocaleString()} Views` 
          : "",
        isLatest: false
      },
      {
        id: liveData.dailyChannel.latestVideo.id,
        title: liveData.dailyChannel.latestVideo.title || "Latest Daily Vlog",
        thumbnailUrl: liveData.dailyChannel.latestVideo.thumbnailUrl,
        infoLabel: "LATEST DAILY VLOG",
        metaDetail: liveData.dailyChannel.latestVideo.publishedAt
          ? new Date(liveData.dailyChannel.latestVideo.publishedAt).toLocaleDateString()
          : "",
        isLatest: false
      },
      {
        id: liveData.dailyChannel.popularVideo.id,
        title: liveData.dailyChannel.popularVideo.title || "Popular Daily Vlog",
        thumbnailUrl: liveData.dailyChannel.popularVideo.thumbnailUrl,
        infoLabel: "POPULAR DAILY VLOG",
        metaDetail: liveData.dailyChannel.popularVideo.viewCount 
          ? `${liveData.dailyChannel.popularVideo.viewCount.toLocaleString()} Views` 
          : "",
        isLatest: false
      }
    ];
  };

  const videosList = getVideosToRender();

  return (
    <div className="bg-themeBg text-themeText min-h-screen pb-24 relative overflow-hidden font-sans w-full">
      
      {/* Cinematic Hero */}
      <section className="pt-32 pb-16 site-max px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        {/* Text */}
        <div className="lg:col-span-8 space-y-6 w-full text-left">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-widest text-brandAccent uppercase font-bold">
            <span>● CREATOR VAULT</span>
          </div>
          
          <h1 className="text-[clamp(2.5rem,8.5vw,4.5rem)] font-extrabold tracking-tight leading-[0.95] font-serif italic text-themeText">
            Rajat Dua
          </h1>
          
          <p className="text-[clamp(1.25rem,4.5vw,1.75rem)] font-serif italic text-themeTextMuted tracking-tight leading-relaxed max-w-2xl">
            "Documenting the process of engineering products and sharing workflow scripts."
          </p>
        </div>

        {/* Circular portrait avatar */}
        <div className="lg:col-span-4 flex justify-center w-full">
          <div className="w-full max-w-[180px] md:max-w-[220px] aspect-square rounded-full border border-themeBorder overflow-hidden bg-themeCardBg shadow-xl relative">
            <img
              src={aboutImg}
              alt="Rajat Dua Circular Portrait"
              className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition duration-300"
            />
          </div>
        </div>
      </section>

      {/* Monospace Statistics Grid (Reweighted: video count is primary) */}
      <section className="border-y border-themeBorder bg-themeCardBg/40 font-mono w-full">
        <div className="site-max px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-themeBorder text-center py-8">
          {stats.map((s, idx) => (
            <div key={idx} className="space-y-2 py-4 md:py-0 px-4 text-center">
              <span className="text-[10px] uppercase tracking-wider text-themeTextMuted block font-bold">{s.label}</span>
              
              <span className="text-4xl font-extrabold text-themeText block">
                {s.primaryValue} <span className="text-xs text-brandAccent font-semibold">{s.primaryLabel}</span>
              </span>
              
              <div className="space-y-1">
                <span className="text-xs text-themeTextMuted block font-medium">{s.secondaryValue}</span>
                <span className="text-[10px] text-themeTextMuted block font-normal italic opacity-85">{s.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dual Channel Cards */}
      <section className="py-20 site-max px-6 md:px-12 space-y-12 w-full text-left">
        <h2 className="text-2xl font-bold tracking-tight text-themeText font-serif italic border-b border-themeBorder pb-2">
          YouTube Channels
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {/* Tech Channel Card */}
          <a
            href={techChannel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-full"
          >
            <CardTilt className="h-full">
              <div className="p-8 bg-themeCardBg border border-themeBorder hover:border-brandAccent/40 rounded-2xl shadow-xs transition-colors duration-250 flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold text-themeText group-hover:text-brandAccent transition-colors">
                        {techChannel.name}
                      </h3>
                      <p className="text-[11px] font-mono text-themeTextMuted font-semibold mt-0.5">{techChannel.handle}</p>
                    </div>
                    <span className="text-red-500"><FaYoutube size={22} /></span>
                  </div>
                  
                  <p className="text-sm font-semibold text-themeText italic">
                    "{techChannel.tagline}"
                  </p>
                  
                  <p className="text-xs text-themeTextMuted leading-relaxed font-normal">
                    {techChannel.bio}
                  </p>
                  
                  <div className="pt-2">
                    <p className="text-[10px] uppercase font-bold text-themeTextMuted tracking-wider">Target Audience</p>
                    <p className="text-xs text-themeTextMuted mt-1 leading-normal font-normal">{techChannel.audience}</p>
                  </div>
                  
                  {/* Content Pillars */}
                  <div className="pt-2 space-y-2">
                    <p className="text-[10px] uppercase font-bold text-themeTextMuted tracking-wider">Content Focus Areas</p>
                    <ul className="space-y-1.5 list-none pl-0">
                      {techChannel.pillars.map((pillar, i) => (
                        <li key={i} className="text-xs flex gap-2 items-start text-themeTextMuted leading-snug">
                          <span className="text-brandAccent mt-1 flex-shrink-0">✦</span>
                          <div>
                            <strong className="text-themeText font-bold">{pillar.title}: </strong>
                            <span className="font-normal">{pillar.description}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="text-xs font-semibold text-brandAccent inline-flex items-center gap-1">
                  <span>Visit Tech Channel</span>
                  <span>→</span>
                </div>
              </div>
            </CardTilt>
          </a>

          {/* Daily Channel Card */}
          <a
            href={dailyChannel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-full"
          >
            <CardTilt className="h-full">
              <div className="p-8 bg-themeCardBg border border-themeBorder hover:border-brandAccent/40 rounded-2xl shadow-xs transition-colors duration-250 flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold text-themeText group-hover:text-brandAccent transition-colors">
                        {dailyChannel.name}
                      </h3>
                      <p className="text-[11px] font-mono text-themeTextMuted font-semibold mt-0.5">{dailyChannel.handle}</p>
                    </div>
                    <span className="text-red-500"><FaYoutube size={22} /></span>
                  </div>
                  
                  <p className="text-sm font-semibold text-themeText italic">
                    "{dailyChannel.tagline}"
                  </p>
                  
                  <p className="text-xs text-themeTextMuted leading-relaxed font-normal">
                    {dailyChannel.bio}
                  </p>
                  
                  <div className="pt-2">
                    <p className="text-[10px] uppercase font-bold text-themeTextMuted tracking-wider">Target Audience</p>
                    <p className="text-xs text-themeTextMuted mt-1 leading-normal font-normal">{dailyChannel.audience}</p>
                  </div>
                  
                  {/* Content Pillars */}
                  <div className="pt-2 space-y-2">
                    <p className="text-[10px] uppercase font-bold text-themeTextMuted tracking-wider">Content Focus Areas</p>
                    <ul className="space-y-1.5 list-none pl-0">
                      {dailyChannel.pillars.map((pillar, i) => (
                        <li key={i} className="text-xs flex gap-2 items-start text-zinc-450 leading-snug">
                          <span className="text-brandAccent mt-1 flex-shrink-0">✦</span>
                          <div>
                            <strong className="text-themeText font-bold">{pillar.title}: </strong>
                            <span className="font-normal">{pillar.description}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="text-xs font-semibold text-brandAccent inline-flex items-center gap-1">
                  <span>Visit Daily Channel</span>
                  <span>→</span>
                </div>
              </div>
            </CardTilt>
          </a>
        </div>
      </section>

      {/* Tilted Marquee Keyword Ticker (Speeds up on hover) */}
      <section 
        className="py-10 bg-themeCardBg/20 border-y border-themeBorder transform rotate-0 md:-rotate-1 scale-102 overflow-hidden my-12 cursor-pointer w-full"
        onMouseEnter={() => setMarqueeHovered(true)}
        onMouseLeave={() => setMarqueeHovered(false)}
      >
        <div 
          className="animate-marquee whitespace-nowrap flex gap-12 text-[clamp(11px,3.5vw,13px)] font-bold font-mono tracking-widest text-themeTextMuted"
          style={{ 
            animationDuration: marqueeHovered ? '10s' : '20s',
            transition: 'animation-duration 300ms ease'
          }}
        >
          {[...marqueeKeywords, ...marqueeKeywords].map((word, i) => (
            <span key={i} className="flex items-center gap-4">
              <span>{word}</span>
              <span className="text-brandAccent">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-20 site-max px-6 md:px-12 space-y-12 w-full text-left">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-themeText tracking-tight font-serif italic">Latest Broadcasts</h2>
          <p className="text-sm text-themeTextMuted mt-2">Dynamic feeds mapped live from YouTube Data API v3.</p>
        </div>

        {/* Loading Skeleton */}
        {loading && !liveData && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-pulse w-full">
            <div className="lg:col-span-8 bg-themeCardBg border border-themeBorder rounded-2xl h-[340px] md:h-[420px]" />
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-themeCardBg border border-themeBorder rounded-2xl h-[180px]" />
              <div className="bg-themeCardBg border border-themeBorder rounded-2xl h-[180px]" />
            </div>
          </div>
        )}

        {/* Failure State */}
        {error && !liveData && (
          <div className="p-8 text-center border border-dashed border-themeBorder rounded-xl w-full">
            <p className="text-sm text-themeTextMuted">Couldn't load latest videos. Please check back later.</p>
          </div>
        )}

        {/* Render Live Data (or cache data if loaded) */}
        {liveData && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
            
            {/* Featured Video (Tech Latest - spans 8 columns) */}
            {videosList.filter(v => v.isLatest).map((vid, idx) => (
              <div key={idx} className="lg:col-span-8 w-full">
                <a href={vid.id ? `https://www.youtube.com/watch?v=${vid.id}` : '#'} target="_blank" rel="noopener noreferrer" className="group block space-y-4">
                  <CardTilt>
                    <div className="bg-themeCardBg border border-themeBorder hover:border-brandAccent/40 p-5 rounded-2xl shadow-xs transition-colors duration-250 w-full">
                      {vid.thumbnailUrl ? (
                        <ImageReveal
                          src={vid.thumbnailUrl}
                          alt={vid.title}
                          className="aspect-[16/9] w-full rounded-xl"
                        />
                      ) : (
                        <div className="aspect-[16/9] w-full bg-themeBg rounded-xl flex items-center justify-center text-4xl">🎬</div>
                      )}
                      
                      <div className="pt-4 flex justify-between items-start gap-4 flex-wrap text-left">
                        <div className="space-y-1.5 max-w-xl">
                          <span className="text-[10px] font-mono tracking-wider font-bold text-brandAccent uppercase bg-brandAccent/10 px-2.5 py-0.5 rounded">
                            {vid.infoLabel}
                          </span>
                          <h3 className="text-xl md:text-2xl font-bold text-themeText group-hover:text-brandAccent transition-colors line-clamp-2">
                            {vid.title}
                          </h3>
                        </div>
                        <span className="text-[11px] font-mono text-themeTextMuted shrink-0 font-semibold">{vid.metaDetail}</span>
                      </div>
                    </div>
                  </CardTilt>
                </a>
              </div>
            ))}

            {/* Compact grid columns (Other 3 videos - spans 4 columns) */}
            <div className="lg:col-span-4 space-y-8 w-full">
              {videosList.filter(v => !v.isLatest).map((vid, idx) => (
                <a
                  key={idx}
                  href={vid.id ? `https://www.youtube.com/watch?v=${vid.id}` : '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block space-y-3 w-full"
                >
                  <CardTilt>
                    <div className="bg-themeCardBg border border-themeBorder hover:border-brandAccent/40 p-4 rounded-2xl shadow-xs transition-colors duration-250 w-full">
                      {vid.thumbnailUrl ? (
                        <ImageReveal
                          src={vid.thumbnailUrl}
                          alt={vid.title}
                          className="aspect-[16/9] w-full rounded-lg"
                        />
                      ) : (
                        <div className="aspect-[16/9] w-full bg-themeBg rounded-lg flex items-center justify-center text-2xl">🎬</div>
                      )}
                      <div className="pt-3 space-y-1 text-left">
                        <div className="flex justify-between items-center text-[10px] font-mono text-themeTextMuted">
                          <span className="text-brandAccent uppercase font-bold">{vid.infoLabel}</span>
                          <span className="font-semibold">{vid.metaDetail}</span>
                        </div>
                        <h4 className="text-[14px] font-bold text-themeText group-hover:text-brandAccent transition-colors leading-snug line-clamp-2 pt-1">
                          {vid.title}
                        </h4>
                      </div>
                    </div>
                  </CardTilt>
                </a>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Editing Workflow list */}
      <section className="py-20 site-max px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-themeBorder w-full text-left">
        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-themeText tracking-tight font-serif italic">Video Production</h2>
          <p className="text-sm md:text-base text-themeTextMuted leading-relaxed font-normal">
            Storytelling structures built from script specs to dynamic editing processes.
          </p>
        </div>

        <div className="lg:col-span-7 divide-y divide-themeBorder">
          {processSteps.map((step, idx) => (
            <div key={idx} className="py-6 first:pt-0 last:pb-0 flex gap-6 items-start">
              <span className="font-mono text-xl font-bold text-brandAccent">{step.num}</span>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-themeText">{step.title}</h4>
                <p className="text-sm text-themeTextMuted leading-relaxed font-normal">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="py-16 border-t border-themeBorder bg-themeCardBg/10 w-full text-center">
        <div className="site-max px-6 md:px-12 text-center max-w-xl space-y-6 mx-auto">
          <h3 className="text-xl md:text-2xl font-extrabold text-themeText tracking-tight font-serif italic">Join the Broadcast</h3>
          <p className="text-sm text-themeTextMuted font-normal leading-relaxed">
            Subscribe for monthly developer logs, desk unboxings, and university vlogs.
          </p>
          <div className="pt-4 flex justify-center gap-4 flex-wrap">
            <a
              href="https://youtube.com/@therajatdua"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-red-650 text-white font-semibold text-sm rounded-sm hover:bg-red-750 active:scale-97 transition inline-flex items-center gap-2"
            >
              <FaYoutube size={16} />
              <span>Subscribe on YouTube</span>
            </a>
            <div className="flex gap-2">
              <a href="https://instagram.com/therajatdua" target="_blank" rel="noreferrer" className="p-3 border border-themeBorder bg-themeCardBg rounded text-themeTextMuted hover:text-themeText transition-colors" title="Instagram">
                <FaInstagram size={16} />
              </a>
              <a href="https://twitter.com/therajatdua" target="_blank" rel="noreferrer" className="p-3 border border-themeBorder bg-themeCardBg rounded text-themeTextMuted hover:text-themeText transition-colors" title="X/Twitter">
                <FaTwitter size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
