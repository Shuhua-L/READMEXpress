import { FaClipboard, FaClipboardCheck } from "react-icons/fa";
import useCopyToClipboard from "@/utils/useCopyToClipboard";
import { useAppSelector } from "@/store";
import { updatedDocument } from "@/store/documentSlice";

const CopyClipboard = () => {
  const document = useAppSelector(updatedDocument);
  const [CopyToClipboard, copied] = useCopyToClipboard();
  return (
    <div
      className='tooltip tooltip-left tooltip-accent sticky md:top-3 left-[90%]'
      data-tip={`${copied ? "copied ✔︎" : "copy"}`}>
      <label
        className={`swap btn btn-sm btn-ghost shadow-xl
          ${copied ? "swap-active" : ""}`}
        onClick={() => CopyToClipboard(document)}>
        <FaClipboard className='h-5 w-5 fill-accent-focus swap-off' />
        <FaClipboardCheck className='h-5 w-5 fill-accent swap-on' />
      </label>
    </div>
  );
};

export default CopyClipboard;
