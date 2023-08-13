"use client";
import { useState, useEffect } from "react";
import InputForms from "@/InputForms";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function Home() {
  let str = `## Example Markdown `;
  str += `
  [Link](https://google.com)
  Man, imagine how *annoying* it would be to have to write **all** of
  this using HTML tags`;

  const [document, setDocument] = useState([""]);

  // TODO: ugly but it's working!! refactor later
  const generateTableOfContents = () => {
    let doc = document.join("\n");

    let matches = Array.from(doc.matchAll(/\n(#+)[ \t](.+)\n/gm));
    let sizes = matches.map((groups) => groups[1].length);
    let minSize = Math.min(...sizes);
    sizes = sizes.map((size) => size - minSize);
    let headings = matches.map((groups) => groups[2]);

    const slugify = (str: string) =>
      str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");

    // console.log({ sizes, headings });

    let TOC = `## Table of Contents`;
    TOC += " \n";
    headings.forEach((h, i) => {
      let tabs = new Array(sizes[i]).fill("\t").join("");
      TOC += tabs + `* [${h}](#${slugify(h)}) \n`;
    });
    return TOC;
  };

  const updateDocument = (doc: string) => {
    setDocument([...document, doc]);
  };

  console.log(generateTableOfContents() + document.join("\n"));

  return (
    <div className='px-4 gap-4 md:flex flex-auto'>
      <div className='bg-neutral-content md:w-1/2 mb-[1vh] max-h-[92vh] min-h-[45vh] md:overflow-y-scroll'>
        <InputForms document={document} updateDocument={updateDocument} />
      </div>
      <div className='bg-accent-focus md:w-1/2 mb-[1vh] max-h-[92vh] min-h-[45vh] md:overflow-y-scroll'>
        <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} className='prose'>
          {generateTableOfContents() + document.join("\n")}
        </ReactMarkdown>
      </div>
    </div>
  );
}
