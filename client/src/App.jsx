import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { useLocation } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";
import { Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";


  loadDevMessages();
  loadErrorMessages();

function App() {
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const [cookies] = useCookies(["auth_token"]);

  const httpLink = createHttpLink({
    uri: "/graphql",
  });

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: cookies?.auth_token ? `Bearer ${cookies.auth_token}` : "",
    },
  }));

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div className={isLanding ? "landing-background" : ""}>
        <Header />
          <main>
            <Outlet />
          </main>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
