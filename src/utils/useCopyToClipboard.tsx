import { useState, useEffect } from "react";

type CopyFn = (text: string) => void;
type Copied = boolean;

const useCopyToClipboard = (): [CopyFn, Copied] => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 1800);
    }
  }, [copied]);

  const CopyToClipboard: CopyFn = (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
    }

    navigator.clipboard
      .writeText(text)
      .then(() => setCopied(true))
      .catch((err) => console.warn("Copy failed", err));
  };

  return [CopyToClipboard, copied];
};

export default useCopyToClipboard;
