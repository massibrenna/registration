import { FC, useState, useEffect } from "react";

export interface IUser {
  name: string;
  id: number;
  age: number | string;
}
type Props = {
  configkeys: IUser[];
};
const Child: FC<Props> = ({ configkeys }) => {
  return (
    <>
      Config Child
      <div>
        <ul>
          {configkeys.map((obj) => (
            <li key={obj.id}> {obj.id} </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Child;
