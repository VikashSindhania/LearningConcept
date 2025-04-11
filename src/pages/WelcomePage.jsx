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

  const handleReduxPage = () => {
    navigate("/redux");
  };

  return (
    <>
      <div
        className={`w-full min-h-screen p-4 ${
          darkTheme ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-center mb-4 sm:mb-0">
              Welcome to the App
            </h1>

            {/* Toggle button to make dark theme with concept of React-redux */}
            <button
              onClick={handleDarkTheme}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md w-full sm:w-auto"
            >
              Toggle Dark Theme
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={handleNavigation}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md shadow-lg"
            >
              Go to State Management
            </button>

            <button
              onClick={handleCssNavigation}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md"
            >
              Go to Learning Css
            </button>

            <button
              onClick={handleResponsiveCssNavigation}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md"
            >
              Go to Responsive Css
            </button>

            <button
              onClick={handleCounterPage}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md"
            >
              Counter App
            </button>

            <button
              onClick={handleCounterReduxPage}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md"
            >
              Counter Redux
            </button>

            <button
              onClick={handleCountriesFlagPage}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md"
            >
              Countries Flag
            </button>

            <button
              onClick={handleCardPage}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md"
            >
              Form
            </button>

            <button
              onClick={handleBallCssGamePage}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md"
            >
              Ball Css Game
            </button>

            <button
              onClick={handleVariousInputPage}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md"
            >
              Various Input Element
            </button>

            <button
              onClick={handleVariousCardPage}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md"
            >
              Various Card
            </button>

            <button
              onClick={handleVariousGridPage}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md"
            >
              Various Grid
            </button>

            <button
              onClick={handleVariousTablePage}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md"
            >
              Various Table
            </button>

            <button
              onClick={handleVariousFormPage}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md"
            >
              Various Form
            </button>

            <button
              onClick={handleVariousFlexCasesPage}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md"
            >
              Various Flex Cases
            </button>

            <button
              onClick={handleVariousFlexConceptPage}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md"
            >
              Various Flex Concept
            </button>

            <button
              onClick={handleVariousDivCasesPage}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md"
            >
              Various Div Cases
            </button>

            <button
              onClick={handlePlayWithElementsPage}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md"
            >
              Play with Elements
            </button>

            <button
              onClick={handleHooksPage}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md"
            >
              Hooks
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            <button
              onClick={handleUseEffectHookPage}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md"
            >
              useEffect Hook
            </button>

            <button
              onClick={handleUseHookPage}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md"
            >
              UseHook
            </button>

            <button
              onClick={handleUseLayoutEffectHookPage}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md"
            >
              UseLayoutEffectHook
            </button>

            <button
              onClick={handleUseMemoHookPage}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md"
            >
              UseMemoHook
            </button>

            <button
              onClick={handleReactMemoPage}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md"
            >
              ReactMemo
            </button>

            <button
              onClick={handleUseContextHookPage}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md"
            >
              UseContextHook
            </button>

            <button
              onClick={handleUseCallbackHookPage}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md"
            >
              UseCallbackHook
            </button>

            <button
              onClick={handleUseReferenceHookPage}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md"
            >
              UseReferenceHook
            </button>

            <button
              onClick={handleUseReducerHookPage}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md"
            >
              UseReducerHook
            </button>

            <button
              onClick={handleReduxPage}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md"
            >
              Redux
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
