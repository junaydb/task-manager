import * as React from "react";
import Home from "./Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-background">
          <header className="border-b bg-white">
            <div className="container mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold">Task Management</h1>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            <Home />
          </main>
          <footer className="border-t bg-muted mt-8">
            <div className="container mx-auto px-4 py-4">
              <p className="text-sm text-muted-foreground">© 2024 Task Management System</p>
            </div>
          </footer>
        </div>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
