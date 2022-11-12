import React from "react";
import {TwistyPlayer} from "cubing/twisty";

const CubePlayer = (props) => {
    const container = React.useRef(null)
    React.useEffect(() => {
        if (!container.current.firstChild) {
            const initial = new TwistyPlayer({
                puzzle: "3x3x3",
                alg: props.scramble,
                visualization: "2D",
                hintFacelets: "none",
                backView: "top-right",
                background: "none",
                controlPanel: "none"
            })
            container.current?.appendChild(initial)
        }
    })
    return <span ref={container}/>
}

export default CubePlayer