# Goofy Websocket SSH Bridge

A tool proxies incoming websocket connections to a tcp address and port. (In this case it redirects to an ssh server with a port)

NOTE: This should be used with the [Goofy Websocket SSH Client](https://github.com/marceldobehere/Goofy-SSH)!

## How to change the address / port
You can change the constant variables in the `index.js` file before running it:
```js
const LOCAL_SSH_SERVER_HOST = 'marceldobehere.com';
const LOCAL_SSH_SERVER_PORT = 2222;
```

## How to run

To run it, just enter run `npm i` and then `npm run start`.

This will launch a normal websocket server on port 80.



You can also run a secure websocket server on port 443 by using `npm run start-https`.

NOTE: The C# SSH Client has issues communicating with NodeJS secure websocket servers!

## Thanks to 
* [ws](https://www.npmjs.com/package/ws)
