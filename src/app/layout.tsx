import '~/styles/globals.css'

import { GeistSans } from 'geist/font/sans'
import { type Metadata } from 'next'

import { ClerkProvider } from '@clerk/nextjs'
import { TRPCReactProvider } from '~/trpc/react'
import { ThemeProvider } from '~/components/theme-provider'
import { Toaster } from '~/components/ui/sonner'

export const metadata: Metadata = {
    title: 'Postpulse',
    description:
        'A simple tool to help you randomly select users from social media posts',
    icons: [{ rel: 'icon', url: '/favicon.ico' }]
}

export default function RootLayout({
    children
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html
            lang="en"
            className={`${GeistSans.variable}`}
            suppressHydrationWarning
        >
            <body>
                <ClerkProvider dynamic>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <TRPCReactProvider>
                            {children}
                            <Toaster richColors />
                        </TRPCReactProvider>
                    </ThemeProvider>
                </ClerkProvider>
            </body>
        </html>
    )
}
