"use client";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import rehypeRaw from "rehype-raw";

import InputForms from "@/InputForms";
import getLiteral from "@/InputForms/Literals";
import template from "@/data/template";
import generateTableOfContents from "@/utils/generateTOC";
import type { TTemplate, Map } from "@/types";
import { BiPaste } from "react-icons/bi";
import useCopyToClipboard from "@/utils/useCopyToClipboard";

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
    "about",
    "getting-started",
    "usage",
    "contributing",
  ]);
  const [contents, setContents] = useState({} as Map);
  const [showTOC, setShowTOC] = useState(true);
  const [value, CopyToClipboard] = useCopyToClipboard();

  useEffect(() => {
    const initContent = (template: TTemplate) => {
      return sections.reduce((doc, sec) => {
        let { title, default: defaultData } = template[sec];
        let literalTemplate = getLiteral({ section: sec, props: { title, ...defaultData } });
        doc[sec] = literalTemplate;
        return doc;
      }, {} as Map);
    };
    setContents(initContent(template));
  }, [sections]);

  const updateDocument = () => {
    let res = sections.filter((sec) => sec !== undefined).map((sec: string) => contents[sec]);
    if (showTOC && Object.keys(contents).length > 0) {
      // res.splice(1, 0, generateTableOfContents(res.join("\n")));
      res.splice(1, 0, "## Table of Contents");
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
      <div className='bg-accent-focus md:w-1/2 mb-[1vh] max-h-[92vh] min-h-[45vh] md:overflow-y-scroll relative'>
        <button
          type='button'
          onClick={() => {
            CopyToClipboard(updateDocument());
          }}
          className='absolute top-3 right-2.5 btn btn-sm btn-square'>
          <BiPaste className='h-5 w-5' />
          <span className='sr-only'>Copy To Clipboard</span>
        </button>
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkGfm, [remarkToc, { tight: true }]]}
          className='prose'>
          {updateDocument()}
        </ReactMarkdown>
      </div>
    </div>
  );
}
