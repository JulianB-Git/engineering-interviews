import React from "react";

const AppContext = React.createContext<{
  repos: any[];
  handleToggle: (id: any) => void;
}>({
  repos: [],
  handleToggle: (id: any) => {},
});
export const AppProvider = AppContext.Provider;
export const AppConsumer = AppContext.Consumer;
export default AppContext;
