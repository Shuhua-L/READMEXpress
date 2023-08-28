"use client";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import InputForms from "@/components/InputForms";
import CopyClipboard from "@/components/Clipboard";

import { useAppSelector, useAppDispatch } from "@/store";
import { fetchTemplate, updatedDocument } from "@/store/documentSlice";

export default function Home() {
  const document = useAppSelector(updatedDocument);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTemplate());
  }, [dispatch]);

  return (
    <div className='px-4 md:flex flex-auto'>
      <div className='bg-neutral-content md:w-1/2 mb-[1vh] max-h-[92vh] min-h-[45vh] md:overflow-y-scroll'>
        <InputForms />
      </div>
      <div className='md:w-1/2 mb-[1vh] max-h-[92vh] min-h-[45vh] md:overflow-y-scroll p-2'>
        <CopyClipboard />
        <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} className='prose'>
          {document}
        </ReactMarkdown>
      </div>
    </div>
  );
}
