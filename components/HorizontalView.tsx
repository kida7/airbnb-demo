import React, { PureComponent } from "react";
import { View, ViewProps } from "react-native";

class HorizontalView extends PureComponent<ViewProps> {
    render() {
        let { style, ...props } = this.props
        return (
            <View style={[{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }, style]} {...props} />
        )
    }
}

export default HorizontalView