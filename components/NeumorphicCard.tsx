import React from 'react';
import { useTheme } from '../hooks/useTheme';

interface NeumorphicCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'convex' | 'concave';
}

const NeumorphicCard: React.FC<NeumorphicCardProps> = ({ children, className = '', onClick, type = 'convex' }) => {
  const { theme } = useTheme();

  const themeShadows = {
    light: {
      convex: 'shadow-neumorphic-convex',
      concave: 'shadow-neumorphic-concave',
    },
    dark: {
      convex: 'shadow-neumorphic-convex-dark',
      concave: 'shadow-neumorphic-concave-dark',
    },
    lime: {
      convex: 'shadow-neumorphic-convex-lime',
      concave: 'shadow-neumorphic-concave-lime',
    },
    rose: {
      convex: 'shadow-neumorphic-convex-rose',
      concave: 'shadow-neumorphic-concave-rose',
    },
    ocean: {
      convex: 'shadow-neumorphic-convex-ocean',
      concave: 'shadow-neumorphic-concave-ocean',
    },
    tangerine: {
      convex: 'shadow-neumorphic-convex-tangerine',
      concave: 'shadow-neumorphic-concave-tangerine',
    },
    lavender: {
      convex: 'shadow-neumorphic-convex-lavender',
      concave: 'shadow-neumorphic-concave-lavender',
    },
    green: {
        convex: 'shadow-neumorphic-convex-green',
        concave: 'shadow-neumorphic-concave-green',
    }
  };

  const activeShadows = {
    light: 'active:shadow-neumorphic-concave',
    dark: 'active:shadow-neumorphic-concave-dark',
    lime: 'active:shadow-neumorphic-concave-lime',
    rose: 'active:shadow-neumorphic-concave-rose',
    ocean: 'active:shadow-neumorphic-concave-ocean',
    tangerine: 'active:shadow-neumorphic-concave-tangerine',
    lavender: 'active:shadow-neumorphic-concave-lavender',
    green: 'active:shadow-neumorphic-concave-green',
  };

  const baseClasses = "rounded-2xl p-4 sm:p-6 transition-all duration-300";
  const shadowClass = themeShadows[theme][type];
  const interactiveClasses = onClick && type === 'convex' ? `cursor-pointer ${activeShadows[theme]}` : "";

  return (
    <div
      className={`${baseClasses} ${shadowClass} ${interactiveClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default NeumorphicCard;