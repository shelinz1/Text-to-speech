import React from "react";
import Textspeech from "./components/Textspeech";
import "./App.css";

const App = () => {
  //speech synthesis
  const synth = window.speechSynthesis;

  //get voicess and fill option with voices and languages
  const getVoices = (voices) => {
    voices = synth.getVoices();
    return voices;
  };

  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
  }

  getVoices();

  return (
    <div className="container">
      <div className="text-white text-center mt-4">
        <div className="text-speech">
          {/* Text-to-speech component */}
          <Textspeech synth={synth} voices={getVoices()} />
        </div>
      </div>
    </div>
  );
};

export default App;
