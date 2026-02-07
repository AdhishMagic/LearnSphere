import React from "react";
import Routes from "./Routes";
import { CourseProvider } from "./context/CourseContext";

function App() {
  return (
    <CourseProvider>
      <Routes />
    </CourseProvider>
  );
}

export default App;
