import { StyleSheet, Platform } from "react-native";

const SHADOW_HEIGHT = 2

const Styles = StyleSheet.create({
    shadow: Platform.OS == 'ios' ? {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: SHADOW_HEIGHT,
        },
        shadowRadius: SHADOW_HEIGHT,
        shadowOpacity: 0.3,
    } : {
            elevation: SHADOW_HEIGHT
        },
})

export default Styles