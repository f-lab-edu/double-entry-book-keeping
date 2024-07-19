import { MaterialUiProviders } from "./providers/MaterialUiProviders";
import { Layout } from "./layouts/Layout";

function App() {
  return (
    <MaterialUiProviders>
      <Layout></Layout>
    </MaterialUiProviders>
  );
}

export default App;
