import "./App.css";
import Fader from "./components/Fader/Fader";

import React, { useState } from "react";
import { onMessageListener } from "./firebaseInit";
import Notifications from "./components/Notifications/Notifications";
import ReactNotificationComponent from "./components/Notifications/ReactNotification";
import Text from "../src/components/Text/Text";

function App() {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [payload, setPayload] = useState();

  console.log(show, notification);

  onMessageListener()
    .then((payload) => {
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      console.log(payload);
      setPayload(payload);
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <div className="App">
      {show ? (
        <ReactNotificationComponent
          title={notification.title}
          body={notification.body}
        />
      ) : (
        <></>
      )}
      <Notifications />
      <p>{payload}</p>
      <Text />
      <Fader text="Notification from firebase"></Fader>
    </div>
  );
}

export default App;
