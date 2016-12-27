import * as React from "react";
import { MidiParameter } from "./MidiParameter";

function b64encode(str) {
    return window.btoa(str)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

function b64decode(str) {
    str += Array(5 - str.length % 4).join("=");
    str = str.replace(/\-/g, "+").replace(/\_/g, "/");
    return window.atob(str);
}

export class Patch extends React.Component {
    compact() {
        let res = {};
        this.props.parameters.filter(p => !!p).forEach(p => res[p.props.parameter.cc] = p.state.value);
        return res;
    }

    serialize() {
        const compactParameters = this.compact();
        if (Object.keys(compactParameters).length > 0) {
            return b64encode(JSON.stringify(compactParameters));
        } else {
            return "";
        }
    }
    static fromString(str, originalParams) {
        const compactParameters = JSON.parse(b64decode(str));
        Object.keys(compactParameters).forEach(p => {
            const paramToSet = originalParams.find(original => original.cc === Number.parseInt(p));
            paramToSet.initialValue = compactParameters[p];
        });
        return originalParams;
    }
    constructor(props) {
        super(props);
        this.state = { parameters: props.parameters };
        this.compact = this.compact.bind(this);
    }
    render() {
        return <p>{window.location.origin + `/#${this.serialize()}`}</p>;
    }
}
