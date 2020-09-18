const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")([]);

const env = {
  API_URL: "http://localhost:3000/shop-api",
  ADMIN_API_URL: "http://localhost:3000/admin-api",
  ABSOLUTE_URL: "",
  PUBLIC_PATH: "/",
};

module.exports = withPlugins([withTM], {
  env,
});

module.exports.env = env;
