
import React, { useState } from 'react';
import { MapPin, Mail, Bot, Linkedin, Github, Twitter, Instagram } from 'lucide-react';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS'>('IDLE');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('SENDING');
    // Simulate send
    setTimeout(() => {
      setStatus('SUCCESS');
      // Reset after delay
      setTimeout(() => setStatus('IDLE'), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      <div className="pt-24 pb-12 px-6 text-center bg-gradient-to-b from-zinc-900 to-black">
        <h1 className="text-4xl md:text-5xl font-extrabold text-textMain mb-4">Get in Touch</h1>
        <p className="text-textMuted text-lg max-w-xl mx-auto">Questions about Enterprise licensing? We are here.</p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-5 gap-12 relative">
        {/* Background Blobs */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-primary opacity-10 blur-[80px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-500 opacity-10 blur-[80px] rounded-full pointer-events-none"></div>

        {/* Info Column & Map */}
        {/* On mobile: order-2 (appears second). On desktop: lg:order-1 (appears first/left) */}
        <div className="lg:col-span-2 flex flex-col gap-6 relative z-10 h-full order-2 lg:order-1">
          <div className="space-y-4">
            <ContactInfoCard icon={<MapPin />} title="Location" value="Gandhinagar, Gujarat" />
            <ContactInfoCard icon={<Mail />} title="Email" value="contact@lexrag.com" />
            <ContactInfoCard icon={<Bot />} title="AI Support" value="24/7 Automated" />
            
            {/* Social Handles */}
            <div className="flex gap-4 pt-2">
              <SocialLink href="https://www.linkedin.com/in/vickysingh-ai" icon={<Linkedin size={20} />} />
              <SocialLink href="https://github.com/vicky-ssingh" icon={<Github size={20} />} />
              <SocialLink href="https://x.com/vicky_ssingh" icon={<Twitter size={20} />} />
              <SocialLink href="https://www.instagram.com/vicky_ssingh" icon={<Instagram size={20} />} />
            </div>
          </div>

          {/* Embedded Map with Dark Mode Styling */}
          <div className="flex-grow w-full rounded-3xl overflow-hidden border border-white/10 shadow-lg min-h-[300px] relative group">
            <iframe 
              src="https://maps.google.com/maps?q=Adani%20Institute%20of%20Digital%20Technology%20Management%20Gandhinagar%20Gujarat%20382421&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(1) invert(1)' }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Adani Institute Location"
              className="absolute inset-0 w-full h-full opacity-80 hover:opacity-100 transition-opacity duration-300"
            ></iframe>
            
            {/* Subtle Overlay for border blending */}
            <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-3xl"></div>
          </div>
        </div>

        {/* Form Column */}
        {/* On mobile: order-1 (appears first). On desktop: lg:order-2 (appears second/right) */}
        <div className="lg:col-span-3 bg-white/5 border border-border backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-2xl relative z-10 flex flex-col justify-center order-1 lg:order-2">
          <h2 className="text-2xl font-bold text-textMain mb-6">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-textMain mb-2">Name</label>
              <input type="text" placeholder="Jane Doe" required className="w-full bg-black/30 border border-border rounded-lg p-3 text-textMain focus:border-primary focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-bold text-textMain mb-2">Email</label>
              <input type="email" placeholder="jane@example.com" required className="w-full bg-black/30 border border-border rounded-lg p-3 text-textMain focus:border-primary focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-bold text-textMain mb-2">Message</label>
              <textarea rows={4} placeholder="How can we help?" required className="w-full bg-black/30 border border-border rounded-lg p-3 text-textMain focus:border-primary focus:outline-none transition-colors"></textarea>
            </div>
            <button 
              type="submit" 
              disabled={status !== 'IDLE'}
              className="w-full bg-gradient-to-r from-primary to-green-400 text-black font-bold py-4 rounded-lg hover:shadow-[0_10px_20px_rgba(204,243,129,0.2)] hover:-translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'SENDING' ? 'Sending...' : status === 'SUCCESS' ? '✅ Message Sent!' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const ContactInfoCard = ({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) => (
  <div className="bg-white/5 border border-white/5 p-6 rounded-2xl flex items-center gap-4 backdrop-blur-md hover:border-primary transition-colors">
    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="text-textMain font-bold">{title}</h4>
      <p className="text-textMuted text-sm">{value}</p>
    </div>
  </div>
);

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-textMuted transition-all hover:bg-primary hover:text-black hover:-translate-y-1"
  >
    {icon}
  </a>
);

export default Contact;
