module.exports = sockets => {
  sockets.on("connection", () => {
    console.info("--- User Connected ---");
  });
  
  sockets.on("disconnect", () => {
    console.info("--- User Disconnected ---");
  });


  const sendNote = (userId, data) => {
    sockets.emit(userId, data);
  };

  // add schedule
  setInterval(() => {
    console.log("message ==================");
    sendNote(30, { message: "helo" });
  }, 5000);
};
