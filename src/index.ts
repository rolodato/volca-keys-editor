if (!navigator.requestMIDIAccess) {
  onMIDIFailure();
} else {
  navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
}

function onMIDIFailure() {
  alert("Your browser does not support Web MIDI. Please use the latest version of Google Chrome.");
}

function onMIDISuccess(midiAccess: WebMidi.MIDIAccess) {

}
