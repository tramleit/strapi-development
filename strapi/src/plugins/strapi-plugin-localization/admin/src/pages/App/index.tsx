import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { NotFound, LoadingIndicatorPage } from "@strapi/helper-plugin";
import pluginId from "../../pluginId";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import View from "../View";

const queryClient = new QueryClient();
const loadingIndicatorPage = LoadingIndicatorPage;

const App = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={loadingIndicatorPage}>
          <Switch>
            <Route path={`/plugins/${pluginId}`} component={View} exact />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </QueryClientProvider>
    </div>
  );
};

export default App;
