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

import { useAppSelector } from "@/store";
import { useAppDispatch } from "@/store";
import { setContents } from "@/store/features/documentSlice";

export default function Home() {
  const sections = useAppSelector((state) => state.document.sections);
  const showTOC = useAppSelector((state) => state.document.settings?.showTOC);
  const contents = useAppSelector((state) => state.document.contents);

  const dispatch = useAppDispatch();
  const [CopyToClipboard, copied] = useCopyToClipboard();

  //  TODO: populate document state with initialState and remove this useEffect
  useEffect(() => {
    const initContent = (template: TTemplate) => {
      return sections.reduce((doc, sec) => {
        let { title, default: defaultData } = template[sec];
        let literalTemplate = getLiteral({ section: sec, props: { title, ...defaultData } });
        doc[sec] = literalTemplate;
        return doc;
      }, {} as Map);
    };
    dispatch(setContents(initContent(template)));
  }, [sections, dispatch]);

  // TODO:
  const updateDocument = () => {
    let res = sections.filter((sec) => sec !== undefined).map((sec: string) => contents[sec]);
    if (showTOC && Object.keys(contents).length > 0) {
      res.splice(1, 0, generateTableOfContents(res.join("\n")));
    }
    return res.join("\n");
  };

  // console.log(updateDocument());

  return (
    <div className='px-4 md:flex flex-auto'>
      <div className='bg-neutral-content md:w-1/2 mb-[1vh] max-h-[92vh] min-h-[45vh] md:overflow-y-scroll'>
        <InputForms />
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
