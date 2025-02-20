import ClientError from "components/feedback/ClientError";
import UpdateApp from "components/feedback/UpdateApp";
import NotAuthenticatedRoute from "components/routes/NotAuthenticatedRoute";
import { lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  ScrollRestoration,
  useRouteError,
} from "react-router-dom";
import NotFound from "./components/feedback/NotFound";
import NoPermission from "components/feedback/NoPermission";
import AuthenticatedRoute from "./components/routes/AuthenticatedRoute";

const Accounting = lazy(() => import("features/Accounting"));
const AccountingDetails = lazy(() => import("features/AccountingDetails"));
const GeneralSettings = lazy(() => import("features/GeneralSettings"));
const Model = lazy(() => import("features/Model"));
const Layout = lazy(() => import("features/Layout"));
const Login = lazy(() => import("./features/Login"));
const Account = lazy(() => import("./features/Account"));
const Branch = lazy(() => import("./features/Branch"));
const Bus = lazy(() => import("./features/Bus"));
const Country = lazy(() => import("./features/Country"));
const City = lazy(() => import("./features/City"));
const Owner = lazy(() => import("./features/Owner"));
const Region = lazy(() => import("./features/Region"));
const Tour = lazy(() => import("./features/Tours"));
const Customer = lazy(() => import("./features/Customer"));
const Permissions = lazy(() => import("./features/Permissions"));
const About = lazy(() => import("features/About"));
const Policy = lazy(() => import("features/Policy"));
const Version = lazy(() => import("features/Versions"));
const Home = lazy(() => import("features/Home"));
const TourReservations = lazy(() => import("features/Tours/Reservations"));

export default createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<WithScroll />} errorElement={<ErrorBoundary />}>
      <Route element={<NotAuthenticatedRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<AuthenticatedRoute />}>
        <Route element={<Layout />}>
          <Route errorElement={<ErrorBoundary />}>
            <Route path="" element={<Home />} />
            <Route path="countries" element={<Country />} />
            <Route path="cities" element={<City />} />
            <Route path="regions" element={<Region />} />
            <Route path="branches" element={<Branch />} />
            <Route path="owners" element={<Owner />} />
            <Route path="models" element={<Model />} />
            <Route path="buses" element={<Bus />} />
            <Route path="tours" element={<Tour />} />
            <Route
              path="tours/:id/reservations"
              element={<TourReservations />}
            />
            <Route path="customers" element={<Customer />} />
            <Route path="admins" element={<Account />} />
            <Route path="permissions" element={<Permissions />} />
            <Route path="cash" element={<Accounting />} />
            <Route path="online" element={<Accounting />} />
            <Route path="cash/:id" element={<AccountingDetails />} />
            <Route path="about" element={<About />} />
            <Route path="policy" element={<Policy />} />
            <Route path="version" element={<Version />} />
            <Route path="general" element={<GeneralSettings />} />
            <Route path="403" element={<NoPermission />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Route>
    </Route>
  )
);
function ErrorBoundary() {
  const error = useRouteError() as any;
  if (
    error instanceof Error &&
    (error.message.includes("Failed to fetch dynamically imported module") ||
      error.message.includes("Importing a module script failed"))
  ) {
    return <UpdateApp />;
  }
  return (
    <ClientError
      message={error.toString()}
      retry={() => window.location.reload()}
    />
  );
}
function WithScroll() {
  return (
    <>
      <Outlet />
      <ScrollRestoration
        getKey={({ pathname }) => {
          return pathname;
        }}
      />
    </>
  );
}
