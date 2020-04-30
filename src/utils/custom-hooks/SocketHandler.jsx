import * as React from "react";
import socket from "socket.io-client";
import { DEFAULT_USER_AUTH } from "../Consts";
import { authContext } from "../../contexts/AuthContext";

const useSocket = (serverUrl, topic) => {
  const { auth } = React.useContext(authContext);
  const [note, setNote] = React.useState(null);
  const [isConnected, setConnected] = React.useState(false);
  const client = socket.connect(serverUrl);

  React.useEffect(() => {
    if(auth.id !== DEFAULT_USER_AUTH.id) {
      
      client.on("connect", () => setConnected(true));
      client.on("disconnect", () => setConnected(false));
      
      if(!isConnected) {
        client.on(topic, data => {
          setNote(data);
        });
      }
    }
  }, [serverUrl, topic, isConnected]);

  return { note, isConnected, client };
};

export default useSocket;
