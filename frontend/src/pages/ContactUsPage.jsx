import { PhoneIcon } from "lucide-react";
import { useState } from "react";
import EmailIcon from "../icons/EmailIcon";
import LocationIcon from "../icons/LocationIcon";

export const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend server.
    // For this example, we'll just log it and show a success message.
    console.log("Form submitted:", formData);
    setSubmitted(true);
    // Optionally reset form after submission
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  // Google Maps embed URL for a sample dental clinic
  // You can replace '123 Dental Street, Smile City, TX 78901' with your actual address
  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d58170.1157915144!2d91.7066310066406!3d24.32445987493403!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1752331630405!5m2!1sen!2sbd";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-white p-4 sm:p-8">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {" "}
        {/* Added grid layout */}
        {/* Left Section: Contact Info & Slogan */}
        <div className="text-gray-800 p-4 lg:p-8 rounded-2xl bg-blue-50 lg:bg-transparent">
          <h2 className="text-4xl font-extrabold leading-tight mb-4 text-blue-800">
            Let's Connect!
          </h2>
          <p className="text-lg mb-8 text-gray-700">
            We'd love to hear from you. Reach out to us for any inquiries,
            feedback, or collaborations.
          </p>

          <div className="space-y-6 mb-8">
            <div className="flex items-center">
              {/* Phone Icon */}
              <PhoneIcon />
              <span className="text-gray-700 text-lg">+1 (123) 456-7890</span>
            </div>
            <div className="flex items-center">
              {/* Email Icon */}
              <EmailIcon />
              <span className="text-gray-700 text-lg">info@example.com</span>
            </div>
            <div className="flex items-center">
              {/* Location Icon */}
              <LocationIcon />
              <span className="text-gray-700 text-lg">
                123 Dental Street, Smile City, TX 78901
              </span>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="rounded-lg overflow-hidden shadow-inner border border-gray-200">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dental Clinic Location Map"
            ></iframe>
          </div>
        </div>
        {/* Right Section: Contact Form */}
        <div className="w-full">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8 leading-tight lg:hidden">
            Get in Touch
          </h2>{" "}
          {/* Hidden on large screens, shown on small */}
          {submitted ? (
            <div className="text-center text-green-600 text-xl font-semibold p-6 bg-green-50 rounded-lg">
              <p className="mb-2">Thank you for your message!</p>
              <p>We'll get back to you soon.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Regarding your services..."
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-y"
                  placeholder="Your message here..."
                  required
                ></textarea>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Send Message
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
