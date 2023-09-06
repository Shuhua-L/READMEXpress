import Header from "./Header";
import About from "./About";
import GettingStarted from "./GettingStarted";
import Usage from "./Usage";
import Contributing from "./Contributing";

import dynamic from "next/dynamic";
const Technologies = dynamic(() => import("./Technologies"), { ssr: false });

import { useAppSelector } from "@/store";
import CollapseForm from "../FormComponents/CollapseForm";
import { MovableList } from "../MovableList/SortableList";

const renderSection = (sectionKey: string) => {
  switch (sectionKey) {
    case "header":
      return <Header section='header' key={sectionKey} />;
    case "about":
      return <About section='about' key={sectionKey} />;
    case "tech":
      return <Technologies section='tech' key={sectionKey} />;
    case "getting-started":
      return <GettingStarted section='getting-started' key={sectionKey} />;
    case "usage":
      return <Usage section='usage' key={sectionKey} />;
    case "contributing":
      return <Contributing section='contributing' key={sectionKey} />;

    default:
      break;
  }
};

const InputForms = () => {
  const sections = useAppSelector((state) => state.document.sections);

  return (
    <div className='p-2'>
      {sections.map((sec) => renderSection(sec))}
      <div>
        <CollapseForm title='TEST'>
          <div className='p-4'>
            <MovableList />
          </div>
        </CollapseForm>
      </div>
    </div>
  );
};

export default InputForms;
