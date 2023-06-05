import { FC, useState, useEffect } from "react";
import Config from "./config";
type Props = {
  title: string;
  config: typeof Config;
};
const CustomHeading: FC<Props> = ({ title, config }) => {
  return (
    <>
      customheading {title}
      <Config></Config>
    </>
  );
};

export default CustomHeading;
