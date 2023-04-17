import React from 'react';
import NavBar from './components/NavBar';
import { useSelector } from "react-redux";
import { setProgress } from "./redux/ActionCreator";
import LoadingBar from 'react-top-loading-bar';
import Cards from './components/Card';
const App = () => {
  const progress = useSelector((state) => state.progress);

  return (
    <div>
      <LoadingBar
        color='#D27685'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <NavBar />
      <Cards />
    </div>
  );
};

export default App;
