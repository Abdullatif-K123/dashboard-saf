import { TopBarProgress } from "components/feedback/TopBarProgress";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import Providers from "./Providers";
import routes from "./routes";
function App() {
  return (
    <Providers>
      <Suspense fallback={<TopBarProgress />}>
        <RouterProvider router={routes} />
      </Suspense>
    </Providers>
  );
}

export default App;
