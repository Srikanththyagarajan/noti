import React, { useState, useEffect } from "react";
import { getToken } from "../../firebaseInit.js";

const Notifications = (props) => {
  const [isTokenFound, setTokenFound] = useState(false);
  const [payload, setPayload] = useState();

  console.log("Token found", isTokenFound);

  // To load once
  useEffect(() => {
    let data;

    async function tokenFunc() {
      data = await getToken(setTokenFound);
      if (data) {
        console.log("Token is", data);
        setPayload(data);
      }
      return data;
    }

    tokenFunc();
  }, [setTokenFound, setPayload]);

  return <>
    <p style={{padding:'10px'}}>{payload}</p>
  </>;
};

Notifications.propTypes = {};

export default Notifications;
