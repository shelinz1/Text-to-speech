import React, { useState } from "react";
import wave from "../wave.gif";
import { GiSoundWaves } from "react-icons/gi";
import { BiSpeaker } from "react-icons/bi";
import { AiOutlineComment } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";

const Textspeech = ({ synth, voices }) => {
  // console.log(voices);
  const [textArea, setTextArea] = useState("");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [selectedVoice, setselectedVoice] = useState(
    "Microsoft David Desktop - English (United States)"
  );
  const [backgroundAnimation, setbackgroundAnimation] = useState(false);

  const speak = (e) => {
    e.preventDefault();

    if (textArea !== "") {
      //set background if text exist
      setbackgroundAnimation(true);

      //to get speak text
      let utterance = new SpeechSynthesisUtterance(textArea);

      //when done speaking
      utterance.onend = (e) => {
        // console.log("done speaking");
        setbackgroundAnimation(false);
        // setTextArea("");
      };

      //when error occurs
      utterance.onerror = (e) => {
        console.log("An error has occured!!!");
      };

      //setting the voice rate and pitch
      utterance.rate = rate;
      utterance.pitch = pitch;

      //loop through voices
      voices.map((voice) => {
        if (voice.name === selectedVoice) {
          utterance.voice = voice;
        }
        return voice;
      });
      //calling the voice
      synth.speak(utterance);
    }
  };

  return (
    <div className="text-speech">
      {backgroundAnimation ? (
        <div className="image">
          <img src={wave} alt="background" className="background-image" />
        </div>
      ) : null}

      <div className="backgroundAnimation"></div>

      {/* icons descriptions */}
      <span className="pb-3">
        <AiOutlineComment size="100" color="blue" />
        <AiOutlineArrowRight size="50" color="blue" />
        <BiSpeaker size="100" color="blue" />
      </span>

      <form onSubmit={speak} className="form">
        <div className="form-group">
          <textarea
            className="form-control form-control-lg"
            name="input-value"
            placeholder="Type anything..."
            value={textArea}
            onChange={(e) => {
              setTextArea(e.target.value);
            }}
            autoComplete="on"
          ></textarea>
        </div>

        <div className="form-group mt-2">
          <label htmlFor="rate">Rate</label>
          <div id="rate-value" className="badge d-flex flex-row-reverse">
            {rate}
          </div>

          <input
            type="range"
            className="custom-range w-100"
            name="rate"
            min="0.5"
            max="2"
            value={rate}
            step="0.1"
            onChange={(e) => {
              setRate(e.target.value);
            }}
          />
        </div>

        <div className="form-group mt-2">
          <label htmlFor="pitch">Pitch</label>
          <div
            name="pitch"
            className="badge badge-danger  d-flex flex-row-reverse"
          >
            {pitch}
          </div>
          <input
            type="range"
            className="custom-range w-100"
            name="Pitch"
            min="0"
            max="2"
            value={pitch}
            step="0.1"
            onChange={(e) => setPitch(e.target.value)}
          />
        </div>

        <div className="form-group mt-2">
          <select
            className="form-control form-control-lg"
            value={selectedVoice}
            onChange={(e) => {
              setselectedVoice(e.target.value);
            }}
          >
            {voices &&
              voices.map((voice) => {
                return (
                  <option
                    data-name={voice.name}
                    key={`${voice.name} ${voice.lang}`}
                    value={`${voice.name}`}
                  >
                    {`${voice.name} ${voice.lang}`}
                  </option>
                );
              })}
          </select>
        </div>

        <button type="submit" className="btn btn-light btn-block w-100 mt-3">
          Speak
          <GiSoundWaves color="blue" size="30" />
        </button>
      </form>
    </div>
  );
};

export default Textspeech;
