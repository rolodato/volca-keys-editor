import * as React from "react";
import Knob from 'react-canvas-knob';
import { MidiDevice } from "./MidiDevice";

export class MidiParameter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.parameter.initialValue,
            midi: this.props.midi
        };
        this.handleChange = this.handleChange.bind(this);
        this.setValue = this.setValue.bind(this);
    }

    initialize() {
        this.setValue(this.props.parameter.initialValue);
    }

    toMidiBytes(channel) {
        return [0xb0 + channel - 1, this.props.parameter.cc, this.state.value];
    }

    handleChange(newValue) {
        this.setState({value: newValue});
    }

    setValue(value) {
        this.setState({
            value: value,
            midi: this.state.midi
        }, () => this.state.midi.parameterChanged(this));
    }

    render() {
        return (
            <div className="volca-kontrol">
                <Knob
                    width={100}
                    value={this.state.value}
                    max={127}
                    step={Math.ceil(127 / this.props.parameter.range)}
                    onChange={this.handleChange}
                    fgColor={"#343132"}
                />
                <label>{this.props.parameter.name}</label>
            </div>
        );}
}
