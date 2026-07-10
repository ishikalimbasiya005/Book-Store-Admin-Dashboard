import { RouterProvider } from "react-router-dom";
import { routes } from "./Routes";
import { useEffect } from 'react';
import { useAppSelector } from './Store/Hooks';

function App() {
  const theme = useAppSelector((s) => s.layout.theme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return <RouterProvider router={routes} />;
}

export default App;
