import controllers from "./controllers";

let API_ROUTES = {
  ACCOUNT: {
    root: controllers.CpUser,
    GET_ALL: "GetAll",
    //  "GetCpUsers",
    GET: "GetCpUserDetails",
    ACTION: "Action",
    // "ActionCpUserAccount",
    LOGIN: "SignIn",
    REMOVE: "RemoveCpAccount",
    GET_CSRF_TOKEN: "GetCsrfToken",
  },
  HOME: {
    root: controllers.HOME,
    GET: "GetHomeData",
    TOUR_CHART: "GetTourBranchChart",
  },
  BRANCH: {
    root: controllers.BRANCH,
    GET: "GetDetails",
    GET_ALL: "GetBranchs",
    PENDING_COUNTS: "GetPendingResultRealTime",
    GET_SELECT: "GetBranchSelect",
    CHANCE_RECORD_TYPE: "ChangeRecordTypeBranch",
    REMOVE: "Remove",
  },
  COUNTRY: {
    root: controllers.COUNTRY,
    GET_ALL: "GetAll",
    GET_SELECT: "GetCountries",
    GET: "GetDetails",
    ACTION: "Action",
    REMOVE: "Remove",
  },
  CITY: {
    root: controllers.CITY,
    GET_ALL: "GetAll",
    GET_SELECT: "GetCitiesByCountry",
    GET: "GetDetails",
    ACTION: "Action",
    REMOVE: "Remove",
  },
  REGION: {
    root: controllers.REGION,
    GET_ALL: "GetAll",
    GET: "GetDetails",
    GET_SELECT: "GetRegionsByCity",
    ACTION: "Action",
    REMOVE: "Remove",
  },
  OWNER: {
    root: controllers.OWNER,
    GET_ALL: "GetOwners",
    GET: "GetDetails",
    GET_SELECT: "GetOwnersSelect",
    CHANGE_IS_BLOCKED: "ChangeIsBlockedOwner",
    CHANGE_RECORD_TYPE: "UpdateRecordType",
  },
  MODEL: {
    root: controllers.MODEL,
    GET_ALL: "GetAll",
    GET_DETAILS: "GetDetails",
    ACTION: "Action",
    REMOVE: "Remove",
  },
  BUS: {
    root: controllers.BUS,
    GET_ALL: "GetBusess",
    GET: "GetDetails",
  },
  TOUR: {
    root: controllers.TOUR,
    GET_ALL: "GetToures",
    GET: "GetDetails",
  },
  CUSTOMER_TOUR: {
    root: controllers.TOUR_CUSTOMER,
    GET: "GetTourDetailsForCustomer",
    GET_CUSTOMERS: "GetTourCustomersByTourId",
    REMOVE_CUSTOMER: "RemoveCustomerFromTour",
    ACTION_CUSTOMER: "ActionCustomerInTour",
    GET_CUSTOMER_CHAIRS_REALTIME: "GetCustomerChairsRealTime",
  },
  CUSTOMER: {
    root: controllers.CUSTOMER,
    GET_ALL: "GetCustomers",
    GET: "GetDetails",
    CHANGE_IS_BLOCKED: "ChangeIsBlockedCustomer",
    CHANGE_RECORD_TYPE: "UpdateRecordType",
    DOWNLOAD_FILE: "ExportCustomersToExcel",
  },
  FILE: {
    root: controllers.FILE,
    REMOVE_UNUSED: "RemoveUnUsedFiles",
  },
  ACCOUNTING: {
    root: controllers.ACCOUNTING,
    GET_ALL: "GetDashBoardFiannce",
    GET_ALL_CASH: "GetDashBoardCashFinance",
    GET: "GetTourFiannce",
    ACTION: "CompanyConfirm",
  },
  Version: {
    root: controllers.VERSION,
    GET_ALL: "GetAll",
    GET: "GetDetails",
    DELETE: "Delete",
    ACTION_VERSION: "Action",
  },
  SETTINGS: {
    root: controllers.SETTINGS,
    GET_ABOUT: "GetAboutApp",
    ACTION_ABOUT: "ActionAboutApp",
    GET_POLICY: "GetPolicy",
    ACTION_POLICY: "ActionPolicy",
    GET_COMPANY_RATIO: "GetCompanyRatio",
    ACTION_COMPANY_RATIO: "ActionCompanyRatio",
  },
  PERMISSION: {
    root: controllers.PERMISSION,
    GET_ALL: "GetAll",
    GET_ROLE: "GetRolePermissions",
    GET: "GetDetails",
    ACTION: "Action",
    GET_PERMISSIONS: "GetRolePermissions",
  },
} as const;

const controllersArr = Object.entries(API_ROUTES).map(
  ([controllerKey, { root, ...routes }]) => {
    const routesArr = Object.entries(routes);
    const routesPrefixed = Object.fromEntries(
      routesArr.map(([routeKey, route]) => [routeKey, `${root}/${route}`])
    );
    return [controllerKey, { ...routesPrefixed, root }];
  }
);
API_ROUTES = Object.fromEntries(controllersArr) as typeof API_ROUTES;

export default API_ROUTES;
