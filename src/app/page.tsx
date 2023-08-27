"use client";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { FaClipboard, FaClipboardCheck } from "react-icons/fa";

import InputForms from "@/components/InputForms";
import generateTableOfContents from "@/utils/generateTOC";
import useCopyToClipboard from "@/utils/useCopyToClipboard";

import { useAppSelector, useAppDispatch } from "@/store";
import { fetchTemplate } from "@/store/documentSlice";

export default function Home() {
  const updatedDocument = useAppSelector((state) => {
    const { sections, settings } = state.document;
    let res = sections.map((section) => section.content).join("\n");
    if (settings?.showTOC && sections.length > 0) {
      res = generateTableOfContents(res);
    }
    return res;
  });

  const dispatch = useAppDispatch();
  const [CopyToClipboard, copied] = useCopyToClipboard();

  useEffect(() => {
    dispatch(fetchTemplate());
  }, [dispatch]);

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
            onClick={() => CopyToClipboard(updatedDocument)}>
            <FaClipboard className='h-5 w-5 fill-accent-focus swap-off' />
            <FaClipboardCheck className='h-5 w-5 fill-accent swap-on' />
          </label>
        </div>
        <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} className='prose'>
          {updatedDocument}
        </ReactMarkdown>
      </div>
    </div>
  );
}
