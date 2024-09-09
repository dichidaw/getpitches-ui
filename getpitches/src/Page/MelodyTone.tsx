import React, { useEffect, useState, useCallback, useRef } from 'react';
import * as Tone from 'tone';
import WebMidiApi, { Input, WebMidi } from 'webmidi';
import { PitchDiff, ToneNote } from '../Types/ToneType';
import { mod } from '../Helper/ToneHelper';

const MelodyTone: React.FC = () => {
    const [note, setNote] = useState<ToneNote | null>(null);
    const [noteStop, setNoteStop] = useState<ToneNote | null>(null);

    // Use useRef to persist the same sampler instance throughout the component lifecycle
    const samplerRef = useRef<Tone.Sampler | null>(null);

    useEffect(() => {
        // Initialize the sampler only once when the component mounts
        samplerRef.current = new Tone.Sampler({
            urls: {
                C4: 'C4.mp3',
                'D#4': 'Ds4.mp3',
                'F#4': 'Fs4.mp3',
                A4: 'A4.mp3',
            },
            release: 1,
            baseUrl: 'https://tonejs.github.io/audio/salamander/',
        }).toDestination();

        // Cleanup sampler when the component unmounts
        return () => {
            samplerRef.current?.dispose();
        };
    }, []);

    const handleMidiMessage = useCallback((e: WebMidiApi.MessageEvent) => {
        if (e.data[0] !== 156) return;
        const noteData: ToneNote = {
            type: e.data[0],
            pitch: e.data[1],
            velocity: e.data[2],
        };

        if (noteData.velocity === 0) {
            setNoteStop(noteData);
        } else {
            setNote(noteData);
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
            console.log("note start: ", note);

            const nt = mod(note.pitch - 60, 12);
            const octave = Math.floor(note.pitch / 12) - 1;
            const final = PitchDiff[nt] + octave;

            Tone.loaded().then(() => {
                samplerRef.current?.triggerAttack(final, undefined, note.velocity / 127);
            });

            setNote(null);
        }

        if (noteStop) {
            console.log("note stop: ", noteStop);

            const nt = mod(noteStop.pitch - 60, 12);
            const octave = Math.floor(noteStop.pitch / 12) - 1;
            const final = PitchDiff[nt] + octave;

            Tone.loaded().then(() => {
                samplerRef.current?.triggerRelease(final);
            });

            setNoteStop(null);
        }
    }, [note, noteStop]);

    return (
        <div>
            <button onClick={() => samplerRef.current?.triggerAttackRelease('C4', 0.5)}>
                Play C4
            </button>
        </div>
    );
};

export default MelodyTone;
