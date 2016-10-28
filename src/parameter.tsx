import * as React from "react"

export interface Props {
    initialValue: number,
    range: number,
    name: string,
    cc: number
}

interface State {
    value: number
}

export class Parameter extends React.Component<Props, State> {
    static get defaultProps() {
        return {
            initialValue: 0,
            range: 127
        };
    }

    constructor(props: Props) {
        super(props);
        this.state = {
            value: props.initialValue
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    render() {
        return (
            <div>
                <label>{this.props.name}</label>
                <input type="range"
                    max="127"
                    value={this.state.value}
                    step={Math.ceil(127 / this.props.range)}
                    disabled={!this.props.cc}
                    onChange={this.handleChange} />
            </div>
        );
    }
}
