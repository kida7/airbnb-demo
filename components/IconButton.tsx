import React, { PureComponent } from "react";
import { View, ViewProps, TouchableOpacityProps, Animated } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Styles from "../res/Styles";
import { EvilIcons } from "@expo/vector-icons";

const IconButton: React.FC<{ name: string, opacity?: Animated.AnimatedInterpolation } & TouchableOpacityProps> = ({ opacity, name, style, ...props }) => {
    return (
        <TouchableOpacity style={[{
            justifyContent: 'center',
            alignItems: 'center',
            width: 32, height: 32,
        }, style]} {...props}>
            <Animated.View style={[{
                position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, borderRadius: 16, backgroundColor: 'white',
                opacity: opacity
            }, Styles.shadow]} />
            <EvilIcons
                //@ts-ignore
                name={name} size={18} />
        </TouchableOpacity>
    )
}

export default IconButton