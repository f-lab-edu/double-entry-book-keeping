import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { MaterialUiProviders } from "./providers/MaterialUiProviders";
import { Layout } from "./layouts/Layout";

function App() {
  return (
    <>
      <MaterialUiProviders>
        <Layout></Layout>
      </MaterialUiProviders>
    </>
  );
}

export default App;
