import { ThemeProvider } from '@/components/theme-provider'
import Navbar from '@/components/navbar/navbar'

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar />}>
        {/* <Route path="home" element={<Contact />} /> */}
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
