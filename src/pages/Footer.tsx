import React from 'react';
import { FaFacebookF, FaGoogle, FaInstagram } from 'react-icons/fa';
import Logo from "@/image/Logo.png"

const Footer: React.FC = () => {
    return (
        <footer className="bg-black text-white py-12">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Column 1: Logo & About */}
                    <div>
                        <img src={Logo} alt="LeadZap Marketing logo" className="h-10 md:h-12 mb-4" />
                        <p className="mb-4">
                            LeadZap Marketing helps businesses grow with SEO, social media paid ads, and custom software solutions.
                        </p>
                        {/* <div className="flex space-x-4">
                            <a href="#" aria-label="LeadZap Marketing on Facebook" target="_blank" rel="noopener noreferrer">
                                <FaFacebookF className="w-5 h-5 hover:text-yellow-300" />
                            </a>
                            <a href="#" aria-label="LeadZap Marketing on Google" target="_blank" rel="noopener noreferrer">
                                <FaGoogle className="w-5 h-5 hover:text-yellow-300" />
                            </a>
                            <a href="#" aria-label="LeadZap Marketing on Instagram" target="_blank" rel="noopener noreferrer">
                                <FaInstagram className="w-5 h-5 hover:text-yellow-300" />
                            </a>
                        </div> */}
                    </div>

                    {/* Column 2: Company Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="hover:text-yellow-400 hover:no-underline">Home</a></li>
                            <li><a href="/corporate-profile" className="hover:text-yellow-400 hover:no-underline">Company Profile</a></li>
                            <li className="font-medium">Services</li>
                            <li className="ml-4"><a href="/seo" className="hover:text-yellow-400 hover:no-underline">SEO</a></li>
                            <li className="ml-4"><a href="/social-media-ads" className="hover:text-yellow-400 hover:no-underline">Social Media Paid Ads</a></li>
                            <li className="ml-4"><a href="/customer-software-demo" className="hover:text-yellow-400 hover:no-underline">Custom Software solution</a></li>
                            <li><a href="/blog" className="hover:text-yellow-400 hover:no-underline">Blog</a></li>
                            <li><a href="/contact" className="hover:text-yellow-400 hover:no-underline">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>

                        <p className="mb-1">
                            <a
                                href="mailto:sales@leadzap.com.my"
                                className="hover:text-yellow-400 hover:no-underline"
                            >
                                sales@leadzap.com.my
                            </a>
                        </p>

                        <p>
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
                <div className="border-t border-white mt-12 pt-6 text-sm text-center">
                    Copyright © 2025 | Powered by LeadZap Sdn Bhd
                </div>
            </div>
        </footer>
    );
};

export default Footer;
