import Header from "./Header";
import About from "./About";
import GettingStarted from "./GettingStarted";
import Usage from "./Usage";
import Contributing from "./Contributing";
import Technologies from "./Technologies";

type Props = {
  updateContent: (doc: string, section: string) => void;
};

const InputForms = (props: Props) => {
  return (
    <div>
      <Header updateContent={props.updateContent} section='header' />
      <About updateContent={props.updateContent} section='about' />
      <Technologies updateContent={props.updateContent} section='tech' />
      <GettingStarted updateContent={props.updateContent} section='getting-started' />
      <Usage updateContent={props.updateContent} section='usage' />
      <Contributing updateContent={props.updateContent} section='contributing' />
    </div>
  );
};

export default InputForms;
