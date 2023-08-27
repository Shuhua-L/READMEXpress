import Header from "./Header";
import About from "./About";
import GettingStarted from "./GettingStarted";
import Usage from "./Usage";
import Contributing from "./Contributing";

import dynamic from "next/dynamic";
const Technologies = dynamic(() => import("./Technologies"), { ssr: false });

const InputForms = () => {
  return (
    <div>
      <Header section='header' />
      <About section='about' />
      <Technologies section='tech' />
      <GettingStarted section='getting-started' />
      <Usage section='usage' />
      <Contributing section='contributing' />
    </div>
  );
};

export default InputForms;
