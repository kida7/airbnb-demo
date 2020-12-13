import React, { PureComponent } from "react";
import { View, ViewProps, TouchableOpacityProps } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Styles from "../res/Styles";
import { EvilIcons } from "@expo/vector-icons";

const Line: React.FC<{}> = ({ }) => {
    return (
        <View style={{ borderColor: '#ccc', borderTopWidth: 1 }} />
    )
}

export default Line