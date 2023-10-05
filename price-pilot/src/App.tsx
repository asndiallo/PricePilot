import { ThemeProvider } from '@/components/providers/theme-provider'
import Navbar from '@/components/navbar/navbar'

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

// Pages
import HomePage from '@/pages/home/home';
import PredictorPage from '@/pages/predictor';
import { ModalProvider } from './components/providers/modal-provider';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/predictor" element={<PredictorPage />} />
      </Route>
    )
  );
  

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <ModalProvider />
          <RouterProvider router={router} />
      </ThemeProvider>
    </>
  )
}

export default App
