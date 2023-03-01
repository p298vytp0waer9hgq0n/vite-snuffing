import React, { FC, useState } from "react";

interface IFooter {
    word: string;
}

type generic = {
    id: number;
    name: string;
    auth: boolean;
}

type specific = Omit<generic, 'auth'>

const keys = 'charm, spin, ambivalence'

type different = Record<keyof generic, string>;

// export default function Footer () {
export const Footer: FC<IFooter> = ({ word }) => {
    const all = 'all';
    const strArr = ['one', 'two', 'three'];

    const [stateThing, setStateThing] = useState<string[]>([all]);

    // setStateThing([all, ...strArr]);

    /* const a: number = undefined;
    console.log(a); */

    return (
        <span>{word}</span>
    )
    
}