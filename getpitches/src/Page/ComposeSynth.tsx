import React, { useEffect, useRef, useState } from 'react';
import { Formatter, StaveNote, Stave, Renderer, Dot, Accidental } from 'vexflow';
import * as Tone from "tone";
import ToneComponent from "../Component/ToneComponent";
import { Notes } from "../Types/ToneType";

const ComposeSynth: React.FC = () => {
    const [ firstStaffNote, setFirstStaffNote ] = useState<[StaveNote[], StaveNote[]]>([[], []]);
    const noteData : Notes[] = [];
    const [ a, b ] = useState<Notes[]>([])

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

    const nAT = (notesString : string[]): string[] =>{
        return notesString.map((nt): string => {
            return nt.replace("/", "");
        })
    }

    // hardcoded
    const dAT = (duration: string, isDotted: boolean): string =>{
        let dur: string;
        if (duration === 'q'){
            dur = '4n'
        }
        else {
            dur = '8n'
        }
        return isDotted? dur + '.' : dur
    }

    useEffect(() => {
        firstStaffNote.map(nt => {
            for (let i of nt){
                const noteMeta: Notes = {
                    note: i.isRest() ? ["rest"] : nAT(i.getKeys()),
                    duration: dAT(i.getDuration(), i.isDotted())
                };
                noteMeta.modifiers = i.getModifiers();
                noteData.push(noteMeta)
            }
        })
        b(noteData)
    }, [firstStaffNote])

    useEffect(() => {
        const renderer = new Renderer("output", Renderer.Backends.SVG);

        // Configure the rendering context.
        renderer.resize(720, 130);
        const context = renderer.getContext();

        // Measure 1
        const staveMeasure1 = new Stave(10, 0, 300);
        staveMeasure1.addClef("treble").setContext(context).draw();

        // for both Tone and VexFlow
        const notesMeasure1: StaveNote[] = [
            new StaveNote({ keys: ["c/4"], duration: "qd" }),
            new StaveNote({ keys: ["d/4", "f/3", "b/3"], duration: "8" }),
            new StaveNote({ keys: ["e/4", "ab/3", "b/3"], duration: "q" }),
            new StaveNote({ keys: ["f/4", "ab/3", "c/5"], duration: "q" })
        ];

        // for VexFlow
        notesMeasure1[0].addModifier(new Dot(), 0);
        notesMeasure1[2].addModifier(new Accidental("b"), 1)

        // Helper function to justify and draw a 4/4 voice
        Formatter.FormatAndDraw(context, staveMeasure1, notesMeasure1);

        // Measure 2 - second measure is placed adjacent to first measure.
        const staveMeasure2 = new Stave(staveMeasure1.getWidth() + staveMeasure1.getX(), 0, 400);
        // const notesMeasure2_part1 = [new StaveNote({ keys: ["c/4"], duration: "8" }), new StaveNote({ keys: ["d/4"], duration: "8" }), new StaveNote({ keys: ["b/4"], duration: "8" }), new StaveNote({ keys: ["c/4", "e/4", "g/4"], duration: "8" })];
        // const notesMeasure2_part2 = [new StaveNote({ keys: ["c/4"], duration: "8" }), new StaveNote({ keys: ["d/4"], duration: "8" }), new StaveNote({ keys: ["b/4"], duration: "8" }), new StaveNote({ keys: ["c/4", "e/4", "g/4"], duration: "8" })];
        //
        // // Create the beams for 8th notes in second measure.
        // const beam1 = new Beam(notesMeasure2_part1);
        // const beam2 = new Beam(notesMeasure2_part2);

        // const notesMeasure2 = notesMeasure2_part1.concat(notesMeasure2_part2);

        // for both Tone and VexFlow
        const notesMeasure2: StaveNote[] = [
            new StaveNote({ keys: ["g/4"], duration: "qd" }),
            new StaveNote({ keys: ["e/4"], duration: "8" }),
            new StaveNote({ keys: ["c/4"], duration: "q" }),
            new StaveNote({ keys: ["f/4", "ab/4", "c/5"], duration: "q" })
        ];
        notesMeasure2[0].addModifier(new Dot(), 0);
        notesMeasure2[3].addModifier(new Accidental("b"), 1)



        setFirstStaffNote([notesMeasure1, notesMeasure2])

        staveMeasure2.setContext(context).draw();
        Formatter.FormatAndDraw(context, staveMeasure2, notesMeasure2);

        // Render beams
        // beam1.setContext(context).draw();
        // beam2.setContext(context).draw();

        return () => {
            const outputElement = document.getElementById('output');
            if (outputElement) {
                outputElement.innerHTML = ''; // Clear the SVG content
            }
        };
    }, []);

    return (
        <div>
            <div id="output"></div>
            <p>Note Data: {a.map(note => note.note).join(" | ")}</p>
            <p>Note Duration: {a.map(note => note.duration).join(" | ")}</p>
            <ToneComponent notesASDF={a} bpm={100}></ToneComponent>
        </div>
    );
};

export default ComposeSynth;
