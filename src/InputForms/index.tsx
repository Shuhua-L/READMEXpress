import Header from "./Header";
import About from "./About";
import GettingStarted from "./GettingStarted";
import Usage from "./Usage";
import Contributing from "./Contributing";

type Props = {
  updateContent: (doc: string, section: string) => void;
};

const InputForms = (props: Props) => {
  return (
    <div>
      <Header updateContent={props.updateContent} />
      <About updateContent={props.updateContent} />
      <GettingStarted updateContent={props.updateContent} />
      <Usage updateContent={props.updateContent} />
      <Contributing updateContent={props.updateContent} />
    </div>
  );
};

export default InputForms;
