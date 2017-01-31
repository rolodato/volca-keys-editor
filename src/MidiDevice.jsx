import * as React from "react";
import { MidiParameter } from "./MidiParameter";
import { Patch } from "./Patch";

export class MidiDevice extends React.Component {

    constructor(props) {
        super(props);
        this.midiParams = [];
        this.state = {
            midiOut: props.midi.outputs.values().next().value,
            channel: 1
        };
        props.midi.onstatechange = () => {
            this.setState({
                midiOut: this.state.midiOut || props.midi.outputs.values().next().value,
                channel: this.state.channel || 1
            });
        };
        this.changeChannel = this.changeChannel.bind(this);
        this.changeDevice = this.changeDevice.bind(this);
        this.initialize = this.initialize.bind(this);
        this.parameterChanged = this.parameterChanged.bind(this);
    }

    changeChannel(event) {
        this.setState({
            midiOut: this.state.midiOut,
            channel: Number.parseInt(event.target.value)
        });
    }

    changeDevice(event) {
        this.setState({
            midiOut: this.props.midi.outputs.get(event.target.value),
            channel: this.state.channel
        });
    }

    render() {
        const devices = Array.from(this.props.midi.outputs.entries());
        const deviceOptions = devices.map(o => <option value={o[0]} key={o[0]}>{o[1].name}</option>);

        return (
            <div className="midi-device">
              <div className="midi-device__controls">
                <button onClick={this.initialize}>Initialize</button>
                <select name="channel" onChange={this.changeChannel}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(c => {
                        return <option value={c} key={c}>Channel {c}</option>;
                    })}
                </select>
                <select name="device" onChange={this.changeDevice}>
                    {deviceOptions.length > 0 ? deviceOptions : <option>No MIDI output devices</option>}
                </select>
              </div>
              <div className="volcakeys">
                <div className="volcakeys__top-panel">
                {this.props.parameters.map(p => {
                    return <MidiParameter
                        parameter={p}
                        midi={this}
                        key={p.cc}
                        ref={(param) => { this.midiParams.push(param); } }
                        />;
                })}
                </div>
              </div>
                <Patch parameters={this.midiParams} />
            </div>
        );
    }

    parameterChanged(param) {
        if (this.state.midiOut) {
            this.state.midiOut.send(param.toMidiBytes(this.state.channel));
        }
        this.forceUpdate();
    }

    initialize() {
        this.midiParams.forEach(param => param.initialize());
    }
}
