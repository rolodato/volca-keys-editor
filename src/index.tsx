import * as React from "react";
import * as ReactDOM from "react-dom";
import { Parameter } from "./parameter";

if (!navigator.requestMIDIAccess) {
  onMIDIFailure();
} else {
  navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
}

function onMIDIFailure() {
  alert("Your browser does not support Web MIDI. Please use the latest version of Google Chrome.");
}

function onMIDISuccess(midi: WebMidi.MIDIAccess) {
  if (midi.outputs.size === 0) {
    alert("No MIDI output interfaces detected");
  }
  const test = <h1>yo</h1>;
}

ReactDOM.render(
  <div>
    <fieldset>
      <legend>VCO</legend>
      <Parameter
        name="Voice"
        cc="40"
        range="7" />
      <Parameter
        name="Octave"
        cc="41"
        range="6" />
      <Parameter
        name="Detune"
        cc="42" />
      <Parameter
        name="Portamento"
        cc="5" />
      <Parameter
        name="EG INT"
        cc="43" />
    </fieldset>
    <fieldset>
      <legend>VCF</legend>
      <Parameter
        name="Cutoff"
        cc="44"
        initialValue="127" />
      <Parameter
        name="Peak" />
      <Parameter
        name="EG INT"
        cc="45" />
    </fieldset>
    <fieldset>
      <legend>LFO</legend>
      <Parameter
        name="Rate"
        cc="46" />
      <Parameter
        name="Pitch INT"
        cc="47" />
      <Parameter
        name="Cutoff INT"
        cc="48" />
    </fieldset>
    <fieldset>
      <legend>EG</legend>
      <Parameter
        name="Attack"
        cc="49" />
      <Parameter
        name="Decay/Release"
        cc="50" />
      <Parameter
        name="Sustain"
        cc="51" />
    </fieldset>
    <fieldset>
      <legend>Delay</legend>
      <Parameter
        name="Time"
        cc="52" />
      <Parameter
        name="Feedback"
        cc="53" />
    </fieldset>
  </div>,
  document.getElementById("root")!
);

const cc = (channel: number) => (value: number) => (message: number) => {
  return [0xb0 + channel - 1, message, value];
};

function initialize(channel: number, output: WebMidi.MIDIOutput) {
  const controlMessage = cc(channel);
  [5, 40, 42, 43, 45, 46, 47, 48, 49, 50, 52, 53]
    .map(controlMessage(0))
    .forEach(m => output.send(m));
  [44, 51].map(controlMessage(127)).forEach(m => output.send(m));
}
