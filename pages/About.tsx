import React from 'react';
import { Check, User, Users, Scale, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="min-h-screen">
      <section className="relative pt-32 pb-16 px-4 text-center overflow-hidden">
        <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-primary to-green-500 opacity-10 blur-[80px] -z-10 rounded-full pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
            Who We Are
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-textMain mb-6">
            Intelligent Business Law<br />Made Simple
          </h1>
          <p className="text-xl text-textMuted max-w-2xl mx-auto">
            LexRAG is an intelligent Question-Answering platform built to make legal knowledge simple, fast, and accessible.
          </p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-textMain mb-4">What We Do</h2>
          <p className="text-textMuted text-center max-w-2xl mx-auto mb-16">
            Bridging the gap between dense legal documents and actionable insights.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AboutCard icon="⚡" title="Instant Analysis" desc="Upload a 500-page PDF and get answers in seconds." />
            <AboutCard icon="🎯" title="Precision Retrieval" desc="We don't guess. Our RAG engine pinpoints the exact clause." />
            <AboutCard icon="🚫" title="Plain English" desc="Complex legal jargon is translated into clear summaries." />
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-textMain mb-6">Why We Built LexRAG</h2>
            <p className="text-textMuted text-lg leading-relaxed">
              Traditional legal search is slow and manual. Generic AI models hallucinate. We saw a gap: Professionals needed the speed of AI with the reliability of a legal textbook.
            </p>
          </div>
          <div className="bg-card border border-border rounded-3xl p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-green-500"></div>
            <h3 className="text-2xl font-bold text-textMain mb-8">The LexRAG Difference</h3>
            <ul className="space-y-4">
              <CheckItem text="RAG Retrieval ensures accuracy." />
              <CheckItem text="AI Generation ensures clarity." />
              <CheckItem text="Source Citations ensure trust." />
              <CheckItem text="Private Data stays secure." />
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-textMain mb-4">Who Uses LexRAG?</h2>
          <p className="text-textMuted mb-12">Designed for anyone needing quick, reliable legal clarity.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <UserCard icon={<Users />} title="Business Owners" />
            <UserCard icon={<User />} title="Startup Founders" />
            <UserCard icon={<Scale />} title="Legal Pros" />
            <UserCard icon={<Search />} title="Compliance" />
          </div>
        </div>
      </section>

      {/* Vision CTA Section */}
      <section className="relative py-28 px-4 bg-black border-t border-border overflow-hidden">
        {/* Diagonal Stripe Background Pattern using CSS mask or simple repetition */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 10px, #ffffff 10px, #ffffff 11px)' }}></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-textMain mb-6 leading-tight">
            Ready to transform your<br />legal workflow?
          </h2>
          <p className="text-xl text-textMuted max-w-2xl mx-auto mb-10">
            Our vision is to create a world where legal transparency is the norm. Join thousands utilizing LexRAG.
          </p>
          <Link to="/" className="inline-block bg-primary text-black font-bold text-lg px-10 py-4 rounded-full transition-transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(204,243,129,0.4)]">
            Start for free
          </Link>
        </div>
      </section>
    </div>
  );
};

const AboutCard = ({ icon, title, desc }: { icon: string, title: string, desc: string }) => (
  <div className="bg-card border border-border rounded-3xl p-10 text-center hover:-translate-y-2 transition-transform duration-300">
    <div className="w-20 h-20 mx-auto bg-white/5 text-4xl flex items-center justify-center rounded-full mb-6 text-primary">
      {icon}
    </div>
    <h4 className="text-xl font-bold text-textMain mb-2">{title}</h4>
    <p className="text-textMuted">{desc}</p>
  </div>
);

const CheckItem = ({ text }: { text: string }) => (
  <li className="flex items-center gap-4 text-textMain">
    <div className="w-6 h-6 bg-primary text-black rounded-full flex items-center justify-center flex-shrink-0">
      <Check size={14} strokeWidth={4} />
    </div>
    <span>{text}</span>
  </li>
);

const UserCard = ({ icon, title }: { icon: React.ReactNode, title: string }) => (
  <div className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center hover:border-primary transition-colors">
    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-3">
      {icon}
    </div>
    <h4 className="font-bold text-textMain">{title}</h4>
  </div>
);

export default About;