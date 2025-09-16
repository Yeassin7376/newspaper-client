import React, { useState } from 'react';
import { FaPlay } from 'react-icons/fa';

const VideoHighlightsCarousel = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  // demo data (replace with API later)
  const videos = [
    {
      _id: 1,
      title: 'Breaking News: Market Crash Explained',
      thumbnail: 'https://i.ibb.co.com/7twLWQFW/istockphoto-1485172638-612x612.jpg',
      videoUrl: 'https://www.youtube.com/embed/aqz-KE-bpKQ',
    },
    {
      _id: 2,
      title: 'Tech Talk: AI Revolution in 2025',
      thumbnail: 'https://i.ibb.co.com/XfbG9hc6/download.jpg',
      videoUrl: 'https://www.youtube.com/embed/bTqVqk7FSmY',
    },
    {
      _id: 3,
      title: 'Sports Highlight: Champions League Final',
      thumbnail: 'https://i.ibb.co.com/Txhd1Fz0/p0lf5f03.jpg',
      videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    },
    {
      _id: 4,
      title: 'Global Politics: Leaders Summit Recap',
      thumbnail: 'https://i.ibb.co.com/nqPvdB5k/gettyimages-2202219100-612x612.jpg',
      videoUrl: 'https://www.youtube.com/embed/LXb3EKWsInQ',
    },
  ];

  return (
    <section className="bg-base-100">
        <h2 className="text-3xl font-bold mb-10">🎥 Video Highlights</h2>
      <div className="container mx-auto ">

        {/* Carousel */}
        <div className="carousel rounded-box space-x-6">
          {videos.map((video) => (
            <div key={video._id} className="carousel-item flex flex-col w-80">
              <div className="relative group">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-80 h-48 object-cover rounded-lg shadow-md"
                />
                {/* Play Icon Overlay */}
                <div
                  onClick={() => setSelectedVideo(video)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 cursor-pointer transition"
                >
                  <FaPlay className="text-white text-4xl" />
                </div>
              </div>
              {/* Title below video */}
              <p className="mt-3 text-center font-semibold text-base">{video.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-base-100 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 relative">
            <button
              className="absolute top-2 right-2 btn btn-sm btn-circle"
              onClick={() => setSelectedVideo(null)}
            >
              ✕
            </button>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-96 rounded-lg"
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p className="p-4 text-lg font-semibold">{selectedVideo.title}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoHighlightsCarousel;
