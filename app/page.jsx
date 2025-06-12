import React from 'react';
import { Card } from './components/card';
import { ContextAlert } from './components/context-alert';
import { Markdown } from './components/markdown';
import { RandomQuote } from './components/random-quote';
// Replace this with a safe fallback if Netlify context isn't available
const ctx = process.env.REACT_APP_CONTEXT || 'prod';

const contextExplainer = `
The card below is rendered based on the value of \`REACT_APP_CONTEXT\`, 
which you can set in your environment (like .env file or CI build settings).
`;

const preDynamicContentExplainer = `
The card content below is fetched from \`/quotes/random\` with a different quote shown on each page load:
`;

const postDynamicContentExplainer = `
On Netlify, dynamic routes or API endpoints can be hosted as [Serverless Functions](https://docs.netlify.com/functions/overview/).

And as always with dynamic content, beware of layout shifts & flicker! (here, we aren't...)
`;

export default function App() {
    return (
        <div className="flex flex-col gap-12 sm:gap-16">
            <section>
                <ContextAlert className="mb-6" />
                <h1 className="mb-4">Netlify Platform Starter - React</h1>
                <p className="mb-6 text-lg">Get started with React and Netlify in seconds.</p>
                <a
                    href="https://docs.netlify.com/frameworks/react/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-lg sm:min-w-64"
                >
                    Read the Docs
                </a>
            </section>

            {ctx && (
                <section className="flex flex-col gap-4">
                    <Markdown content={contextExplainer} />
                    <RuntimeContextCard ctx={ctx} />
                </section>
            )}

            <section className="flex flex-col gap-4">
                <Markdown content={preDynamicContentExplainer} />
                <RandomQuote />
                <Markdown content={postDynamicContentExplainer} />
            </section>
        </div>
    );
}

function RuntimeContextCard({ ctx }) {
    const title = `Netlify Context: running in ${ctx} mode.`;

    if (ctx === 'dev') {
        return (
            <Card title={title}>
                <p>React will rebuild pages live in development mode.</p>
            </Card>
        );
    } else {
        return (
            <Card title={title}>
                <p>This page was statically generated at build time.</p>
            </Card>
        );
    }
}
