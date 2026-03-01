import { Dimensions } from "react-native";

const useDimensions = () => {
    const { width, height } = Dimensions.get("window");
    return { width, height };
};

export default useDimensions;
