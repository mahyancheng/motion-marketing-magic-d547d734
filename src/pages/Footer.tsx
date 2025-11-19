import React from "react";
import Logo from "@/image/Logo.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Column 1: Logo & About */}
          <div>
            <img
              src={Logo}
              alt="Leadzap Marketing logo"
              className="h-8 md:h-10 mb-3 md:mb-4"
            />
            <p className="mb-3 md:mb-4 text-sm md:text-base text-gray-300">
              Leadzap Marketing helps businesses grow with SEO, social media
              paid ads, and custom software solutions.
            </p>
          </div>

          {/* Column 2: Company Links */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">
              Company
            </h3>
            <ul className="space-y-1.5 md:space-y-2 text-sm md:text-base">
              <li>
                <a
                  href="/"
                  className="hover:text-yellow-400 hover:no-underline"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/corporate-profile"
                  className="hover:text-yellow-400 hover:no-underline"
                >
                  Company Profile
                </a>
              </li>
              <li className="font-medium mt-1">Services</li>
              <li className="ml-3">
                <a
                  href="/seo"
                  className="hover:text-yellow-400 hover:no-underline"
                >
                  SEO
                </a>
              </li>
              <li className="ml-3">
                <a
                  href="/social-media-ads"
                  className="hover:text-yellow-400 hover:no-underline"
                >
                  Social Media Paid Ads
                </a>
              </li>
              <li className="ml-3">
                <a
                  href="/customer-software-demo"
                  className="hover:text-yellow-400 hover:no-underline"
                >
                  Custom Software Solution
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="hover:text-yellow-400 hover:no-underline"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-yellow-400 hover:no-underline"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">
              Get In Touch
            </h3>

            <p className="mb-1 text-sm md:text-base">
              <a
                href="mailto:sales@leadzap.com.my"
                className="hover:text-yellow-400 hover:no-underline"
              >
                sales@leadzap.com.my
              </a>
            </p>

            <p className="text-sm md:text-base">
              <a
                href="tel:+601111335119"
                className="hover:text-yellow-400 hover:no-underline"
              >
                +60-111-1335119
              </a>
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-white/40 mt-8 md:mt-12 pt-4 md:pt-6 text-xs md:text-sm text-center text-gray-300">
          Copyright © 2025 | Powered by Leadzap Sdn Bhd
        </div>
      </div>
    </footer>
  );
};

export default Footer;
