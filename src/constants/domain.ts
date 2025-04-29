const DEVELOPMENT_BASE_URL = "https://api.dev.safra-binakra.com";
const DEVELOPMENT_API_BASE_URL = "https://api.dev.safra-binakra.com/api";

const TEST_BASE_URL = 
"https://clickonline-sy.com"
// "https://api.test.safra-binakra.com";
const TEST_API_BASE_URL = "https://clickonline-sy.com/api"
//  "https://api.test.safra-binakra.com/api";

// const PRODUCTION_BASE_URL = `https://api.${
//   window.location.host.split("dashboard.")[1]
// }`;
const PRODUCTION_BASE_URL = `https://api.safra-binakra.com/`;
const PRODUCTION_API_BASE_URL = `${PRODUCTION_BASE_URL}/api`;

// const isProduction =
//   process.env.NODE_ENV === "production" && !window.location.host.includes("localhost");

const isProduction = false
;

export const SERVER_BASE_URL = isProduction
  ? PRODUCTION_BASE_URL
  : TEST_BASE_URL;
export const API_BASE_URL = isProduction
  ? PRODUCTION_API_BASE_URL
  : TEST_API_BASE_URL;
export const FILE_BASE_URL = "https://file.dev.safra-binakra.com/wwwroot";
