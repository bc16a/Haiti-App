import * as React from 'react';
import { Image, TouchableOpacity, ImageURISource, ImageStyle, ViewStyle } from 'react-native';
import styles from './ImageButtonStyles';

export namespace ImageButton {
    // tslint:disable-next-line:no-empty-interface
    export interface Props {
        source: ImageURISource;
        imageStyle?: ImageStyle | ImageStyle[] | null;
        style?: ViewStyle | ViewStyle[] | null;
        onPress: () => void;
    }

    // tslint:disable-next-line:no-empty-interface
    export interface State {}
}

// tslint:disable-next-line:no-empty
export default class ImageButton extends React.Component<ImageButton.Props, ImageButton.State> {
    constructor(props: ImageButton.Props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity style={[styles.button, styles.centeredColumn, this.props.style]} onPress={this.props.onPress}>
                <Image source={this.props.source} style={[styles.image, this.props.imageStyle]} />
            </TouchableOpacity>
        );
    }
}
