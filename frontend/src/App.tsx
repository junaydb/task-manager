import * as React from "react";
import * as GovUK from "govuk-react";
import Home from "./Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <GovUK.GlobalStyle />
        <GovUK.TopNav></GovUK.TopNav>
        <GovUK.Page.WidthContainer>
          <GovUK.Page.Main>
            <Home />
          </GovUK.Page.Main>
        </GovUK.Page.WidthContainer>
        <GovUK.Footer />
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
