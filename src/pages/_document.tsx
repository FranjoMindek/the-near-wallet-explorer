import { Html, Head, Main, NextScript } from 'next/document';
import Link from 'next/link';
 
export default function Document() {
  return (
    <Html lang='en'>
        <Head />
        <body className='bg-neutral-900 text-white display flex flex-col items-center gap-8 w-full'>
            <header className='sticky top-0 bg-neutral-950 felx flex-row px-12 py-8 text-2xl w-full'>
              <Link href={'/'}>
                The <strong>near</strong> wallet explorer
              </Link>
            </header>
            <Main/>
            <NextScript/>
        </body>
    </Html>
  );
}

