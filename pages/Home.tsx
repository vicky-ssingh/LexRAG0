
import React, { useState } from 'react';
import { Search, X, Sparkles, FileText, CheckCircle, Clock, Shield, Database, MessageCircle, Info, Folder, MessageSquare, Brain, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom'; // Import Link
import { askLegalAssistant } from '../services/geminiService';
import { LoadingState, ChatResponse } from '../types';

const Home: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState<LoadingState>(LoadingState.IDLE);
  const [response, setResponse] = useState<ChatResponse | null>(null);
  const [error, setError] = useState('');

  const handleAsk = async () => {
    if (!query.trim()) return;
    
    setLoading(LoadingState.LOADING);
    setResponse(null);
    setError('');

    try {
      const result = await askLegalAssistant(query);
      setResponse(result);
      setLoading(LoadingState.SUCCESS);
    } catch (err) {
      setError('An error occurred while fetching the answer. Please try again.');
      setLoading(LoadingState.ERROR);
    }
  };

  const clearInput = () => {
    setQuery('');
    setResponse(null);
    setLoading(LoadingState.IDLE);
  };

  // Custom styling for Markdown elements to match the LexRAG dark theme
  const markdownComponents = {
    // Headers
    h1: (props: any) => <h1 className="text-2xl md:text-3xl font-bold text-white mt-8 mb-4 pb-2 border-b border-zinc-800" {...props} />,
    h2: (props: any) => <h2 className="text-xl md:text-2xl font-bold text-primary mt-8 mb-4" {...props} />,
    h3: (props: any) => <h3 className="text-lg md:text-xl font-semibold text-white mt-6 mb-3" {...props} />,
    
    // Text
    p: (props: any) => <p className="mb-4 text-zinc-300 leading-7 text-base" {...props} />,
    strong: (props: any) => <strong className="font-bold text-white bg-white/5 px-1 rounded-sm" {...props} />,
    em: (props: any) => <em className="italic text-zinc-400" {...props} />,
    a: (props: any) => <a className="text-primary hover:underline underline-offset-4 cursor-pointer" {...props} />,
    
    // Lists
    ul: (props: any) => <ul className="list-disc list-outside ml-5 mb-6 space-y-2 text-zinc-300 marker:text-primary" {...props} />,
    ol: (props: any) => <ol className="list-decimal list-outside ml-5 mb-6 space-y-2 text-zinc-300 marker:text-primary marker:font-bold" {...props} />,
    li: (props: any) => <li className="pl-1" {...props} />,
    
    // Blockquotes & Code
    blockquote: (props: any) => (
      <blockquote className="border-l-4 border-primary pl-4 py-2 my-6 bg-white/5 rounded-r-lg italic text-zinc-400">
        {props.children}
      </blockquote>
    ),
    code: (props: any) => (
      <code className="bg-zinc-800 text-primary px-1.5 py-0.5 rounded text-sm font-mono border border-zinc-700/50" {...props} />
    ),
    pre: (props: any) => (
      <pre className="bg-black/50 border border-zinc-800 rounded-lg p-4 overflow-x-auto my-6 custom-scrollbar">
        {props.children}
      </pre>
    ),
    
    // Tables
    table: (props: any) => <div className="overflow-x-auto my-6 rounded-lg border border-zinc-800"><table className="w-full text-left border-collapse" {...props} /></div>,
    th: (props: any) => <th className="bg-zinc-900 border-b border-zinc-800 p-3 font-bold text-white text-sm" {...props} />,
    td: (props: any) => <td className="border-b border-zinc-800 p-3 text-zinc-300 text-sm bg-zinc-900/30" {...props} />,
    tr: (props: any) => <tr className="hover:bg-zinc-800/50 transition-colors" {...props} />,
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 pt-24 pb-12 text-center bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#050505_70%)]">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-border px-4 py-2 rounded-full text-sm text-primary mb-6 backdrop-blur-sm">
            <FileText size={16} />
            <span>Currently Analyzing: <strong>Companies Act 2013</strong></span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-textMain mb-6 leading-tight">
            Your Smart Assistant for<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400">Business Law Compliance</span>
          </h1>

          <p className="text-lg text-textMuted max-w-2xl mx-auto mb-10">
            LexRAG helps you instantly get accurate, citation-backed answers from the Companies Act, business regulations, and legal documents.
          </p>

          {/* Search Box - Responsive Layout */}
          <div className="max-w-3xl mx-auto relative group z-20">
            <div className="bg-card border border-border rounded-2xl md:rounded-full p-2 flex flex-col md:flex-row items-center gap-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all focus-within:border-primary focus-within:shadow-[0_0_20px_rgba(204,243,129,0.15)]">
              <div className="hidden md:block pl-4 text-primary">
                <Sparkles size={24} />
              </div>
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                placeholder="Ask a question about the Companies Act..." 
                className="w-full md:flex-1 bg-transparent border-none outline-none text-textMain text-lg py-3 px-4 md:px-2 placeholder-zinc-600 text-center md:text-left"
              />
              {query && (
                <button onClick={clearInput} className="hidden md:flex w-8 h-8 rounded-full bg-zinc-800 text-zinc-400 items-center justify-center hover:bg-zinc-700 hover:text-red-400 transition-colors">
                  <X size={16} />
                </button>
              )}
              <button 
                onClick={handleAsk}
                disabled={loading === LoadingState.LOADING}
                className="w-full md:w-auto bg-primary hover:bg-primaryHover text-black font-bold py-3 px-8 rounded-xl md:rounded-full transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {loading === LoadingState.LOADING ? 'Analyzing...' : 'Ask LexRAG'}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-6 mt-6 text-sm text-textMuted">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-white/5">
              <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_5px_var(--color-primary)]"></span>
              AI Ready
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-white/5">
              <span>🔒 Private & Secure</span>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <div className="max-w-4xl mx-auto px-4 mb-10">
        {loading === LoadingState.LOADING && (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-zinc-800 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-textMuted animate-pulse">Analyzing document regulations...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-300 p-4 rounded-xl text-center mt-8">
            {error}
          </div>
        )}

        {response && (
          <div className="bg-card border border-border rounded-2xl overflow-hidden mt-8 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-zinc-900 border-b border-border px-6 py-4 flex items-center gap-3">
              <span className="text-2xl">🤖</span>
              <span className="font-bold text-primary">LexRAG Analysis</span>
            </div>
            <div className="p-8">
              <div className="mb-6">
                <span className="text-xs font-bold text-textMuted uppercase tracking-wider">Question</span>
                <p className="text-xl font-semibold text-textMain mt-1">{query}</p>
              </div>
              <div>
                <span className="text-xs font-bold text-textMuted uppercase tracking-wider">Answer</span>
                {/* 
                  Enhanced Typography Container
                  Using both 'prose' (from Tailwind plugin) for base safety 
                  AND custom 'components' for specific visual overrides.
                */}
                <div className="mt-2 text-zinc-200">
                  <ReactMarkdown components={markdownComponents}>
                    {response.answer}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
            <div className="bg-zinc-900 border-t border-border p-6">
              <h5 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                <Database size={16} /> Source Citations
              </h5>
              <ul className="space-y-2">
                {response.citations.map((cite, idx) => (
                  <li key={idx} className="text-sm text-textMuted flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 bg-zinc-700 rounded-full flex-shrink-0"></span>
                    {cite}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Definition Section */}
      <section className="py-20 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-left text-center lg:text-left">
              <div className="text-primary font-bold text-sm tracking-wider uppercase mb-4">Definition</div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-textMain mb-6 leading-tight">
                Not just a search engine.<br />
                A <span className="text-primary">Legal Intelligence Engine.</span>
              </h2>
              <p className="text-lg text-textMuted mb-6 leading-relaxed">
                LexRAG is an AI-powered platform that transforms dense, complex legal PDFs into a conversational interface. Unlike standard search (Ctrl+F), which only finds keywords, LexRAG understands <strong>legal context</strong>.
              </p>
              <p className="text-lg text-textMuted leading-relaxed">
                It reads regulatory documents like a lawyer would—connecting clauses, finding definitions, and synthesizing answers.
              </p>
            </div>

            <div className="relative h-[400px] flex items-center justify-center perspective-1000">
              {/* Background Blob */}
              <div className="absolute w-[400px] h-[400px] bg-primary/10 rounded-full blur-[60px] animate-pulse"></div>

              {/* Floating Icons */}
              <div className="absolute top-[15%] left-[5%] bg-zinc-800 p-3 rounded-xl border border-zinc-700 shadow-xl animate-float" style={{ animationDelay: '0s' }}>
                <span className="text-2xl">📄</span>
              </div>
              <div className="absolute bottom-[20%] right-[5%] bg-zinc-800 p-3 rounded-xl border border-zinc-700 shadow-xl animate-float" style={{ animationDelay: '1.5s' }}>
                <span className="text-2xl text-primary">🔍</span>
              </div>
              <div className="absolute top-[10%] right-[20%] bg-white/5 px-4 py-2 rounded-full border border-white/10 text-sm text-textMuted animate-float" style={{ animationDelay: '3s' }}>
                Clause 4(b)
              </div>

              {/* Central Card */}
              <div className="relative z-10 bg-card border border-border rounded-2xl p-6 flex items-center gap-4 w-full max-w-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all hover:-translate-y-1 hover:border-primary group">
                <div className="w-12 h-12 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-lg text-green-500">✅</span>
                </div>
                <div>
                  <h4 className="text-textMain font-bold mb-1">Exact Answer</h4>
                  <p className="text-textMuted font-mono text-sm">"Based on page 42..."<span className="animate-pulse text-primary">|</span></p>
                </div>
                {/* Popover */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-primary text-black px-3 py-1 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 whitespace-nowrap shadow-lg pointer-events-none">
                  Source: Companies Act, Section 4(b)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (Process) Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-textMain mb-4">How It Works</h2>
            <p className="text-textMuted text-lg">From document to answer in 4 simple steps.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
             {/* Dashed Line Background (Desktop) */}
            <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-px border-t border-dashed border-zinc-800 z-0"></div>

            <StepCard number={1} icon={<Folder />} title="Upload PDF" desc="Drag & drop your Companies Act or legal documents." pill="Secure Upload" />
            <StepCard number={2} icon={<MessageSquare />} title="Ask Question" desc="Type your query naturally. e.g. 'What is the penalty?'" pill="Natural Language" />
            <StepCard number={3} icon={<Brain />} title="AI Retrieval" desc="We scan the exact clauses and sections relevant to you." pill="Context Aware" />
            <StepCard number={4} icon={<CheckCircle />} title="Get Answer" desc="Receive precise answers with citation page numbers." pill="Verified Sources" />
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-20 px-4 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-textMain mb-4">Why LexRAG?</h2>
            <p className="text-textMuted text-lg">We solved the biggest problems in legal AI: Hallucinations and Privacy.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon={<Clock />} title="Instant Precision" desc="Don't wait days for a legal opinion. Get answers in 3-5 seconds." />
            <FeatureCard icon={<CheckCircle />} title="Citations Included" desc="Trust is good, checking is better. Every AI response includes exact citations." />
            <FeatureCard icon={<MessageCircle />} title="Zero Legalese" desc="We translate complex subsections into plain English." />
            <FeatureCard icon={<Database />} title="Custom Knowledge Base" desc="Upload your own contracts or acts. LexRAG becomes an expert instantly." />
            <FeatureCard icon={<Sparkles />} title="24/7 Availability" desc="Your legal questions don't stop at 5 PM. LexRAG is always online." />
            <FeatureCard icon={<Shield />} title="Private & Secure" desc="Your documents are processed in an isolated environment." />
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-textMain mb-4">Key Features</h2>
            <p className="text-textMuted text-lg">Powered by advanced RAG technology.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureGridItem emoji="🔍" title="Smart Legal Search" desc="Ask any question, get answers backed by specific clauses." />
            <FeatureGridItem emoji="📄" title="PDF Knowledge Base" desc="Upload Companies Act, SEBI laws, GST rules, or any regulatory file." />
            <FeatureGridItem emoji="🤖" title="RAG-Based AI Engine" desc="Ensures accuracy and drastically reduces hallucinations." />
            <FeatureGridItem emoji="📚" title="Context-Aware" desc="Extracts relevant portions from long documents automatically." />
            <FeatureGridItem emoji="🛡️" title="Data Security First" desc="Your documents stay private and secure." />
            <FeatureGridItem emoji="✨" title="Clean & Simple UI" desc="Designed for seamless querying without clutter." />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 text-center lg:text-left">
            <h2 className="text-4xl font-extrabold text-textMain mb-4">Got questions?<br />We've got answers.</h2>
            <p className="text-textMuted mb-6">Here's everything you need to know before getting started.</p>
            <Link to="/contact" className="text-primary font-bold hover:underline">Contact us ↗</Link>
          </div>
          <div className="lg:col-span-2 space-y-4">
            <FAQItem number="01" question="What is LexRAG?">
              LexRAG is an AI-powered Business Law assistant that answers your questions using information retrieved directly from legal PDFs like the Companies Act and other business regulations.
            </FAQItem>
            <FAQItem number="02" question="How does LexRAG work?">
              LexRAG uses RAG (Retrieval-Augmented Generation). It scans your uploaded PDF, finds the most relevant sections, and generates accurate answers with citations — ensuring reliability and context.
            </FAQItem>
            <FAQItem number="03" question="Can I upload my own legal documents?">
              Yes. You can upload any PDF such as the Companies Act, GST rules, SEBI regulations, HR policies, or internal compliance documents.
            </FAQItem>
            <FAQItem number="04" question="Is my uploaded data safe?">
              Absolutely. Your documents are processed securely, stored locally (if configured), and never reused or shared without permission.
            </FAQItem>
            <FAQItem number="05" question="What file formats are supported?">
               Currently, LexRAG supports PDF files of legal documents.
            </FAQItem>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Helper Components ---

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="bg-card border border-border p-6 rounded-2xl transition-all hover:border-primary hover:-translate-y-1 hover:bg-cardHover group flex gap-4 items-start">
    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center text-2xl group-hover:bg-primary group-hover:text-black transition-colors flex-shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-bold text-textMain mb-1">{title}</h3>
      <p className="text-textMuted text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

const FeatureGridItem = ({ emoji, title, desc }: { emoji: string, title: string, desc: string }) => (
  <div className="bg-card border border-border p-8 rounded-2xl transition-all hover:-translate-y-2 hover:border-primary hover:shadow-[0_10px_30px_rgba(204,243,129,0.05)] text-center">
    <span className="text-4xl mb-4 block filter grayscale-[0.2]">{emoji}</span>
    <h3 className="text-xl font-bold text-textMain mb-2">{title}</h3>
    <p className="text-textMuted">{desc}</p>
  </div>
);

const StepCard = ({ number, icon, title, desc, pill }: { number: number, icon: React.ReactNode, title: string, desc: string, pill: string }) => (
  <div className="bg-card border border-border rounded-3xl p-6 text-center relative z-10 transition-all hover:-translate-y-2 hover:border-primary hover:bg-cardHover hover:shadow-lg group">
    <div className="w-14 h-14 bg-zinc-800 rounded-full mx-auto mb-6 flex items-center justify-center text-primary text-2xl border border-zinc-700 transition-all group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary relative">
      {icon}
      <div className="absolute -top-1 -right-1 bg-primary text-black w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center group-hover:shadow-[0_0_8px_rgba(204,243,129,0.6)]">
        {number}
      </div>
    </div>
    <h3 className="text-lg font-bold text-textMain mb-2 group-hover:text-primary transition-colors">{title}</h3>
    <p className="text-sm text-textMuted mb-4">{desc}</p>
    <div className="inline-block bg-zinc-800 text-textMuted px-3 py-1 rounded-full text-xs transition-colors group-hover:bg-primary/10 group-hover:text-primary">
      {pill}
    </div>
  </div>
);

const FAQItem = ({ number, question, children }: { number: string, question: string, children?: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`bg-card border ${isOpen ? 'border-zinc-600 bg-zinc-900' : 'border-zinc-800'} rounded-2xl overflow-hidden transition-all duration-300 hover:border-zinc-700`}>
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-6 text-left">
        <div className="flex items-center gap-4">
          <span className="w-8 h-8 flex items-center justify-center bg-primary/5 text-primary border border-primary/20 rounded-lg text-xs font-bold flex-shrink-0">
            {number}
          </span>
          <span className="font-bold text-textMain text-lg pr-4">{question}</span>
        </div>
        <span className={`text-2xl text-primary transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-45' : ''}`}>+</span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="px-6 pb-6 pt-0 text-textMuted leading-relaxed pl-[4.5rem] pr-6 text-base">
          {children}
        </p>
      </div>
    </div>
  );
};

export default Home;
