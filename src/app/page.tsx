"use client";
import { useState, useEffect } from "react";
import InputForms from "@/InputForms";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import generateTableOfContents from "@/utils/generateTOC";

interface Map {
  [key: string]: string | undefined;
}

export default function Home() {
  let str = `## Example Markdown `;
  str += `
  [Link](https://google.com)
  Man, imagine how *annoying* it would be to have to write **all** of
  this using HTML tags`;

  // indicates all existing sections and their order
  // update if DnD, add, or delete sections
  const [sections, setSections] = useState([
    "header",
    "TOC",
    "about",
    "getting-started",
    "usage",
    "contributing",
  ]);
  const [contents, setContents] = useState({} as Map);
  const [showTOC, setShowTOC] = useState(true);

  // const initSections = (template: []) => {
  //   return template.map((sec) => sec.name);
  // };

  const updateDocument = () => {
    let res = sections.filter((sec) => sec !== undefined).map((sec: string) => contents[sec]);
    if (showTOC && Object.keys(contents).length > 0) {
      res.splice(1, 0, generateTableOfContents(res.join("\n")));
    }
    return res.join("\n");
  };

  const updateContent = (doc: string, section: string) => {
    setContents({
      ...contents,
      [section]: doc,
    });
  };

  console.log(updateDocument());

  return (
    <div className='px-4 gap-4 md:flex flex-auto'>
      <div className='bg-neutral-content md:w-1/2 mb-[1vh] max-h-[92vh] min-h-[45vh] md:overflow-y-scroll'>
        <InputForms updateContent={updateContent} />
      </div>
      <div className='bg-accent-focus md:w-1/2 mb-[1vh] max-h-[92vh] min-h-[45vh] md:overflow-y-scroll'>
        <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} className='prose'>
          {updateDocument()}
        </ReactMarkdown>
      </div>
    </div>
  );
}
