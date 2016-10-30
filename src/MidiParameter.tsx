import * as React from "react";
import { MidiDevice } from "./MidiDevice";
import { Parameter } from "./Parameter";

export interface Props {
    parameter: Parameter;
    midi: MidiDevice;
}

interface State {
    value?: number;
    midi: MidiDevice;
}

export class MidiParameter extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            value: props.parameter.initialValue,
            midi: this.props.midi
        };
        this.handleChange = this.handleChange.bind(this);
        this.setValue = this.setValue.bind(this);
    }

    public initialize(): void {
        this.setValue(this.props.parameter.initialValue);
    }

    public toMidiBytes(channel: number): number[] {
        return [0xb0 + channel - 1, this.props.parameter.cc, this.state.value];
    }

    handleChange(event) {
        this.setValue(event.target.value);
    }

    public setValue(value) {
        this.setState({
            value: value,
            midi: this.state.midi
        }, () => this.state.midi.parameterChanged(this));
    }

    render() {
        return (
            <div>
                <label>{this.props.parameter.name}</label>
                <input type="range"
                    max="127"
                    value={this.state.value}
                    step={Math.ceil(127 / this.props.parameter.range)}
                    onChange={this.handleChange} />
            </div>
        );
    }
}
