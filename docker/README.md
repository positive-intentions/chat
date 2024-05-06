## IMPORTANT FOR DOCKER COMPOSE USERS:
docker-compose does not work at the moment. it is a work in progress. use at your own risk you will need to familiarize yourself with CSP headers.

when running your own peerjs-server (with docker-compose file) you need to update the index.html file found here: "src/index.html"

strong CSP headers are important for the security of this app. so search for the text "wss://0.peerjs.com" and either append or replace with your own host details then rebuild with `npm run build`.

the app is also using webpack 5 module federation for the cryptography component. so you will have to make the exception for the module found at https://cryptography.positive-intentions.com/remoteEntry.js.

i hope to fix these issues, but has been deprioritized for now.
