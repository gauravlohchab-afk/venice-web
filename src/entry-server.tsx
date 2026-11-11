import { StrictMode } from 'react'
import { prerenderToNodeStream } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'
import { AppRoutes } from './App'

/**
 * Build-time pre-rendering (scripts/postbuild.mjs). Returns the full HTML of a route so crawlers that
 * do not run JavaScript, including most AI search crawlers, see the page content and not an empty div.
 * prerenderToNodeStream waits for the lazy routes to load before resolving.
 */
export async function render(url: string): Promise<string> {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  )
  // In Node the prelude is a Readable stream; decode with one streaming decoder so multi-byte
  // characters (₱, curly quotes) split across chunks stay intact.
  const decoder = new TextDecoder()
  let html = ''
  for await (const chunk of prelude as unknown as AsyncIterable<Uint8Array | string>) {
    html += typeof chunk === 'string' ? chunk : decoder.decode(chunk, { stream: true })
  }
  return html + decoder.decode()
}
