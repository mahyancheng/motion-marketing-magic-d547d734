import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "./Index";
import { Phone, Mail, MapPin, Clock, MessageSquare, CheckCircle } from "lucide-react";
import PhoneInput from '../components/PhoneInput';
import Footer from './Footer'; // adjust path if needed


const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission to your backend
    // For this example, we'll just show a success message
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      // Here you could also reset the form
      const form = e.target as HTMLFormElement;
      form.reset();
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <ContactForm submitted={submitted} onSubmit={handleSubmit} />
      <ContactInfo />
      <Footer />

    </div>

  );
};

// Hero component
const Hero = () => {
  return (
    <div className="pt-24 lg:pt-32 pb-16 lg:pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Get in Touch with <span className="text-yellow-400">LeadZap</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Have questions about our services? Ready to start your marketing journey? Our team of experts is ready to help you achieve your business goals.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// Contact Form component
const ContactForm = ({ submitted, onSubmit }: { submitted: boolean; onSubmit: (e: React.FormEvent) => void }) => {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Send Us a Message</h2>

            {submitted ? (
              <motion.div
                className="bg-green-800/30 border border-green-600 rounded-lg p-6 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Message Sent Successfully!</h3>
                <p className="text-gray-300">Thank you for reaching out. Our team will get back to you shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="
                          w-full bg-gray-800 text-white px-4 py-3 rounded-md
                          border border-gray-700
                          outline-none
                          focus:border-yellow-400/20
                          focus:ring-1 focus:ring-yellow-400 focus:ring-offset-0
                          transition-colors
                        "
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="
                          w-full bg-gray-800 text-white px-4 py-3 rounded-md
                          border border-gray-700
                          outline-none
                          focus:border-yellow-400/20
                          focus:ring-1 focus:ring-yellow-400 focus:ring-offset-0
                          transition-colors
                        "                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <PhoneInput id="phone"
                  required
                  className="
                  w-full bg-gray-800 text-white px-4 py-3 rounded-md
                  border border-gray-700
                  outline-none
                  focus:border-yellow-400/20
                  focus:ring-1 focus:ring-yellow-400 focus:ring-offset-0
                  transition-colors
                "
                />

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">Company Name</label>
                  <input
                    type="text"
                    id="company"
                    className="
                          w-full bg-gray-800 text-white px-4 py-3 rounded-md
                          border border-gray-700
                          outline-none
                          focus:border-yellow-400/20
                          focus:ring-1 focus:ring-yellow-400 focus:ring-offset-0
                          transition-colors
                        "                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-1">Service Interested In</label>
                  <select
                    id="service"
                    className="
                          w-full bg-gray-800 text-white px-4 py-3 rounded-md
                          border border-gray-700
                          outline-none
                          focus:border-yellow-400/20
                          focus:ring-1 focus:ring-yellow-400 focus:ring-offset-0
                          transition-colors
                        "                  >
                    <option value="">Select a Service</option>
                    <option value="seo">SEO</option>
                    <option value="social">Social Media Ads</option>
                    <option value="order">Order Management System</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    className="
                          w-full bg-gray-800 text-white px-4 py-3 rounded-md
                          border border-gray-700
                          outline-none
                          focus:border-yellow-400/20
                          focus:ring-1 focus:ring-yellow-400 focus:ring-offset-0
                          transition-colors
                        "                    placeholder="Tell us about your project or inquiry..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow-400 text-black px-4 py-3 rounded-md font-medium hover:bg-yellow-300 transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Contact Info component
const ContactInfo = () => {
  const contactDetails = [
    {
      icon: <Phone className="h-8 w-8 text-yellow-400" />,
      title: "Phone",
      details: [
        "+1 (555) 123-4567",
        "Mon-Fri: 9AM - 6PM"
      ]
    },
    {
      icon: <Mail className="h-8 w-8 text-yellow-400" />,
      title: "Email",
      details: [
        "info@leadzap.com",
        "support@leadzap.com"
      ]
    },
    {
      icon: <MapPin className="h-8 w-8 text-yellow-400" />,
      title: "Office",
      details: [
        "123 Marketing Street",
        "Suite 456",
        "San Francisco, CA 94103"
      ]
    },
    {
      icon: <Clock className="h-8 w-8 text-yellow-400" />,
      title: "Business Hours",
      details: [
        "Monday-Friday: 9AM - 6PM",
        "Saturday: By appointment",
        "Sunday: Closed"
      ]
    }
  ];

  return (
    <div className="py-16 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Information</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Our team is available to assist you with any questions or inquiries.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {contactDetails.map((item, index) => (
            <motion.div
              key={index}
              className="bg-black p-6 rounded-xl shadow-lg border border-gray-800 text-center hover:border-yellow-400 transition-colors"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-center text-yellow-400">{item.title}</h3>
              <div className="text-gray-300 text-center">
                {item.details.map((detail, detailIndex) => (
                  <p key={detailIndex}>{detail}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="w-full h-80 md:h-96 rounded-xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50470.04181970438!2d-122.43523211165136!3d37.75790247804089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              title="Office Location"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
