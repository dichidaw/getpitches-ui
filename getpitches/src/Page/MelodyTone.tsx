import React, { useEffect, useState, useCallback } from 'react';
import * as Tone from 'tone';
import WebMidiApi, { Input, WebMidi } from 'webmidi';
import { PitchDiff, ToneNote } from '../Types/ToneType';
import { sampler } from '../Helper/ToneHelper';

const MelodyTone: React.FC = () => {
    const [note, setNote] = useState<ToneNote | null>(null);

    const mod = (a: number, b: number): number => ((a % b) + b) % b;

    const handleMidiMessage = useCallback((e: WebMidiApi.MessageEvent) => {
        if (e.data[0] === 156 && e.data[2] !== 0) {
            setNote({
                type: e.data[0],
                pitch: e.data[1],
                velocity: e.data[2],
            });
        }
    }, []);

    useEffect(() => {
        let input: Input | undefined;

        WebMidi.enable({ sysex: true })
            .then(() => {
                input = WebMidi.getInputByName('LKMK3 MIDI');
                if (input) {
                    input.addListener('midimessage', handleMidiMessage);
                }
            })
            .catch((err: Error) => console.error(err.message));

        return () => {
            if (input) input.removeListener('midimessage');
            WebMidi.disable();
        };
    }, [handleMidiMessage]);

    useEffect(() => {
        if (note) {
            const nt = mod(note.pitch - 60, 12);
            const octave = Math.floor(note.pitch / 12) - 1;
            const final = PitchDiff[nt] + octave;

            Tone.loaded().then(() => {
                sampler.triggerAttackRelease(final, 0.2, undefined, note.velocity / 127);
            });
            setNote(null);
        }
    }, [note, sampler]);

    return (
        <div>
            <button onClick={() => sampler.triggerAttackRelease('C4', 0.5)}>
                Play C4
            </button>
        </div>
    );
};

export default MelodyTone;
