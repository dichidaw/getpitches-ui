import {
    Accidental,
    Annotation,
    Articulation,
    Bend,
    ChordSymbol,
    Dot,
    FretHandFinger,
    GraceNoteGroup,
    Modifier, NoteSubGroup, Ornament, Parenthesis, StringNumber, Stroke, Tremolo, Vibrato
} from "vexflow";

export type ToneNote = {
    type: number;
    pitch: number;
    velocity: number;
}

export const PitchDiff: { [key: number]: string } = {
    0: 'C',
    1: 'C#',
    2: 'D',
    3: 'D#',
    4: 'E',
    5: 'F',
    6: 'F#',
    7: 'G',
    8: 'G#',
    9: 'A',
    10: 'A#',
    11: 'B'
};

export type Notes = {
    note: string[],
    duration: string,
    modifiers?: Modifier[]
}

export type ModifierMD = {
    type : Accidental | Annotation | Articulation | Bend | ChordSymbol | Dot | FretHandFinger | GraceNoteGroup | NoteSubGroup | Ornament | Parenthesis | StringNumber | Stroke | Tremolo | Vibrato
    modifier : Modifier
}