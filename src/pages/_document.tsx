import { Html, Head, Main, NextScript } from 'next/document';
 
export default function Document() {
  return (
    <Html lang='en'>
        <Head />
        <body className='bg-neutral-900 text-white display flex flex-col gap-8'>
            <header className='sticky top-0 bg-neutral-950 felx flex-row px-12 py-8 text-2xl w-full'>
                The <strong>near</strong> wallet explorer
            </header>
            <Main />
            <NextScript />
        </body>
    </Html>
  );
}

