import { FC } from "react";
type Props = {
  text: string;
  children: JSX.Element | JSX.Element[] | string | string[];
};
const Button: FC<Props> = ({ text, children }) => {
  return (
    <button onClick={() => console.log("bobbyhadz.com")}>
      {text}
      {children}
    </button>
  );
};

export default Button;
