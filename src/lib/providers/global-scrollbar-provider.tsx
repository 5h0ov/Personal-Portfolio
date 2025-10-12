'use client';

import { GlobalScrollbar } from 'mac-scrollbar';
import 'mac-scrollbar/dist/mac-scrollbar.css';

import { useTheme } from 'next-themes';


export function GlobalScrollbarProvider() {
    const { theme, resolvedTheme } = useTheme();
      const currentTheme = resolvedTheme || theme || 'light';
    const skin = currentTheme === 'dark' ? 'dark' : 'light';

  return <GlobalScrollbar skin={skin} />;
}
