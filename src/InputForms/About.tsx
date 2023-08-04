import React from "react";

type Props = {};

const About = (props: Props) => {
  return (
    <div className='collapse collapse-arrow bg-base-200'>
      {/* <input type='radio' name='current-document' /> */}
      <input type='checkbox' />
      <div className='collapse-title text-xl font-medium'>About</div>
      <div className='collapse-content'>
        <p>A form to enter project title and maybe logo</p>
      </div>
    </div>
  );
};

export default About;
