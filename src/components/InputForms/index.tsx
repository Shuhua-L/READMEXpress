import Header from "./Header";
import About from "./About";
import GettingStarted from "./GettingStarted";
import Usage from "./Usage";
import Contributing from "./Contributing";

import dynamic from "next/dynamic";
const Technologies = dynamic(() => import("./Technologies"), { ssr: false });

import { useAppSelector } from "@/store";
import { sectionKeySelector } from "@/store/documentSlice";

const renderSection = (sectionName: string) => {
  switch (sectionName) {
    case "header":
      return <Header section='header' />;
    case "about":
      return <About section='about' />;
    case "tech":
      return <Technologies section='tech' />;
    case "getting-started":
      return <GettingStarted section='getting-started' />;
    case "usage":
      return <Usage section='usage' />;
    case "contributing":
      return <Contributing section='contributing' />;

    default:
      break;
  }
};

const InputForms = () => {
  const sectionKeys = useAppSelector(sectionKeySelector);

  return <div className='p-2'>{sectionKeys.map((sec) => renderSection(sec))}</div>;
};

export default InputForms;
