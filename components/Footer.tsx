
import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Github, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-border pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:w-1/3 flex flex-col items-start text-left">
            <Link to="/" className="text-2xl font-extrabold text-textMain mb-4 block">LexRAG</Link>
            <p className="text-textMuted text-sm leading-relaxed mb-6 max-w-xs">
              The AI-powered assistant that simplifies legal document analysis. Get accurate answers, citations, and clarity in seconds.
            </p>
            <div className="flex gap-4">
              <SocialLink href="https://www.linkedin.com/in/vickysingh-ai" icon={<Linkedin size={18} />} />
              <SocialLink href="https://github.com/vicky-ssingh" icon={<Github size={18} />} />
              <SocialLink href="https://x.com/vicky_ssingh" icon={<Twitter size={18} />} />
              <SocialLink href="https://www.instagram.com/vicky_ssingh" icon={<Instagram size={18} />} />
            </div>
          </div>

          {/* Links Section - Strictly 2 Columns to match mobile format request */}
          <div className="flex-1 grid grid-cols-2 gap-8 text-left">
            <FooterColumn title="Product">
              <FooterLink to="#">Features</FooterLink>
              <FooterLink to="#">Pricing</FooterLink>
              <FooterLink to="#">API Access</FooterLink>
              <FooterLink to="#">Integrations</FooterLink>
            </FooterColumn>

            <FooterColumn title="Company">
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="#">Careers</FooterLink>
              <FooterLink to="#">Blog</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </FooterColumn>

            <FooterColumn title="Resources">
              <FooterLink to="#">Documentation</FooterLink>
              <FooterLink to="#">Help Center</FooterLink>
              <FooterLink to="#">Community</FooterLink>
              <FooterLink to="#">Legal Knowledge</FooterLink>
            </FooterColumn>

            <FooterColumn title="Legal">
              <FooterLink to="#">Privacy Policy</FooterLink>
              <FooterLink to="#">Terms of Use</FooterLink>
              <FooterLink to="#">Security</FooterLink>
              <FooterLink to="#">Cookie Policy</FooterLink>
            </FooterColumn>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8 text-center text-zinc-500 text-sm">
          <p>&copy; 2025 LexRAG AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center text-textMuted transition-all hover:bg-primary hover:text-black hover:-translate-y-1"
  >
    {icon}
  </a>
);

const FooterColumn = ({ title, children }: { title: string; children?: React.ReactNode }) => (
  <div className="flex flex-col items-start">
    <h4 className="font-bold text-textMain mb-4 md:mb-6 text-base">{title}</h4>
    <ul className="space-y-3 w-full flex flex-col">{children}</ul>
  </div>
);

const FooterLink = ({ to, children }: { to: string; children?: React.ReactNode }) => (
  <li>
    <Link to={to} className="text-textMuted text-sm hover:text-primary transition-colors block">
      {children}
    </Link>
  </li>
);

export default Footer;
