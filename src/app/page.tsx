"use client";
import { useState, useEffect } from "react";
import InputForms from "@/InputForms";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import generateTableOfContents from "@/utils/generateTOC";

export default function Home() {
  let str = `## Example Markdown `;
  str += `
  [Link](https://google.com)
  Man, imagine how *annoying* it would be to have to write **all** of
  this using HTML tags`;

  const [document, setDocument] = useState([""]);

  const updateDocument = (doc: string) => {
    setDocument([...document, doc]);
  };

  console.log(generateTableOfContents(document.join("\n")) + document.join("\n"));

  return (
    <div className='px-4 gap-4 md:flex flex-auto'>
      <div className='bg-neutral-content md:w-1/2 mb-[1vh] max-h-[92vh] min-h-[45vh] md:overflow-y-scroll'>
        <InputForms document={document} updateDocument={updateDocument} />
      </div>
      <div className='bg-accent-focus md:w-1/2 mb-[1vh] max-h-[92vh] min-h-[45vh] md:overflow-y-scroll'>
        <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} className='prose'>
          {generateTableOfContents(document.join("\n")) + document.join("\n")}
        </ReactMarkdown>
      </div>
    </div>
  );
}
