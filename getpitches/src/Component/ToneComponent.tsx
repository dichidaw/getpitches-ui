import React, { useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { Notes } from '../Types/ToneType';

const ToneComponent: React.FC<{notesASDF: Notes[], bpm: number}>= ({ notesASDF, bpm }) => {
    const samplerRef = useRef<Tone.Sampler | null>(null);

    useEffect(() => {
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

        return () => {
            samplerRef.current?.dispose();
        };
    }, []);

    const playNotes = (notes: Notes[]) : void => {
        Tone.getTransport().bpm.value = bpm;
        if (samplerRef.current){
            const now = Tone.now();
            let count = 0
            for (let i = 0; i<notes.length; i++){
                const time = Tone.Time(notes[i].duration)

                if (notes[i].note[0] !== "rest"){
                    samplerRef.current?.triggerAttack(notes[i].note, now + count)
                    samplerRef.current?.triggerRelease(notes[i].note, now + count + time.toSeconds())
                }
                count += time.toSeconds();
            }
        }
    }

    return (
        <div>
            <button onClick={() => playNotes(notesASDF)}>
                Play Song
            </button>
        </div>
    );
};

export default ToneComponent;
