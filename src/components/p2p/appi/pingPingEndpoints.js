export default () => ({
  ping: () => [
    (request, response, next) => {
      console.log("user request", {
        payload: request.payload,
        sender: request.sender,
      });

      next();
    },
    (request, response, next) => {
      console.log("user response", {
        payload: response.payload,
        sender: response.sender,
      });

      response.send("pong", { message: "pong" });
    },
  ],
  pong: () => [
    (request, response, next) => {
      response.send({ message: "ping" });
    },
  ],
});
