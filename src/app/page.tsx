"use client";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import InputForms from "@/InputForms";
import getLiteral from "@/InputForms/Literals";
import template from "@/data/template";
import generateTableOfContents from "@/utils/generateTOC";
import type { TTemplate, Map } from "@/types";
import { FaClipboard, FaClipboardCheck } from "react-icons/fa";
import useCopyToClipboard from "@/utils/useCopyToClipboard";

export default function Home() {
  // indicates all existing sections and their order
  // update if DnD, add, or delete sections
  const [sections, setSections] = useState([
    "header",
    "about",
    "tech",
    "getting-started",
    "usage",
    "contributing",
  ]);
  const [contents, setContents] = useState({} as Map);
  const [CopyToClipboard, copied] = useCopyToClipboard();
  const [showTOC, setShowTOC] = useState(true);
  const [showBadges, setShowBadges] = useState(true);

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
    <div className='px-4 md:flex flex-auto'>
      <div className='bg-neutral-content md:w-1/2 mb-[1vh] max-h-[92vh] min-h-[45vh] md:overflow-y-scroll'>
        <InputForms updateContent={updateContent} />
      </div>
      <div className='md:w-1/2 mb-[1vh] max-h-[92vh] min-h-[45vh] md:overflow-y-scroll p-2'>
        <div
          className='tooltip tooltip-left tooltip-accent sticky md:top-3 left-[90%]'
          data-tip={`${copied ? "copied ✔︎" : "copy"}`}>
          <label
            className={`swap btn btn-sm btn-ghost shadow-xl
          ${copied ? "swap-active" : ""}
          `}
            onClick={() => CopyToClipboard(updateDocument())}>
            <FaClipboard className='h-5 w-5 fill-accent-focus swap-off' />
            <FaClipboardCheck className='h-5 w-5 fill-accent swap-on' />
          </label>
        </div>
        <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} className='prose'>
          {updateDocument()}
        </ReactMarkdown>
      </div>
    </div>
  );
}
