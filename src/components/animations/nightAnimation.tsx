import Lottie from "lottie-react";
import animationData from "../../../public/jsonAnimation/nightAnimation.json";

const style = {
    height: 100
};

const NightAnimation = () => {
    return (
        <Lottie style={style} animationData={animationData} />
    );
};

export default NightAnimation;