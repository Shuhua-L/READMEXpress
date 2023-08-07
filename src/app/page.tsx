"use client";
import { useState } from "react";
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

  const [document, setDocument] = useState([str]);

  const updateDocument = (doc: string) => {
    setDocument([...document, doc]);
  };

  return (
    <div className='px-4 gap-4 md:flex flex-auto'>
      <div className='bg-neutral-content w-4/5 mx-auto md:w-1/2 mb-4'>
        <InputForms document={document} updateDocument={updateDocument} />
      </div>
      <div className='bg-accent-focus w-4/5 mx-auto md:w-1/2 mb-4'>
        <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} className='prose'>
          {document.join("")}
        </ReactMarkdown>
      </div>
    </div>
  );
}
