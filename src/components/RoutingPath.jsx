import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import StateManagement from "./StateManagement";
import WelcomePage from "../pages/WelcomePage";
import LearningCss from "../pages/LearningCss";
import ResponsiveCss from "../pages/ResponsiveCss";
import Counter from "../pages/Counter";
import CounterRedux from "../pages/CounterRedux";
import Search from "../pages/Search";
import DebouncingSearch from "../pages/DebouncingSearch";
import Countries from "../pages/Countries";
import Form from "../pages/Form";
import BallCssGame from "../pages/BallCssGame";
import VariousInput from "../pages/VariousInput";
import VariousCard from "../pages/VariousCard";
import VariousGrid from "../pages/VariousGrid";
import VariousTable from "../pages/VariousTable";
import VariousForm from "../pages/VariousForm";
import VariousFlexCases from "../pages/VariousFlexCases";
import VariousFlexConcept from "../pages/VariousFlexConcept";
import VariousDivCases from "../pages/VariousDivCases";
import PlayWithElement from "../pages/PlayWithElement";
import Hooks from "../pages/Hooks";
import UseEffectHook from "../pages/UseEffectHook";
import UseHook from "../pages/UseHook";
import UseLayoutEffectHook from "../pages/UseLayoutEffectHook";
import UseMemoHook from "../pages/UseMemoHook";
import UseContextHook from "../pages/UseContextHook";
import ReactMemo from "../pages/ReactMemo";
import UseCallbackHook from "../pages/UseCallbackHook";
import UseReferenceHook from "../pages/UseReferenceHook";
import UseReducerHook from "../pages/UseReducerHook";
const RoutingPath = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/state-management" element={<StateManagement />} />
        <Route path="/learningCss" element={<LearningCss />} />
        <Route path="/responsiveCss" element={<ResponsiveCss />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/counterRedux" element={<CounterRedux />} />
        <Route path="/search" element={<Search />} />
        <Route path="/debounceSearch" element={<DebouncingSearch />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/form" element={<Form />} />
        <Route path="/ballCssGame" element={<BallCssGame />} />
        <Route path="/variousInput" element={<VariousInput />} />
        <Route path="/variousCard" element={<VariousCard />} />
        <Route path="/variousGrid" element={<VariousGrid />} />
        <Route path="/variousTable" element={<VariousTable />} />
        <Route path="/variousForm" element={<VariousForm />} />
        <Route path="/variousFlexCases" element={<VariousFlexCases />} />
        <Route path="/variousFlexConcept" element={<VariousFlexConcept />} />
        <Route path="/variousDivCases" element={<VariousDivCases />} />
        <Route path="/playWithElements" element={<PlayWithElement />} />
        <Route path="/hooks" element={<Hooks />} />
        <Route path="/useEffectHook" element={<UseEffectHook />} />
        <Route path="/useHook" element={<UseHook />} />
        <Route path="/useLayoutEffectHook" element={<UseLayoutEffectHook />} />
        <Route path="/useMemoHook" element={<UseMemoHook />} />
        <Route path="/useContextHook" element={<UseContextHook />} />
        <Route path="/reactMemo" element={<ReactMemo />} />
        <Route path="/useCallbackHook" element={<UseCallbackHook />} />
        <Route path="/useReferenceHook" element={<UseReferenceHook />} />
        <Route path="/useReducerHook" element={<UseReducerHook />} />
      </Routes>
    </Router>
  );
};

export default RoutingPath;
