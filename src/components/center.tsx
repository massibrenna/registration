import { FC, useState, useEffect } from "react";
import Button from "./Button";
type Props = {
  title: string;
  children: JSX.Element | JSX.Element[] | string | string[];
  button: string;
};
const Center: FC<Props> = ({ title, children, button }) => {
  return (
    <div>
      <h1>{title}</h1>
      {children}
      <Button text={button}>
        <i>Some text here</i>
      </Button>
    </div>
  );
};

export default Center;
