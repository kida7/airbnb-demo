import React, { PureComponent, ReactElement } from "react";
import { View, ViewProps, TouchableOpacityProps, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Styles from "../res/Styles";
import { EvilIcons } from "@expo/vector-icons";
import HorizontalView from "./HorizontalView";

const Button: React.FC<{ title: string } & TouchableOpacityProps> = ({ title, style, ...props }) => {
    return (
        <TouchableOpacity style={[{ justifyContent: 'center', alignItems: 'center', paddingVertical: 12, borderRadius: 10, borderWidth: 1 }, style]} {...props}>
            <Text style={{ fontSize: 15, fontWeight: '500' }}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button