import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isActive = (path: string) => location.pathname === path ? 'text-primary' : 'text-textMuted hover:text-primary';

  const scrollToSection = (sectionId: string) => {
    closeMenu();
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold tracking-tighter text-textMain flex items-center gap-2" onClick={() => scrollToSection('top')}>
          LexRAG
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10 list-none">
          <li><Link to="/" className={`text-sm font-medium transition-colors ${isActive('/')}`}>Home</Link></li>
          <li>
            <button onClick={() => scrollToSection('features')} className="text-sm font-medium text-textMuted hover:text-primary transition-colors cursor-pointer bg-transparent border-none">
              Features
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection('faq')} className="text-sm font-medium text-textMuted hover:text-primary transition-colors cursor-pointer bg-transparent border-none">
              FAQ
            </button>
          </li>
          <li><Link to="/about" className={`text-sm font-medium transition-colors ${isActive('/about')}`}>About Us</Link></li>
          <li><Link to="/contact" className={`text-sm font-medium transition-colors ${isActive('/contact')}`}>Contact</Link></li>
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link to="/" className="bg-primary text-black px-6 py-2.5 rounded-full font-bold text-sm transition-transform hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(204,243,129,0.3)]">
            Ask LexRAG
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-textMain focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black border-b border-border p-6 flex flex-col items-center gap-6 shadow-2xl animate-in slide-in-from-top-2">
          <Link to="/" onClick={closeMenu} className="text-lg font-medium text-textMain">Home</Link>
          <button onClick={() => scrollToSection('features')} className="text-lg font-medium text-textMain bg-transparent border-none">Features</button>
          <button onClick={() => scrollToSection('faq')} className="text-lg font-medium text-textMain bg-transparent border-none">FAQ</button>
          <Link to="/about" onClick={closeMenu} className="text-lg font-medium text-textMain">About Us</Link>
          <Link to="/contact" onClick={closeMenu} className="text-lg font-medium text-textMain">Contact</Link>
          <Link to="/" onClick={closeMenu} className="bg-primary text-black w-full text-center py-3 rounded-lg font-bold">
            Ask LexRAG
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;