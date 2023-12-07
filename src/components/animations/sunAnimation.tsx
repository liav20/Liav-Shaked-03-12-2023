import Lottie from "lottie-react";
import animationData from "../../../public/jsonAnimation/sunAnimation.json";

const style = {
    height: 100
};

const SunAnimation = () => {
    return (
        <Lottie style={style} animationData={animationData} />
    );
};

export default SunAnimation;