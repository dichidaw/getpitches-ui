import * as Tone from "tone";

export const mod = (a: number, b: number): number => {
    return ((a % b) + b) % b;
};

export const sampler = new Tone.Sampler({
    urls: {
        C4: 'C4.mp3',
        'D#4': 'Ds4.mp3',
        'F#4': 'Fs4.mp3',
        A4: 'A4.mp3',
    },
    release: 1,
    baseUrl: 'https://tonejs.github.io/audio/salamander/',
}).toDestination();