const chatController = require("../Controllers/chatController");
const userController = require("../Controllers/userController");

module.exports = function (io) {
  //io
  io.on("connection", async (socket) => {
    console.log("client connected", socket.id);

    socket.on("login", async (userName, cb) => {
      //Save user details
      try {
        const user = await userController.saveUser(userName, socket.id);
        const welcomeMessage = {
          chat: `${user.name} entered the chat.`,
          user: { id: null, name: "system" },
        };
        io.emit("message", welcomeMessage);
        cb({ ok: true, data: user });
      } catch (error) {
        cb({ ok: false, error: error.message });
      }
    });

    socket.on("sendMessage", async (message, cb) => {
      try {
        //find user by socket id
        const user = await userController.checkUser(socket.id);
        //save message with found user
        const newMessage = await chatController.saveChat(message, user);
        io.emit("message", newMessage);
        cb({ ok: true });
      } catch (error) {
        cb({ ok: false, error: error.message });
      }
    });

    socket.on("disconnect", () => {
      console.log("User is disconnected");
    });
  });
};
