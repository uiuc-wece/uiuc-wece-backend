import * as utils from "./utils.js";
import * as strategies from "./strategies/index.js";

const pipe = (...functions) => (args) =>
  functions.reduce((arg, fn) => fn(arg), args);

const initializeAuthentication = (app) => {
  utils.setup();

  pipe(strategies.JWTStrategy)(app);
};

export { utils, initializeAuthentication, strategies };
