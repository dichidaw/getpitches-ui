import React, { useEffect, useState } from "react";
import WebMidiApi, { WebMidi, Input } from "webmidi";

const MidiConnector: React.FC = () => {
    const [devices, setDevices] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let input: Input | undefined;

        // Enable WebMIDI and list available devices
        WebMidi.enable({ sysex: true })
            .then(() => {
                if (WebMidi.inputs.length < 1) {
                    setDevices(["No device detected."]);
                } else {
                    setDevices(WebMidi.inputs.map((device) => device.name));

                    // Attach event listener for the first input device
                    input = WebMidi.getInputByName("LKMK3 MIDI");
                    if (input) {
                        input.addListener("midimessage",  (e: WebMidiApi.MessageEvent) => {
                            if (e.data[0] !== 248) {
                                console.log("MIDI Message Event:", e);
                            }
                        });
                    }
                }
            })
            .catch((err: Error) => {
                setError(err.message);
            });

        // Cleanup function to disable WebMIDI and remove event listeners when the component unmounts
        return () => {
            if (input) {
                input.removeListener("midimessage");
            }
            WebMidi.disable();
        };
    }, []);

    return (
        <div>
            <h1>MIDI Devices</h1>
            {error && <p>Error: {error}</p>}
            {devices.length > 0 ? (
                <ul>
                    {devices.map((device, index) => (
                        <li key={index}>{device}</li>
                    ))}
                </ul>
            ) : (
                <p>No devices detected.</p>
            )}
        </div>
    );
};

export default MidiConnector;
