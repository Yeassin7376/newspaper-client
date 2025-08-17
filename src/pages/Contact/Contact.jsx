import React, { useRef, useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        'service_bx6o61t', // replace with your Service ID
        'template_ng8ymyv', // replace with your Template ID
        formRef.current,
        'wokqZtiEkpLl9H93L' // replace with your Public Key
      )
      .then(
        () => {
          setLoading(false);
          setSuccess('✅ Message sent successfully!');
          formRef.current.reset();
        },
        (error) => {
          setLoading(false);
          setSuccess('❌ Failed to send message. Try again later.');
          console.error(error.text);
        }
      );
  };

  return (
    <div className="bg-base-100 py-16">
      <div className="max-w-7xl mx-auto bg-base-100 px-6 lg:px-12">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Have questions, feedback, or partnership ideas? We’d love to hear from you. Reach out to us and let’s connect!
          </p>
        </div>

        {/* Contact Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="bg-base-200 p-8 rounded-2xl shadow-lg flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Mail className="text-blue-600 w-6 h-6" />
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Email:</span> contact@newspaper.com
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="text-blue-600 w-6 h-6" />
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Phone:</span> +880 123 456 789
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="text-blue-600 w-6 h-6" />
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Location:</span> Dhaka, Bangladesh
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-base-200 p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
            <form ref={formRef} onSubmit={sendEmail} className="space-y-5">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
                <input type="text" name="name" placeholder="Your Name" className="input input-bordered w-full" required />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input type="email" name="email" placeholder="Your Email" className="input input-bordered w-full" required />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Subject"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea name="message" placeholder="Your Message" className="textarea textarea-bordered w-full" rows="5" required></textarea>
              </div>

              <button type="submit" className="btn btn-primary text-white px-8" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>

              {success && <p className={`mt-3 text-sm ${success.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>{success}</p>}
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="mt-16">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9026041900465!2d90.39945271538535!3d23.75088599462362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8947bb0f8ef%3A0xa9d4d88f3ef0c5d5!2sDhaka%20City!5e0!3m2!1sen!2sbd!4v1693152389436!5m2!1sen!2sbd"
            width="100%"
            height="400"
            allowFullScreen=""
            loading="lazy"
            className="rounded-2xl shadow-lg"></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
