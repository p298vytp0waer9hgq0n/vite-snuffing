import { Component, ReactNode } from "react";

interface StuffProps {
    text: string;
    children?: ReactNode;
}

interface IStuffState {
    count: number;
    anotherCount: number;
}

export class Stuff extends Component<StuffProps, IStuffState> {
    state: IStuffState = {
        count: 0,
        anotherCount: 10
    }

    render () {
        return (
            <h1>{this.props.text}</h1>
        )
    }
}