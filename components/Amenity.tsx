import React, { PureComponent, ReactElement } from "react";
import { View, ViewProps, TouchableOpacityProps, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Styles from "../res/Styles";
import { EvilIcons } from "@expo/vector-icons";
import HorizontalView from "./HorizontalView";

const Amenity: React.FC<{ icon: ReactElement, name: string }> = ({ icon, name }) => {
    return (
        <HorizontalView style={{ paddingVertical: 6 }}>
            <Text style={{ fontSize: 17, fontWeight: '300' }}>{name}</Text>
            {icon}
        </HorizontalView>
    )
}

export default Amenity