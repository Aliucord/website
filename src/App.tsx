import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import Plugins from "@/pages/Plugins";
import Themes from "@/pages/Themes";
import FAQ from "@/pages/FAQ";
import Documentation from "@/pages/Documentation";
import About from "@/pages/About";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <Navbar />
      <main className="flex-grow bg-transparent">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/plugins" component={Plugins} />
          <Route path="/themes" component={Themes} />
          <Route path="/faq" component={FAQ} />
          <Route path="/documentation" component={Documentation} />
          <Route path="/about" component={About} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;