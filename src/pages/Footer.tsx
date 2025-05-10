import React from 'react';
import { FaFacebookF, FaGoogle, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="bg-black text-white py-12">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Column 1: Logo & About */}
                    <div>
                        <img
                            src="https://agkaizen.com/wp-content/uploads/2024/02/Untitled-design-18.png"
                            alt="AGKaizen Logo"
                            className="w-40 mb-4"
                        />
                        <p className="mb-4">
                            AGKaizen is the leading fertilizer supplier in Malaysia. We are the sole distributor of Japan Vietnam Fertilizer (JVF)
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/p/JVF-Malaysia-AGKaizen-61558413844567/" target="_blank" rel="noopener noreferrer">
                                <FaFacebookF className="w-5 h-5 hover:text-yellow-300" />
                            </a>
                            <a href="https://www.google.com/maps/dir/2.9934689,101.5350582/agkaizen+sdn+bhd/" target="_blank" rel="noopener noreferrer">
                                <FaGoogle className="w-5 h-5 hover:text-yellow-300" />
                            </a>
                            <a href="https://www.instagram.com/jvfmalaysia/" target="_blank" rel="noopener noreferrer">
                                <FaInstagram className="w-5 h-5 hover:text-yellow-300" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Company Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="hover:underline">Home</a></li>
                            <li><a href="/seo" className="hover:underline">SEO</a></li>
                            <li><a href="/social-media-ads" className="hover:underline">Social Media Paid Ads</a></li>
                            <li><a href="/order-management" className="hover:underline">Order Management System</a></li>
                            <li><a href="/contact" className="hover:underline">Contact</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
                        <p className="mb-3">
                            123 Marketing Street Suite 456 San Francisco, CA 94103
                        </p>
                        <p className="mb-1">info@leadzap.com</p>
                        <p>+1(555)123-4567</p>
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
