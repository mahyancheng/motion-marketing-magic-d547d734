import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "./Index";
import { Phone, Mail, CheckCircle, ChevronDown, X } from "lucide-react";
import PhoneInput from "../components/PhoneInput";
import Footer from "./Footer";

const serviceLabels: Record<string, string> = {
  "": "Select a Service",
  seo: "SEO",
  social: "Social Media Ads",
  order: "Order Management System",
  other: "Other",
};

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleServiceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, service: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTY0MDYzMzA0MzA1MjZmNTUzNTUxMzQi_pc",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        setSubmitted(true);
        console.log("✅ Data sent successfully to Pabbly!");
      } else {
        console.error("❌ Failed to send data to Pabbly");
      }
    } catch (err) {
      console.error("❌ Error sending data to Pabbly:", err);
    }

    // Reset after 3s
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <ContactForm
        submitted={submitted}
        onSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
        handlePhoneChange={handlePhoneChange}
        handleServiceChange={handleServiceChange}
      />
      <ContactInfo />
      <Footer />
    </div>
  );
};

// ✅ Hero Section
const Hero = () => (
  <div className="pt-24 lg:pt-32 pb-8 lg:pb-10">
    <div className="container mx-auto px-4 md:px-6">
      <motion.div
        className="text-center max-w-3xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Contact <span className="text-yellow-400">Top Digital Marketing Agency Malaysia</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Get free SEO analysis Malaysia, social media marketing Malaysia consultation, or Google Ads agency Malaysia pricing. Our digital marketing Kuala Lumpur experts are ready to help.
        </p>
      </motion.div>
    </div>
  </div>
);

// ✅ Contact Form
const ContactForm = ({
  submitted,
  onSubmit,
  formData,
  handleChange,
  handlePhoneChange,
  handleServiceChange,
}: {
  submitted: boolean;
  onSubmit: (e: React.FormEvent) => void;
  formData: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  handlePhoneChange: (value: string) => void;
  handleServiceChange: (value: string) => void;
}) => {
  const [isServicePickerOpen, setIsServicePickerOpen] = useState(false);

  const handleMobileServiceSelect = (value: string) => {
    handleServiceChange(value);
    setIsServicePickerOpen(false);
  };

  return (
    <div className="py-6 md:py-10">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="max-w-xl md:max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl bg-black"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="p-6 md:p-10">
            <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6">
              Send Us a Message
            </h2>

            {submitted ? (
              <motion.div
                className="bg-green-800/30 border border-green-600 rounded-lg p-6 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-gray-300 text-sm md:text-base">
                  Thank you for reaching out. Our team will get back to you
                  shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5 md:space-y-6">
                {/* Name / Email */}
                <div className="grid gap-4 md:grid-cols-2 md:gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs md:text-sm font-medium text-gray-300 mb-1"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-gray-800 text-white px-3 md:px-4 py-2.5 md:py-3 rounded-md border border-gray-700 outline-none focus:border-yellow-400/20 focus:ring-1 focus:ring-yellow-400 transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs md:text-sm font-medium text-gray-300 mb-1"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-gray-800 text-white px-3 md:px-4 py-2.5 md:py-3 rounded-md border border-gray-700 outline-none focus:border-yellow-400/20 focus:ring-1 focus:ring-yellow-400 transition-colors text-sm"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs md:text-sm font-medium text-gray-300 mb-1"
                  >
                    Phone Number
                  </label>
                  <div className="w-full bg-gray-800 rounded-md border border-gray-700 px-2 py-1.5">
                    <PhoneInput value={formData.phone} onChange={handlePhoneChange} />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label
                    htmlFor="company"
                    className="block text-xs md:text-sm font-medium text-gray-300 mb-1"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Company"
                    className="w-full bg-gray-800 text-white px-3 md:px-4 py-2.5 md:py-3 rounded-md border border-gray-700 outline-none focus:border-yellow-400/20 focus:ring-1 focus:ring-yellow-400 transition-colors text-sm"
                  />
                </div>

                {/* Service Interested In */}
                {/* Mobile: bottom sheet trigger */}
                <div className="md:hidden">
                  <label
                    htmlFor="service"
                    className="block text-xs md:text-sm font-medium text-gray-300 mb-1"
                  >
                    Service Interested In
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsServicePickerOpen(true)}
                    className="w-full bg-gray-800 text-white px-3 py-2.5 rounded-md border border-gray-700 flex items-center justify-between text-sm outline-none focus:border-yellow-400/20 focus:ring-1 focus:ring-yellow-400 transition-colors"
                  >
                    <span>
                      {serviceLabels[formData.service] ?? "Select a Service"}
                    </span>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </button>
                </div>

                {/* Desktop: normal select */}
                <div className="hidden md:block">
                  <label
                    htmlFor="service"
                    className="block text-xs md:text-sm font-medium text-gray-300 mb-1"
                  >
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-md border border-gray-700 outline-none focus:border-yellow-400/20 focus:ring-1 focus:ring-yellow-400 transition-colors text-sm md:text-base"
                  >
                    <option value="">Select a Service</option>
                    <option value="seo">SEO</option>
                    <option value="social">Social Media Ads</option>
                    <option value="order">Order Management System</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs md:text-sm font-medium text-gray-300 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project or inquiry..."
                    className="w-full bg-gray-800 text-white px-3 md:px-4 py-2.5 md:py-3 rounded-md border border-gray-700 outline-none focus:border-yellow-400/20 focus:ring-1 focus:ring-yellow-400 transition-colors text-sm"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow-400 text-black px-4 py-3 rounded-md font-medium hover:bg-yellow-300 transition-colors text-sm md:text-base"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>

      {/* Mobile Service Picker Bottom Sheet */}
      {isServicePickerOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 md:hidden">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className="w-full max-w-md bg-gray-900 rounded-t-2xl p-4 pb-6"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold text-white">
                Select a Service
              </h3>
              <button
                type="button"
                className="text-gray-400"
                onClick={() => setIsServicePickerOpen(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleMobileServiceSelect("seo")}
                className="w-full text-left px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-sm text-white"
              >
                SEO
              </button>
              <button
                type="button"
                onClick={() => handleMobileServiceSelect("social")}
                className="w-full text-left px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-sm text-white"
              >
                Social Media Ads
              </button>
              <button
                type="button"
                onClick={() => handleMobileServiceSelect("order")}
                className="w-full text-left px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-sm text-white"
              >
                Order Management System
              </button>
              <button
                type="button"
                onClick={() => handleMobileServiceSelect("other")}
                className="w-full text-left px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-sm text-white"
              >
                Other
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// ✅ Contact Info Section
const ContactInfo = () => {
  const contactDetails = [
    {
      icon: <Phone className="h-8 w-8 text-yellow-400" />,
      title: "Phone",
      details: ["+60-111-1335119", "Mon-Fri: 9AM - 6PM"],
    },
    {
      icon: <Mail className="h-8 w-8 text-yellow-400" />,
      title: "Email",
      details: ["sales@leadzap.com.my"],
    },
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Contact Information
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Our team is available to assist you with any questions or inquiries.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mt-12">
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
              <h3 className="text-xl font-bold mb-3 text-center text-yellow-400">
                {item.title}
              </h3>
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
