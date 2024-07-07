import "./App.css";
import { RickAndMortyPage } from "./pages/rickAndMorty";
import { ErrorBoundary } from "./components/ErrorBoundary";

function App() {
  return (
    <>
      <ErrorBoundary>
        <RickAndMortyPage />
      </ErrorBoundary>
    </>
  );
}

export default App;
