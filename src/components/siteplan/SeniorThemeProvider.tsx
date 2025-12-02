import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { SeniorThemeConfig } from '@/src/types/siteplan/models';

/**
 * Senior-friendly theme config aligned with existing Pring Land UI:
 * - Uses the same typography scale (text-lg, text-xl, text-2xl, etc.)
 * - Respects large touch targets and spacing from the requirements
 * - Color palette follows existing green/neutral scheme from the app
 */
const defaultSeniorTheme: SeniorThemeConfig = {
  fontSize: {
    body: '18px', // roughly Tailwind text-lg
    label: '16px', // text-base
    heading: '24px', // text-2xl
    unitNumber: '20px', // slightly larger for siteplan units
    button: '18px',
  },
  spacing: {
    touchTarget: '56px',
    elementGap: '16px',
    buttonHeight: '56px',
  },
  colors: {
    background: '#F9FAFB', // matches existing bg-stone-50 / slate-50 vibe
    text: '#111827', // slate-900 / high contrast
    primary: '#16A34A', // Pring Land green (brand primary in design doc)
    available: '#FFFFFF',
    booking: '#EAB308',
    sold: '#DC2626',
    border: '#374151',
  },
  contrast: {
    normalText: 4.5,
    largeText: 3.0,
  },
  animation: {
    duration: '300ms',
    easing: 'ease-in-out',
  },
};

const SeniorThemeContext = createContext<SeniorThemeConfig>(defaultSeniorTheme);

interface SeniorThemeProviderProps {
  children: ReactNode;
  /**
   * Optional overrides for theming; by default we follow
   * the Pring Land brand + senior-friendly requirements.
   */
  valueOverride?: Partial<SeniorThemeConfig>;
}

export const SeniorThemeProvider: React.FC<SeniorThemeProviderProps> = ({
  children,
  valueOverride,
}) => {
  const merged: SeniorThemeConfig = {
    ...defaultSeniorTheme,
    ...valueOverride,
    fontSize: {
      ...defaultSeniorTheme.fontSize,
      ...(valueOverride?.fontSize ?? {}),
    },
    spacing: {
      ...defaultSeniorTheme.spacing,
      ...(valueOverride?.spacing ?? {}),
    },
    colors: {
      ...defaultSeniorTheme.colors,
      ...(valueOverride?.colors ?? {}),
    },
    contrast: {
      ...defaultSeniorTheme.contrast,
      ...(valueOverride?.contrast ?? {}),
    },
    animation: {
      ...defaultSeniorTheme.animation,
      ...(valueOverride?.animation ?? {}),
    },
  };

  return (
    <SeniorThemeContext.Provider value={merged}>
      {children}
    </SeniorThemeContext.Provider>
  );
};

export const useSeniorTheme = (): SeniorThemeConfig => {
  return useContext(SeniorThemeContext);
};