import Lottie from "lottie-react";
import animationData from "../../../public/jsonAnimation/loadingAnimation.json";

const style = {
    height: 100
};

const LoadingAnimation = () => {
    return (
        <Lottie style={style} animationData={animationData} />
    );
};

export default LoadingAnimation;