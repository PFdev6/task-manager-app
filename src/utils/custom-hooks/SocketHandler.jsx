import * as React from "react";
import socket from "socket.io-client";

const useSocket = (serverUrl, topic) => {
  const [note, setNote] = React.useState({});
  const [isConnected, setConnected] = React.useState(false);

  React.useEffect(() => {
    const client = socket.connect(serverUrl);

    client.on("connect", () => setConnected(true));
    client.on("disconnect", () => setConnected(false));

    client.on(topic, data => {
      setNote(data);
    });
  }, [serverUrl, topic, isConnected]);

  return { note, isConnected };
};

export default useSocket;
