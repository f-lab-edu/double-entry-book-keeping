import { MaterialUiProviders } from "./providers/MaterialUiProviders";
import { Layout } from "./layouts/Layout";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <MaterialUiProviders>
      <Layout>
        <Outlet />
      </Layout>
    </MaterialUiProviders>
  );
}

export default Root;
