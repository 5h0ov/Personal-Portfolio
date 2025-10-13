'use client';

import { motion } from 'motion/react';
import { FileText, Github, Twitter, Mail, Moon, Folder, Sun, Linkedin, Instagram, ArrowRight, ArrowUp, ArrowLeft, ArrowDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import socialLinks from '@/lib/data/social-links.json';
import type { SocialLink } from '@/lib/types';

const iconMap = {
  Github,
  Twitter,
  Linkedin,
  Instagram,
};

const baseNavItems = [
  { icon: <FileText size={24} />, label: 'About', href: '#about', type: 'scroll' },
  { icon: <Folder size={24} />, label: 'Creations', href: '#projects', type: 'scroll' },
];

const endNavItems = [
  { icon: <Mail size={24} />, label: 'Contact', href: '#contact', type: 'scroll' },
  { icon: <Moon size={24} />, label: 'Theme', type: 'theme' },
];

// function to generate navigation items with social links
const generateNavItems = () => {
  const typedSocialLinks = socialLinks as SocialLink[];
  const pillSocialLinks = typedSocialLinks
    .filter(link => link.shownInPill)
    .map(link => {
      const IconComponent = iconMap[link.icon];
      return {
        icon: <IconComponent size={24} />,
        label: link.label,
        href: link.href,
        type: 'external' as const
      };
    });

  return [...baseNavItems, ...pillSocialLinks, ...endNavItems];
};

const navItems = generateNavItems();

type Position = 'bottom' | 'right' | 'top' | 'left';

const PillboxNav = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState<Position>('bottom');
  const [footerOffset, setFooterOffset] = useState(0);
  const { theme, setTheme } = useTheme();

  // dynamic padding calculation
  const pushDistance = 12; // the distance buttons are pushed
  const basePadding = 12; // base padding (=px-3)
  const dynamicPadding = basePadding + pushDistance;

  useEffect(() => {
    setMounted(true);
  }, []);

  // detect footer visibility and adjust pillbox position
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (!footer) return;

      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // if footer is visible, calculate how much to push up the pillbox
      if (footerRect.top < windowHeight) {
        const overlap = windowHeight - footerRect.top;
        setFooterOffset(overlap);
      } else {
        setFooterOffset(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderTooltip = (label: string) => (
    <div
      className={`absolute px-3 py-2 glass rounded-xl text-xs text-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none font-medium ${position === 'bottom' ? 'bottom-full left-1/2 mb-3 -translate-x-1/2 group-hover:translate-y-0 translate-y-2' :
        position === 'top' ? 'top-full left-1/2 mt-3 -translate-x-1/2 group-hover:translate-y-0 -translate-y-2' :
          position === 'right' ? 'right-full top-1/2 mr-3 -translate-y-1/2 group-hover:translate-x-0 translate-x-2' :
            'left-full top-1/2 ml-3 -translate-y-1/2 group-hover:translate-x-0 -translate-x-2'
        }`}
    >
      {label}
    </div>
  );

  const handlePositionToggle = () => {
    const positions: Position[] = ['bottom', 'right', 'top', 'left'];
    const currentIndex = positions.indexOf(position);
    const nextIndex = (currentIndex + 1) % positions.length;
    setPosition(positions[nextIndex]);
  };

  const getPositionIcon = () => {
    switch (position) {
      case 'bottom': return <ArrowRight size={20} />;
      case 'right': return <ArrowUp size={20} />;
      case 'top': return <ArrowLeft size={20} />;
      case 'left': return <ArrowDown size={20} />;
    }
  };

  const getContainerStyles = () => {
    const baseStyles = "pointer-events-none fixed flex z-20 transition-all duration-300";
    switch (position) {
      case 'bottom':
        return `${baseStyles} inset-x-0 justify-center`;
      case 'right':
        return `${baseStyles} inset-y-0 right-4 items-center`;
      case 'top':
        return `${baseStyles} inset-x-0 top-4 justify-center`;
      case 'left':
        return `${baseStyles} inset-y-0 left-4 items-center`;
      default:
        return `${baseStyles} inset-x-0 justify-center`;
    }
  };

  const getContainerPosition = () => {
    if (position === 'bottom') {
      return { bottom: `${16 + footerOffset}px` };
    }
    return {};
  };

  const isVertical = position === 'left' || position === 'right';

  const handleNavClick = (item: typeof navItems[0], e: React.MouseEvent) => {
    e.preventDefault();

    if (item.type === 'theme') {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    } else if (item.type === 'scroll') {
      const targetElement = document.querySelector(item.href!);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else if (item.type === 'external') {
      window.open(item.href, '_blank');
    }
  };

  return (
    <motion.div
      key={position}
      className={getContainerStyles()}
      style={getContainerPosition()}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div
        className={`rounded-full glass pointer-events-auto relative flex items-center shadow-2xl ${isVertical ? 'flex-col' : 'flex-row'}`}
        style={{
          paddingLeft: `${dynamicPadding}px`,
          paddingRight: `${dynamicPadding}px`,
          paddingTop: `${basePadding}px`,
          paddingBottom: `${basePadding}px`,
        }}
      >
        {navItems.map((item, index) => (
          <motion.button
            key={index}
            onClick={(e) => handleNavClick(item, e)}
            className="cursor-none group relative flex aspect-square items-center justify-center rounded-full w-12 h-12 text-foreground transition-colors duration-200"
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              x: hoveredIndex !== null && hoveredIndex !== index && !isVertical
                ? (index < hoveredIndex ? -pushDistance : pushDistance)
                : 0,
              y: hoveredIndex !== null && hoveredIndex !== index && isVertical
                ? (index < hoveredIndex ? -pushDistance : pushDistance)
                : 0,
              scale: hoveredIndex === index ? 1.2 : 1,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
              delay: hoveredIndex !== null ? index * 0.05 : 0
            }}
            layout={false}
          >

            <motion.div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'var(--gradient-accent)' }}
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />

            <motion.div
              className="relative z-10"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              animate={item.type === 'theme' && mounted ? { rotate: theme === 'dark' ? 180 : 0 } : {}}
              transition={{ duration: 0.3 }}
            >
              {item.type === 'theme' ? (
                mounted && theme === 'dark' ? <Moon size={24} /> : <Sun size={24} />
              ) : (
                item.icon
              )}
            </motion.div>

            {renderTooltip(item.label)}
          </motion.button>
        ))}

        <div
          className={`bg-border/60 ${isVertical ? 'w-8 h-px my-1' : 'h-8 w-px mx-1'}`}
        />

        {/* position toggle button - very neat */}
        <motion.button
          onClick={handlePositionToggle}
          className="cursor-none group relative flex aspect-square items-center justify-center rounded-full w-12 h-12 text-muted-foreground hover:text-foreground transition-colors duration-200"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            x: hoveredIndex !== null && hoveredIndex !== navItems.length && !isVertical
              ? (navItems.length < hoveredIndex ? -pushDistance : pushDistance)
              : 0,
            y: hoveredIndex !== null && hoveredIndex !== navItems.length && isVertical
              ? (navItems.length < hoveredIndex ? -pushDistance : pushDistance)
              : 0,
            scale: hoveredIndex === navItems.length ? 1.2 : 1,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
            delay: hoveredIndex !== null ? navItems.length * 0.05 : 0
          }}
          layout={false}
          onHoverStart={() => setHoveredIndex(navItems.length)}
          onHoverEnd={() => setHoveredIndex(null)}
        >
          <motion.div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'var(--gradient-accent)' }}
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />

          <motion.div
            className="relative z-10"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            {getPositionIcon()}
          </motion.div>

          {renderTooltip('Change Position')}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PillboxNav;
