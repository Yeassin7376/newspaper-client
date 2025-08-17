// src/pages/AboutUs/AboutUs.jsx

import React from "react";

const AboutUs = () => {
  return (
    <div className=" py-12">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>

      {/* Intro */}
      <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12">
        Welcome to <span className="font-semibold">Newspaper</span> — your
        trusted digital news platform. We are committed to bringing you the
        latest updates, in-depth analysis, and thought-provoking stories from
        around the globe. Our team of passionate journalists, editors, and
        creators work tirelessly to ensure that our readers receive information
        that is not only accurate but also meaningful.
      </p>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="p-6 rounded-2xl shadow bg-base-200 ">
          <h2 className="text-2xl dark:text-white font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Our mission is to empower people through knowledge. We believe that
            well-informed citizens are the foundation of a strong and fair
            society. That’s why we prioritize quality reporting, balanced
            perspectives, and easy accessibility for all.
          </p>
        </div>

        <div className="p-6 rounded-2xl shadow bg-base-200">
          <h2 className="text-2xl dark:text-white font-semibold mb-4">Our Vision</h2>
          <p className="text-gray-600 dark:text-gray-300">
            We envision a world where digital journalism connects communities,
            inspires conversations, and sparks positive change. We aim to be a
            global leader in online news, using modern tools and responsible
            storytelling to build trust with our readers.
          </p>
        </div>
      </div>

      {/* Our History */}
      <div className="p-6 rounded-2xl shadow bg-base-200 mb-12">
        <h2 className="text-2xl dark:text-white font-semibold mb-4">Our History</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Founded in 2025, <span className="font-semibold">Newspaper</span>{" "}
          started as a small online news blog, created by a group of students
          who wanted to share independent and unbiased stories. Over the years,
          we have grown into a professional news platform with thousands of
          daily readers. From local issues to international headlines, our
          coverage has expanded to reflect the voices and concerns of a global
          audience.
        </p>
      </div>

      {/* Editorial Policy */}
      <div className="p-6 rounded-2xl shadow bg-base-200 mb-12">
        <h2 className="text-2xl dark:text-white font-semibold mb-4">Editorial Policy</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          At <span className="font-semibold">Newspaper</span>, we follow strict
          editorial guidelines to maintain transparency, credibility, and
          fairness:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
          <li>Fact-checking every report before publication</li>
          <li>Maintaining neutrality and avoiding political bias</li>
          <li>Giving equal importance to diverse opinions</li>
          <li>Protecting reader privacy and respecting sources</li>
        </ul>
      </div>

      {/* Our Team */}
      <div className="p-6 rounded-2xl bg-base-100 mb-12">
        <h2 className="text-2xl dark:text-white font-semibold mb-4 text-center">Meet Our Team</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
          Behind every article, there is a team of talented professionals who
          make it possible.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
          <div className="p-4 shadow rounded-xl bg-base-200">
            <img
              src="https://i.ibb.co.com/4nf5MvhW/Attack-On-Titan-Discord.jpg"
              alt="Editor in Chief"
              className="mx-auto w-56 h-56 object-cover rounded-full mb-4"
            />
            <h3 className="font-semibold dark:text-white text-lg">Eren Yeager</h3>
            <p className="text-gray-600 dark:text-gray-300">Editor-in-Chief</p>
          </div>
          <div className="p-4 shadow rounded-xl bg-base-200">
            <img
              src="https://i.ibb.co.com/LK6zLyf/download-10.jpg"
              alt="Senior Journalist"
              className="mx-auto w-56 h-56 object-cover rounded-full mb-4"
            />
            <h3 className="font-semibold dark:text-white text-lg">Madara Uchiha</h3>
            <p className="text-gray-600 dark:text-gray-300">Senior Journalist</p>
          </div>
          <div className="p-4 shadow rounded-xl bg-base-200">
            <img
              src="https://i.ibb.co.com/YTbcJfB3/image.png"
              alt="Tech Writer"
              className="mx-auto w-56 h-56 object-cover rounded-full mb-4"
            />
            <h3 className="font-semibold dark:text-white text-lg">David Lee</h3>
            <p className="text-gray-600 dark:text-gray-300">Levi Ackerman</p>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="p-6 rounded-2xl shadow bg-base-200 mb-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          We value your feedback and contributions. Reach out to us for
          inquiries, story submissions, or collaborations.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          📧 Email:{" "}
          <a href="mailto:contact@newspaper.com" className="text-blue-600">
            contact@newspaper.com
          </a>
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          📍 Location: Dhaka, Bangladesh
        </p>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Join Our Journey</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Whether you are a reader, a writer, or a supporter, we welcome you to
          be part of our story. Together, we can build a community that values
          truth, knowledge, and positive change.
        </p>
        <a
          href="/subscription"
          className="btn btn-primary text-white px-6"
        >
          Subscribe Now
        </a>
      </div>
    </div>
  );
};

export default AboutUs;
