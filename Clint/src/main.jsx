import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GoogleMapsLoader from "./api/GoogleMapsLoader";
import { AuthProvider } from "./Context/Provider/AuthProvider";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleMapsLoader>
        <AuthProvider>
          <RouterProvider router={router}></RouterProvider>
        </AuthProvider>
      </GoogleMapsLoader>
    </QueryClientProvider>
  </StrictMode>
);
