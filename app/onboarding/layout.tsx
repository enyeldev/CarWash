import { getSessionAction } from "@/src/actions/auth";
import type { Metadata } from 'next'
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { Analytics } from '@vercel/analytics/next'

  export const metadata: Metadata = {
  title: 'AquaShine - Premium Car Wash',
  description: 'Premium car wash services that make your vehicle shine',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await getSessionAction();

  if (!session.data?.user) {
    redirect("/login");
  }

  return (
    <>
      {children}
      <Analytics />
    </>
  );
};

export default layout;