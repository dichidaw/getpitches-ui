import {createBrowserRouter} from "react-router-dom"
import App from "../App";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children : [
            { path: "", element: <App/> },
            // { path: "compose", element: <ComposeSynth/> },
            // { path: "compositions", element: <Compositions/> }
        ]
    }
])