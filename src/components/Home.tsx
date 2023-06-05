import { FC, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getWithExpiry, setWithExpiry } from "./authenticator";
import CustomHeading from "./customHeading";
import Center from "./center";
import Button from "./Button";
import Config from "./config";
import Child from "./child";

const Home: FC = () => {
  const [authenticated, setauthenticated] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    const loggedInUser = getWithExpiry("authenticated"); //localStorage.getItem("authenticated");
    console.log(loggedInUser);
    if (loggedInUser) {
      console.log(loggedInUser);
      setauthenticated(true);
    } else {
      navigate("/login");
    }
  }, [authenticated]);
  const someArray = [
    { id: 5, name: "Laura", age: 23 },
    { id: 4, name: "Pamela", age: 54 },
    { id: 3, name: "Patricia", age: 43 },
  ];

  const buttonText = "some text dddd";
  return (
    <>
      {authenticated && (
        <>
          <div>
            <Center title={"il titolo"} button={buttonText}>
              <CustomHeading config={Config} title={"prova"} />
              <Child configkeys={someArray} />
            </Center>
            <p>Welcome to your Dashboard</p>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
