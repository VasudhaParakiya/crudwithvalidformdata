import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import AddData from "./AddData";
import GetData from "./GetData";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<GetData></GetData>}></Route>
      <Route path="/addData" element={<AddData></AddData>}></Route>
      <Route path="/addData/:id" element={<AddData></AddData>}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
