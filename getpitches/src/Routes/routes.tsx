import {createBrowserRouter} from "react-router-dom"
import App from "../App";
import ComposeSynth from "../Page/ComposeSynth";
import MelodyTone from "../Page/MelodyTone";

export const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/compose", element: <ComposeSynth /> },
    { path: "/melody-test", element: <MelodyTone /> },
]);