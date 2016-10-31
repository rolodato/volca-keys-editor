import * as React from "react";
import * as ReactDOM from "react-dom";
import { MidiDevice } from "./MidiDevice";
import { Parameter } from "./Parameter";
import { Patch } from "./Patch";

if (!navigator.requestMIDIAccess) {
  onMIDIFailure();
} else {
  navigator.requestMIDIAccess()
    .then(midi => {
      const originalParameters = [{
        name: "Voice",
        cc: 40,
        range: 7,
        initialValue: 0
      }, {
        name: "Octave",
        cc: 41,
        range: 6,
        initialValue: 66
      }, {
        name: "Detune",
        cc: 42,
        range: 127,
        initialValue: 0
      }, {
        name: "Portamento",
        cc: 5,
        range: 127,
        initialValue: 0
      }, {
        name: "EG INT",
        cc: 43,
        range: 127,
        initialValue: 0
      }, {
        name: "Cutoff",
        cc: 44,
        range: 127,
        initialValue: 127
      }, {
        name: "EG INT",
        cc: 45,
        range: 127,
        initialValue: 0
      }, {
        name: "Rate",
        cc: 46,
        range: 127,
        initialValue: 0
      }, {
        name: "Pitch INT",
        cc: 47,
        range: 127,
        initialValue: 0
      }, {
        name: "Cutoff INT",
        cc: 48,
        range: 127,
        initialValue: 0
      }, {
        name: "Attack",
        cc: 49,
        range: 127,
        initialValue: 0
      }, {
        name: "Decay/Release",
        cc: 50,
        range: 127,
        initialValue: 0
      }, {
        name: "Sustain",
        cc: 51,
        range: 127,
        initialValue: 127
      }, {
        name: "Time",
        cc: 52,
        range: 127,
        initialValue: 0
      }, {
        name: "Feedback",
        cc: 53,
        range: 127,
        initialValue: 0,
      }];
      let parameters;
      if (window.location.hash) {
        try {
          parameters = Patch.fromString(window.location.hash.replace("#", ""), originalParameters);
        } catch (e) {
          parameters = originalParameters;
        }
      } else {
        parameters = originalParameters;
      }
      ReactDOM.render(<MidiDevice midi={midi} parameters={parameters} />, document.getElementById("root"));
    }).catch(onMIDIFailure);
}

function onMIDIFailure(e?) {
  alert("Your browser does not support Web MIDI. Please use the latest version of Google Chrome.");
  console.error(e);
}
