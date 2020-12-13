import React, { PureComponent } from "react";
import { View, ViewProps, TouchableOpacityProps, Text, TextStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Styles from "../res/Styles";
import { EvilIcons, Entypo } from "@expo/vector-icons";
import HorizontalView from "./HorizontalView";

const IconLabel: React.FC<{ name: string, text: string, size?: number, textStyle?: TextStyle } & ViewProps> = ({ textStyle, size, name, text, style, ...props }) => {
    let _size = size || 16
    return (
        <HorizontalView style={{ justifyContent: 'flex-start' }}>
            <Entypo
                //@ts-ignore
                name={name} color='rgb(255, 56, 92)' size={_size} />
            <Text style={[{ marginLeft: 6, fontSize: _size - 3 }, textStyle]}>{text}</Text>
        </HorizontalView>
    )
}

export default IconLabel