import React, { useEffect } from 'react';
import * as Tone from 'tone';

const MelodyTone: React.FC = () => {
    const playSynthC = () => {
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease("C4", "8n");
    };

    const playSynthD = () => {
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease("D4", "8n");
    };

    const playSynthE = () => {
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease("E4", "8n");
    };

    const playSynthF = () => {
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease("F4", "8n");
    };

    const playSynthG = () => {
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease("G4", "8n");
    };

    const playSynthA = () => {
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease("A4", "8n");
    };
    const playSynthB = () => {
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease("B4", "8n");
    };
    const playSynthC5 = () => {
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease("C5", "8n");
        // synth.triggerAttackRelease("G4", "8n");
        // synth.triggerAttackRelease("E5", "8n");
    };

    return (
        <div>
            <button onClick={playSynthC}>Play C4</button>
            <button onClick={playSynthD}>Play D4</button>
            <button onClick={playSynthE}>Play E4</button>
            <button onClick={playSynthF}>Play F4</button>
            <button onClick={playSynthG}>Play G4</button>
            <button onClick={playSynthA}>Play A4</button>
            <button onClick={playSynthB}>Play B4</button>
            <button onClick={playSynthC5}>Play C5</button>
        </div>
    );
};

export default MelodyTone;
