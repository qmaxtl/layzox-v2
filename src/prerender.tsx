import { renderToPipeableStream } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { PassThrough } from "node:stream";
import App from "./App";
export async function render(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = new PassThrough();
    let html = "";
    stream.on("data", (chunk) => (html += chunk.toString()));
    stream.on("end", () => resolve(html));
    const renderer = renderToPipeableStream(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>,
      {
        onAllReady() {
          renderer.pipe(stream);
        },
        onShellError: reject,
        onError: reject,
      },
    );
  });
}
