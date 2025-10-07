

import React from 'react';
import NeumorphicCard from './NeumorphicCard';
import { useTheme } from '../hooks/useTheme';
import { createGlobalRipple } from '../services/rippleEffect';

interface Choice {
  text: string;
  onClick: () => void;
  style: 'primary' | 'default';
}

interface ChoiceDialogProps {
  onClose: () => void;
  title: string;
  message: string;
  choices: Choice[];
}

const ChoiceDialog: React.FC<ChoiceDialogProps> = ({ onClose, title, message, choices }) => {
  const { theme } = useTheme();

  const buttonThemeClasses = {
      light: {
          primary: 'bg-primary-mint text-white shadow-neumorphic-convex active:shadow-neumorphic-concave',
          default: 'shadow-neumorphic-convex active:shadow-neumorphic-concave',
      },
      dark: {
          primary: 'bg-primary-mint text-white shadow-neumorphic-convex-dark active:shadow-neumorphic-concave-dark',
          default: 'shadow-neumorphic-convex-dark active:shadow-neumorphic-concave-dark',
      },
      lime: {
          primary: 'bg-primary-lime text-white shadow-neumorphic-convex-lime active:shadow-neumorphic-concave-lime',
          default: 'shadow-neumorphic-convex-lime active:shadow-neumorphic-concave-lime',
      },
      rose: {
          primary: 'bg-primary-rose text-white shadow-neumorphic-convex-rose active:shadow-neumorphic-concave-rose',
          default: 'shadow-neumorphic-convex-rose active:shadow-neumorphic-concave-rose',
      },
      ocean: {
          primary: 'bg-primary-ocean text-white shadow-neumorphic-convex-ocean active:shadow-neumorphic-concave-ocean',
          default: 'shadow-neumorphic-convex-ocean active:shadow-neumorphic-concave-ocean',
      },
      tangerine: {
          primary: 'bg-primary-tangerine text-white shadow-neumorphic-convex-tangerine active:shadow-neumorphic-concave-tangerine',
          default: 'shadow-neumorphic-convex-tangerine active:shadow-neumorphic-concave-tangerine',
      },
      lavender: {
          primary: 'bg-primary-lavender text-white shadow-neumorphic-convex-lavender active:shadow-neumorphic-concave-lavender',
          default: 'shadow-neumorphic-convex-lavender active:shadow-neumorphic-concave-lavender',
      },
      green: {
          primary: 'bg-primary-green text-white shadow-neumorphic-convex-green active:shadow-neumorphic-concave-green',
          default: 'shadow-neumorphic-convex-green active:shadow-neumorphic-concave-green',
      }
  };


  return (
      <NeumorphicCard className="w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
        <p className="text-center mb-6">{message}</p>
        <div className="flex flex-col sm:flex-row gap-4">
          {choices.map((choice, index) => (
            <button 
                key={index}
                onClick={(e) => {
                    createGlobalRipple(e);
                    choice.onClick();
                }}
                className={`w-full font-bold py-3 px-4 rounded-xl transform active:scale-95 transition-all duration-200 ${buttonThemeClasses[theme][choice.style]}`}
            >
              {choice.text}
            </button>
          ))}
        </div>
      </NeumorphicCard>
  );
};
export default ChoiceDialog;