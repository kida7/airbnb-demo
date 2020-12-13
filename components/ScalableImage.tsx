import React, {
    useState,
    useEffect,
    useRef,
    ReactElement,
    ReactNode,
    useMemo
} from 'react';


import {
    Image,
    TouchableOpacity,
    ImageBackground,
    ImageProps,
    TouchableOpacityProps,
    GestureResponderEvent,
    StyleSheet,
    View
} from 'react-native';
// import FastImage from 'react-native-fast-image';

const resolveAssetSource = Image.resolveAssetSource;
export interface ScalableImageProps extends ImageProps {
    onPress?: (event: GestureResponderEvent) => void;
    background?: boolean,
    useFastImage?: boolean,
    loadingIndicator?: ReactNode,
    errorIcon?: ReactNode,
    onSize?: (size: { width: number | string, height: number | string }) => void
}
const ScalableImage: React.FC<ScalableImageProps> = ({ useFastImage, loadingIndicator, style, errorIcon, ...props }) => {
    const ImageComponent = props.background
        ? ImageBackground
        : (useFastImage ? Image : Image);
    const [sizes, setSizes] = useState<any[] | undefined>(undefined);
    //@ts-ignore
    const [image, setImage] = useState<ReactElement>(null);
    const mounted = useRef(false);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        }
    }, []);
    const isFixSize = useMemo(() => {
        const _style = StyleSheet.flatten(style) || {}
        return _style.width && _style.height
    }, [style])
    useEffect(() => {
        const { source } = props;
        const adjustSize = (sourceWidth: number, sourceHeight: number, localProps: ScalableImageProps) => {
            const { width, height } = localProps;

            let computedWidth = 0, computedHeight = 0;

            if (width && height) {
                computedWidth = width
                computedHeight = height
            }
            else if (width) {
                computedWidth = width
                computedHeight = width * sourceHeight / sourceWidth
            }
            else if (height) {
                computedWidth = height * sourceWidth / sourceHeight
                computedHeight = height
            }

            if (mounted.current) {
                //@ts-ignore
                // console.log('Auto Size', props.source.uri)
                setSizes([computedWidth, computedHeight])
                props.onSize && props.onSize({ width: computedWidth, height: computedHeight });
            }
        }

        if (isFixSize) {
        } else
            //@ts-ignore
            if (source.uri) {
                try {
                    //@ts-ignore
                    source.headers ?
                        //@ts-ignore
                        Image.getSizeWithHeaders(
                            //@ts-ignore
                            source.uri,
                            //@ts-ignore
                            source.headers,
                            //@ts-ignore
                            (width, height) => adjustSize(width, height, props),
                            () => setError(true)
                        ) :
                        Image.getSize(
                            //@ts-ignore
                            source.uri,
                            (width, height) => adjustSize(width, height, props),
                            () => setError(true)
                        );
                } catch (ex) {

                }
            }
            else {
                const sourceToUse = resolveAssetSource(source);
                adjustSize(sourceToUse.width, sourceToUse.height, props);
            }
    }, [])
    useEffect(() => {
        if (error)
            setLoading(false)
    }, [error])
    useEffect(() => {
        // @ts-ignore
        // console.log('Render Image', props.source.uri, sizes)
        if (sizes)
            setImage(
                //@ts-ignore
                <ImageComponent
                    {...props}
                    style={[style, {
                        width: sizes[0],
                        height: sizes[1]
                    }]}
                    onLoadEnd={() => setLoading(false)}
                    onError={() => setError(true)}
                />
            );
        else if (isFixSize) {
            //@ts-ignore
            setImage(<ImageComponent {...props} style={style}
                onLoadEnd={() => setLoading(false)}
                onError={() => setError(true)}
            />)
        }
        else {
            setImage(<View style={[{ padding: 12, justifyContent: 'center', alignItems: 'center' }, style]}>
                {error ? errorIcon : loadingIndicator}
            </View>)
        }
    }, [props.source, sizes, error]);

    const renderIndicator = useMemo(() => {
        return (loading || error) ? <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
            {loading ? loadingIndicator : null}
        </View> : null
    }, [loading, loadingIndicator, error, errorIcon])

    if (!props.onPress) {
        return <View style={style}>
            {renderIndicator}
            {image}
        </View>
    }
    else {
        return (
            <TouchableOpacity onPress={props.onPress} style={style}>
                {renderIndicator}
                {image}
            </TouchableOpacity>
        );
    }
};


ScalableImage.defaultProps = {
    background: false,
};

export default ScalableImage;
