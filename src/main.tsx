import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {NextUIProvider} from '@nextui-org/react';
import {ThemeProvider as NextThemesProvider} from "next-themes";
import App from "./App";
import Home from "./pages/Home.tsx";
import Error from "./pages/Error.tsx";
import UserPost, {searchPostAction, UPLoader} from "./pages/UserPost.tsx";
import NavigationHeader from "./components/NavigationHeader.tsx";
import About from "./pages/About.tsx";
import UserPostContent, {UPCLoader} from "./pages/secondary/UserPostContent.tsx";
import Config from "./pages/Config.tsx";
import Friends from "./pages/Friends.tsx";
import FriendsContent from "./pages/secondary/FriendsContent.tsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/userpost",
        element: <UserPost />,
        loader: UPLoader,
        action: searchPostAction,
        children: [
          {
            path: "/userpost/:un/:page",
            element: <UserPostContent />,
            loader: UPCLoader,
            action: searchPostAction,
          },

          ],
      },
      {
        path: "/friends",
        element: <Friends />,
        loader: UPLoader,
        // action: searchPostAction,
        children: [
          {
            path: "/friends/:un/:page",
            element: <FriendsContent />,
            // loader: UPCLoader,
            // action: searchPostAction,
          },
        ]
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/config",
        element: <Config />,
      },
    ],
  },


]);


ReactDOM.createRoot(document.getElementById("root")  as HTMLElement).render(
  <React.StrictMode>
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <NavigationHeader />
        <RouterProvider router={router} />
      </NextThemesProvider>
    </NextUIProvider>
  </React.StrictMode>
);

// const rootElement = document.getElementById("root") as HTMLElement;
// const root = ReactDOMClient.createRoot(rootElement);
//
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <NextUIProvider>
//         <NavigationHeader />
//         <FirstViewModal />
//         <App />
//       </NextUIProvider>
//     </BrowserRouter>
//   </React.StrictMode>,
// );

// <NavigationHeader />
// <FirstViewModal />