import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Scientific Calculator Pro',
  description: 'Professional scientific calculator inspired by classic handheld models with dual-line display, SHIFT/ALPHA modifiers, history, and advanced math functions.',
  openGraph: {
    title: 'Scientific Calculator Pro',
    description: 'Professional scientific calculator inspired by classic handheld models with dual-line display, SHIFT/ALPHA modifiers, history, and advanced math functions.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ScientificCalculator Pro',
    description: 'Professional scientific calculator inspired by classic handheld models with dual-line display, SHIFT/ALPHA modifiers, history, and advanced math functions.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
