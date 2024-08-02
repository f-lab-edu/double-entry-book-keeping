import { MaterialUiProviders } from "./providers/MaterialUiProviders";
import { Layout } from "./layouts/Layout";
import { Outlet } from "react-router-dom";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";

function Root() {
  return (
    <MaterialUiProviders>
      <ReactQueryProvider>
        <Layout>
          <Outlet />
        </Layout>
      </ReactQueryProvider>
    </MaterialUiProviders>
  );
}

export default Root;
