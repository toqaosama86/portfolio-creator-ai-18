import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Download } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav style={{background: 'rgba(0, 0, 0, 0.3) none repeat scroll 0% 0% / auto padding-box border-box', width: 'max-content', zIndex: 2, padding: '11.2px 27.2px', position: 'fixed', left: '768px', transform: 'matrix(1, 0, 0, 1, -139.2, 0)', bottom: '32px', display: 'flex', gap: '12.8px', borderRadius: '48px', backdropFilter: 'blur(15px)', margin: '0px', border: '0px none rgb(255, 255, 255)', outline: 'rgb(255, 255, 255) none 0px', boxSizing: 'border-box', listStyle: 'outside none none', textDecoration: 'none solid rgb(255, 255, 255)'}}>
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
        style={{background: 'rgb(31, 31, 56) none repeat scroll 0% 0% / auto padding-box border-box', color: 'rgb(255, 255, 255)', padding: '14.4px', borderRadius: '50%', display: 'flex', fontSize: '17.6px', transition: 'all', margin: '0px', border: '0px none rgb(255, 255, 255)', outline: 'rgb(255, 255, 255) none 0px', boxSizing: 'border-box', listStyle: 'outside none none', textDecoration: 'none solid rgb(255, 255, 255)'}}
      >
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{margin: '0px', padding: '0px', border: '0px none rgb(255, 255, 255)', outline: 'rgb(255, 255, 255) none 0px', boxSizing: 'border-box', listStyle: 'outside none none', textDecoration: 'none solid rgb(255, 255, 255)'}}>
          <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z" style={{margin: '0px', padding: '0px', border: '0px none rgb(255, 255, 255)', outline: 'rgb(255, 255, 255) none 0px', boxSizing: 'border-box', listStyle: 'outside none none', textDecoration: 'none solid rgb(255, 255, 255)'}} />
        </svg>
      </a>

      <a
        href="#about"
        onClick={(e) => { e.preventDefault(); scrollToSection('#about'); }}
        style={{background: 'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box', padding: '14.4px', borderRadius: '50%', display: 'flex', color: 'rgba(255, 255, 255, 0.6)', fontSize: '17.6px', transition: 'all', margin: '0px', border: '0px none rgba(255, 255, 255, 0.6)', outline: 'rgba(255, 255, 255, 0.6) none 0px', boxSizing: 'border-box', listStyle: 'outside none none', textDecoration: 'none solid rgba(255, 255, 255, 0.6)'}}
      >
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{margin: '0px', padding: '0px', border: '0px none rgba(255, 255, 255, 0.6)', outline: 'rgba(255, 255, 255, 0.6) none 0px', boxSizing: 'border-box', listStyle: 'outside none none', textDecoration: 'none solid rgba(255, 255, 255, 0.6)'}}>
          <path d="M858.5 763.6a374 374 0 0 0-80.6-119.5 375.63 375.63 0 0 0-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 0 0-80.6 119.5A371.7 371.7 0 0 0 136 901.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 0 0 8-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z" style={{margin: '0px', padding: '0px', border: '0px none rgba(255, 255, 255, 0.6)', outline: 'rgba(255, 255, 255, 0.6) none 0px', boxSizing: 'border-box', listStyle: 'outside none none', textDecoration: 'none solid rgba(255, 255, 255, 0.6)'}} />
        </svg>
      </a>

      <a
        href="#experience"
        onClick={(e) => { e.preventDefault(); scrollToSection('#experience'); }}
        style={{background: 'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box', padding: '14.4px', borderRadius: '50%', display: 'flex', color: 'rgba(255, 255, 255, 0.6)', fontSize: '17.6px', transition: 'all', margin: '0px', border: '0px none rgba(255, 255, 255, 0.6)', outline: 'rgba(255, 255, 255, 0.6) none 0px', boxSizing: 'border-box', listStyle: 'outside none none', textDecoration: 'none solid rgba(255, 255, 255, 0.6)'}}
      >
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{margin: '0px', padding: '0px', border: '0px none rgba(255, 255, 255, 0.6)', outline: 'rgba(255, 255, 255, 0.6) none 0px', boxSizing: 'border-box', listStyle: 'outside none none', textDecoration: 'none solid rgba(255, 255, 255, 0.6)'}}>
          <path d="M6 22h15v-2H6.012C5.55 19.988 5 19.805 5 19s.55-.988 1.012-1H21V4c0-1.103-.897-2-2-2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3zM5 8V5c0-.805.55-.988 1-1h13v12H5V8z" style={{margin: '0px', padding: '0px', border: '0px none rgba(255, 255, 255, 0.6)', outline: 'rgba(255, 255, 255, 0.6) none 0px', boxSizing: 'border-box', listStyle: 'outside none none', textDecoration: 'none solid rgba(255, 255, 255, 0.6)'}} />
          <path d="M8 6h9v2H8z" style={{margin: '0px', padding: '0px', border: '0px none rgba(255, 255, 255, 0.6)', outline: 'rgba(255, 255, 255, 0.6) none 0px', boxSizing: 'border-box', listStyle: 'outside none none', textDecoration: 'none solid rgba(255, 255, 255, 0.6)'}} />
        </svg>
      </a>

      <a
        href="#contact"
        onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
        style={{background: 'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box', padding: '14.4px', borderRadius: '50%', display: 'flex', color: 'rgba(255, 255, 255, 0.6)', fontSize: '17.6px', transition: 'all', margin: '0px', border: '0px none rgba(255, 255, 255, 0.6)', outline: 'rgba(255, 255, 255, 0.6) none 0px', boxSizing: 'border-box', listStyle: 'outside none none', textDecoration: 'none solid rgba(255, 255, 255, 0.6)'}}
      >
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{margin: '0px', padding: '0px', border: '0px none rgba(255, 255, 255, 0.6)', outline: 'rgba(255, 255, 255, 0.6) none 0px', boxSizing: 'border-box', listStyle: 'outside none none', textDecoration: 'none solid rgba(255, 255, 255, 0.6)'}}>
          <path d="M16 2H8C4.691 2 2 4.691 2 8v13a1 1 0 0 0 1 1h13c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6zm4 14c0 2.206-1.794 4-4 4H4V8c0-2.206 1.794-4 4-4h8c2.206 0 4 1.794 4 4v8z" style={{margin: '0px', padding: '0px', border: '0px none rgba(255, 255, 255, 0.6)', outline: 'rgba(255, 255, 255, 0.6) none 0px', boxSizing: 'border-box', listStyle: 'outside none none', textDecoration: 'none solid rgba(255, 255, 255, 0.6)'}} />
          <path d="M7 9h10v2H7zm0 4h7v2H7z" style={{margin: '0px', padding: '0px', border: '0px none rgba(255, 255, 255, 0.6)', outline: 'rgba(255, 255, 255, 0.6) none 0px', boxSizing: 'border-box', listStyle: 'outside none none', textDecoration: 'none solid rgba(255, 255, 255, 0.6)'}} />
        </svg>
      </a>
    </nav>
  );
};

export default Navigation;