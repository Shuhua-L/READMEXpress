"use client";
import { ChangeEvent, ChangeEventHandler, MouseEventHandler, useState } from "react";
import Header from "./Header";
import About from "./About";
import GettingStarted from "./GettingStarted";
import Usage from "./Usage";
import Contributing from "./Contributing";

type Props = {
  document: string[];
  updateDocument: (doc: string) => void;
};

const InputForms = (props: Props) => {
  const [activeTab, SetActiveTab] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // event.target.checked = false;
    console.log(event.target.checked);
    // if (event.target.checked) {
    //   SetActiveTab("");
    // } else {
    //   SetActiveTab(event.target.value);
    // }
    SetActiveTab(event.target.value);
  };

  return (
    <div>
      <Header updateDocument={props.updateDocument} />
      <About updateDocument={props.updateDocument} />
      <GettingStarted updateDocument={props.updateDocument} />
      <Usage updateDocument={props.updateDocument} />
      <Contributing updateDocument={props.updateDocument} />
    </div>
  );
};

export default InputForms;
