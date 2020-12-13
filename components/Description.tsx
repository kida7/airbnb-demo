import React, { PureComponent, ReactElement } from "react";
import { View, ViewProps, TouchableOpacityProps, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Styles from "../res/Styles";
import { EvilIcons, Entypo, AntDesign } from "@expo/vector-icons";
import HorizontalView from "./HorizontalView";

const Description: React.FC<{ title: string, description: string, icon: ReactElement } & ViewProps> = ({ icon, title, description, style, ...props }) => {
    return (
        <HorizontalView style={{ alignItems: 'flex-start' }}>
            {icon}
            <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={{ fontSize: 17, fontWeight: '500' }}>{title}</Text>
                <Text style={{ fontSize: 15, fontWeight: '300' }}>{description}</Text>
            </View>
        </HorizontalView>
    )
}

export default Description