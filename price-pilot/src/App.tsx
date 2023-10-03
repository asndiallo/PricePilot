import { ThemeProvider } from '@/components/theme-provider'
import Navbar from '@/components/navbar/navbar'

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

// Pages
import HomePage from '@/pages/home/home';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    )
  );
  

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
      </ThemeProvider>
    </>
  )
}

export default App
