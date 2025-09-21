import React from "react";

const PhotoOfTheDay = () => {
  // Demo data – later you can fetch from backend (e.g., /photo-of-the-day)
  const photo = {
    url: "https://i.ibb.co.com/B5ZLLLS0/image.png",
    caption: "Sunrise over the mountains",
    credit: "Photo by John Doe / Unsplash",
  };

  return (
    <section className="my-12">
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg shadow-lg">
        <img
          src={photo.url}
          alt={photo.caption}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-4">
          <p className="text-lg md:text-xl font-semibold">{photo.caption}</p>
          <p className="text-sm opacity-80">{photo.credit}</p>
        </div>
      </div>
    </section>
  );
};

export default PhotoOfTheDay;
