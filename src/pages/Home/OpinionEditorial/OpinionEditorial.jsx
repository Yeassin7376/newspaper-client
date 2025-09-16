import React from "react";

const OpinionEditorial = () => {
  // Demo Data - later fetch from DB or API
  const editor = {
    name: "Jane Doe",
    bio: "Senior Political Analyst & Columnist. Writing about society, democracy, and global issues for 10+ years.",
    photo: "https://i.ibb.co.com/mFqQkc6d/Gemini-Generated-Image-i239vii239vii239.png",
    latestArticle: {
      title: "Why Democracy Needs More than Just Elections",
      link: "/articles/opinion/why-democracy-needs-more-than-just-elections"
    }
  };

  return (
    <section className="">
        <h2 className="text-3xl font-bold mb-10">
          Opinion & Editorial
        </h2>
      <div className="container mx-auto px-6 bg-base-200 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left side - Image */}
          <div className="flex justify-center">
            <img
              src={editor.photo}
              alt={editor.name}
              className="rounded-lg shadow-lg w-80 h-96 object-cover"
            />
          </div>

          {/* Right side - Content */}
          <div>
            <h3 className="text-2xl font-semibold">{editor.name}</h3>
            <p className="mt-3 text-gray-600">{editor.bio}</p>

            <div className="mt-6 p-4 border-l-4 border-primary bg-base-100 shadow">
              <h4 className="text-lg font-bold mb-2">Latest Opinion</h4>
              <p className="text-gray-700 mb-4">{editor.latestArticle.title}</p>
              <a
                href={editor.latestArticle.link}
                className="btn btn-sm btn-primary"
              >
                Read Full Article
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpinionEditorial;
