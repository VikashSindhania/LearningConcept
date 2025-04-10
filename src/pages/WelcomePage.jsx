import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { toggleDarkTheme } from "../redux/themeSlice";
import { useDispatch, useSelector } from "react-redux";

const WelcomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigation = () => {
    navigate("/state-management");
  };
  const handleCssNavigation = () => {
    navigate("/learningCss");
  };

  const handleResponsiveCssNavigation = () => {
    navigate("/responsiveCss");
  };

  const handleDarkTheme = () => {
    dispatch(toggleDarkTheme());
  };

  const darkTheme = useSelector((state) => state.theme.darkTheme);

  const handleCounterPage = () => {
    navigate("/counter");
  };

  const handleCounterReduxPage = () => {
    navigate("/counterRedux");
  };

  const handleCountriesFlagPage = () => {
    navigate("/countries");
  };

  const handleCardPage = () => {
    navigate("/form");
  };

  const handleBallCssGamePage = () => {
    navigate("/ballCssGame");
  };

  const handleVariousInputPage = () => {
    navigate("/variousInput");
  };

  const handleVariousCardPage = () => {
    navigate("/variousCard");
  };

  const handleVariousGridPage = () => {
    navigate("/variousGrid");
  };

  const handleVariousTablePage = () => {
    navigate("/variousTable");
  };

  const handleVariousFormPage = () => {
    navigate("/variousForm");
  };

  const handleVariousFlexCasesPage = () => {
    navigate("/variousFlexCases");
  };

  const handleVariousFlexConceptPage = () => {
    navigate("/variousFlexConcept");
  };

  const handleVariousDivCasesPage = () => {
    navigate("/variousDivCases");
  };

  const handlePlayWithElementsPage = () => {
    navigate("/playWithElements");
  };

  const handleHooksPage = () => {
    navigate("/hooks");
  };

  const handleUseEffectHookPage = () => {
    navigate("/useEffectHook");
  };

  const handleUseHookPage = () => {
    navigate("/useHook");
  };

  const handleUseLayoutEffectHookPage = () => {
    navigate("/useLayoutEffectHook");
  };

  const handleUseMemoHookPage = () => {
    navigate("/useMemoHook");
  };

  const handleReactMemoPage = () => {
    navigate("/reactMemo");
  };

  const handleUseContextHookPage = () => {
    navigate("/useContextHook");
  };

  const handleUseCallbackHookPage = () => {
    navigate("/useCallbackHook");
  };

  const handleUseReferenceHookPage = () => {
    navigate("/useReferenceHook");
  };

  const handleUseReducerHookPage = () => {
    navigate("/useReducerHook");
  };

  return (
    <>
      <div
        className={`w-full  m-2 h-10 ${
          darkTheme ? "bg-gray-900 text-white" : ""
        }`}
      >
        <h1 className="text-2xl font-bold text-center">Welcome to the App</h1>

        {/* Toggle button to make dark theme with concept of React-redux */}
        <button
          onClick={handleDarkTheme}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md flex justify-center w-[200px] sm:w-[100px] md:w-[200px] mx-2 sm:mr-10 sm:ml-auto"
        >
          Toggle Dark Theme
        </button>

        <div className=" w-[550px] flex flex-col ">
          <button
            onClick={handleNavigation}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md flex  justify-center w-[500px] m-2 shadow-lg"
          >
            Go to State Management
          </button>
          <button
            onClick={handleCssNavigation}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md flex  justify-center w-[500px] m-2"
          >
            Go to Learning Css
          </button>
          <button
            onClick={handleResponsiveCssNavigation}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md flex  justify-center w-[500px] m-2"
          >
            Go to Responsive Css
          </button>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md justify-center w-[500px] m-2 p-2"
            onClick={handleCounterPage}
          >
            Counter App
          </button>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white flex rounded-md justify-center w-[500px] m-2 p-2"
            onClick={handleCounterReduxPage}
          >
            Counter Redux
          </button>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white flex rounded-md justify-center w-[500px] m-2 p-2"
            onClick={handleCountriesFlagPage}
          >
            Countries Flag
          </button>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white flex rounded-md justify-center w-[500px] m-2 p-2"
            onClick={handleCardPage}
          >
            Form
          </button>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white flex rounded-md justify-center w-[500px] m-2 p-2"
            onClick={handleBallCssGamePage}
          >
            Ball Css Game
          </button>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white flex rounded-md justify-center w-[500px] m-2 p-2"
            onClick={handleVariousInputPage}
          >
            Various Input Element
          </button>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white flex rounded-md justify-center w-[500px] m-2 p-2"
            onClick={handleVariousCardPage}
          >
            Various Card
          </button>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white flex rounded-md justify-center w-[500px] m-2 p-2"
            onClick={handleVariousGridPage}
          >
            Various Grid
          </button>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white flex rounded-md justify-center w-[500px] m-2 p-2"
            onClick={handleVariousTablePage}
          >
            Various Table
          </button>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white flex rounded-md justify-center w-[500px] m-2 p-2"
            onClick={handleVariousFormPage}
          >
            Various Form
          </button>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white flex rounded-md justify-center w-[500px] m-2 p-2"
            onClick={handleVariousFlexCasesPage}
          >
            Various Flex Cases
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white flex rounded-md justify-center w-[500px] m-2 p-2"
            onClick={handleVariousFlexConceptPage}
          >
            Various Flex Concept
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white flex rounded-md justify-center w-[500px] m-2 p-2"
            onClick={handleVariousDivCasesPage}
          >
            Various Div Cases
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white flex rounded-md justify-center w-[500px] m-2 p-2"
            onClick={handlePlayWithElementsPage}
          >
            Play with Elements
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white flex rounded-md justify-center w-[500px] m-2 p-2"
            onClick={handleHooksPage}
          >
            Hooks
          </button>
        </div>
      </div>

      <div className=" justify-center  w-1/4 mx-auto my-6 align-center">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white  rounded-md justify-center w-[500px] m-2 p-2"
          onClick={handleUseEffectHookPage}
        >
          useEffect Hook
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white  rounded-md justify-center w-[500px] m-2 p-2"
          onClick={handleUseHookPage}
        >
          UseHook
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white  rounded-md justify-center w-[500px] m-2 p-2"
          onClick={handleUseLayoutEffectHookPage}
        >
          UseLayoutEffectHook
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white  rounded-md justify-center w-[500px] m-2 p-2"
          onClick={handleUseMemoHookPage}
        >
          UseMemoHook
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white  rounded-md justify-center w-[500px] m-2 p-2"
          onClick={handleReactMemoPage}
        >
          ReactMemo
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white  rounded-md justify-center w-[500px] m-2 p-2"
          onClick={handleUseContextHookPage}
        >
          UseContextHook
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white  rounded-md justify-center w-[500px] m-2 p-2"
          onClick={handleUseCallbackHookPage}
        >
          UseCallbackHook
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white  rounded-md justify-center w-[500px] m-2 p-2"
          onClick={handleUseReferenceHookPage}
        >
          UseReferenceHook
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white  rounded-md justify-center w-[500px] m-2 p-2"
          onClick={handleUseReducerHookPage}
        >
          UseReducerHook
        </button>
      </div>
    </>
  );
};

export default WelcomePage;
