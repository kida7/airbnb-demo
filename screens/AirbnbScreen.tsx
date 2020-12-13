import React, { useEffect, useState, useMemo } from 'react'
import Constants from 'expo-constants';
import { Alert, View, Image, Dimensions, ScrollView, Text, Animated, StatusBar } from 'react-native';
import HorizontalView from '../components/HorizontalView';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import Styles from '../res/Styles';
import IconButton from '../components/IconButton';
import Images from '../res/images';
import ScalableImage from '../components/ScalableImage';
import WhiteSpace from '../components/WhiteSpace';
import Line from '../components/Line';
import { EvilIcons, Entypo, AntDesign, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import IconLabel from '../components/IconLabel';
import Description from '../components/Description';
import Amenity from '../components/Amenity';
import Button from '../components/Button';
import Carousel from 'react-native-snap-carousel';

const headerHeight = Constants.statusBarHeight + 48
const screenWidth = Dimensions.get('screen').width
const scrollY = new Animated.Value(0)

const AirbnbScreen: React.FC<{}> = () => {
    const [photoHeight, setPhotoHeight] = useState(0)
    const [opacity, opacity2, photoTranslateY, opacity3] = useMemo(() => {
        let scrollDistance = Math.max(0, photoHeight - headerHeight)
        return [scrollY.interpolate({
            inputRange: [0, scrollDistance],
            outputRange: [0, 1]
        }), scrollY.interpolate({
            inputRange: [0, Math.max(0, scrollDistance - 30), scrollDistance],
            outputRange: [1, 1, 0]
        }),
        scrollY.interpolate({
            inputRange: [-1, 0, scrollDistance],
            outputRange: [0, 0, scrollDistance / 2]
        }),
        scrollY.interpolate({
            inputRange: [0, Math.max(0, scrollDistance - 30), scrollDistance],
            outputRange: [0, 0, 1]
        }),
        ]
    }, [photoHeight])
    const [barStyle, setBarStyle] = useState<'light-content' | 'dark-content'>('light-content')
    const [slideIndex, setSlideIndex] = useState(0)
    useEffect(() => {
        let scrollDistance = Math.max(0, photoHeight - headerHeight)
        scrollY.addListener(e => {
            if (e.value >= scrollDistance)
                setBarStyle('dark-content')
            else
                setBarStyle('light-content')
        })
        return () => {
            scrollY.removeAllListeners()
        }
    }, [photoHeight])
    return <>
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <StatusBar barStyle={barStyle} />
            <Animated.ScrollView style={{ flex: 1 }}
                // bounces={false} 
                nestedScrollEnabled

                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}>
                <Animated.View style={{
                    // position: 'absolute', top: 0, left: 0, 

                    transform: [{ translateY: photoTranslateY }]
                }}
                    onLayout={({ nativeEvent: { layout: { height } } }) => {
                        setPhotoHeight(height)
                    }}>
                    <Carousel data={[1, 2, 3, 4, 5, 6, 7]}
                        sliderWidth={screenWidth}
                        itemWidth={screenWidth}
                        onSnapToItem={setSlideIndex}
                        inactiveSlideScale={1}
                        //@ts-ignore
                        renderItem={({ item, index }) => (
                            <>
                                <Image
                                    //@ts-ignore 
                                    source={Images[item]}
                                    style={{ width: screenWidth, height: 300 }} />
                                <Animated.View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'white', opacity: opacity }} />
                            </>
                        )} />

                </Animated.View>
                <View style={{
                    backgroundColor: 'white',
                    paddingHorizontal: 20
                }}>
                    <View style={{ position: 'absolute', top: -34, right: 12, padding: 4, paddingHorizontal: 10, borderRadius: 6, backgroundColor: 'rgba(0,0,0,0.6)' }}>
                        <Text style={{ color: 'white', fontSize: 11 }}>{'{0} / {1}'.format(slideIndex + 1, 7)}</Text>
                    </View>
                    <WhiteSpace />
                    <Text style={{ fontSize: 28 }}>Paradise Home 2 - beautiful & bright apt Wesk Lake</Text>
                    <WhiteSpace />
                    <HorizontalView style={{ justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                        <IconLabel name='star' text='4.91 (263) · ' />
                        <IconLabel name='medal' text='Super host · ' />
                        <Text style={{ fontWeight: '600', textDecorationLine: 'underline' }}>Ba Đình, Hà Nội, Việt Nam</Text>
                    </HorizontalView>
                    <WhiteSpace />
                    <Line />
                    <WhiteSpace />
                    <HorizontalView>
                        <Text style={{ fontSize: 22, flex: 1 }}>Entire apartment hosted by Thomas</Text>
                        <View style={{ borderRadius: 25, overflow: 'hidden' }}>
                            <ScalableImage source={Images.avatar} width={50} />
                        </View>
                    </HorizontalView>
                    <WhiteSpace />
                    <Text style={{ fontSize: 15, fontWeight: '400' }}>2 guests · 1 bedroom · 1 bed · 1 bath</Text>
                    <WhiteSpace />
                    <Line />
                    <WhiteSpace />
                    <Description icon={<AntDesign name='home' size={28} />} title='Entire Home' description={`You'll have the apartment to yourself.`} />
                    <WhiteSpace />
                    <Description icon={<Entypo name='water' size={28} />} title='Enhanced Clean' description={`This host committed to Airbnb's 5-step enhanced cleaning process. Learn more.`} />
                    <WhiteSpace />
                    <Description icon={<MaterialCommunityIcons name='door' size={28} />} title='Selft check-in' description={`Check yourself in with the smartlock.`} />
                    <WhiteSpace />
                    <Description icon={<AntDesign name='calendar' size={28} />} title='Free cancellation until 24 hours before check-in' description={`After that, cancel beffore check-in and get a fulll refund, minus the first night and service fee.`} />
                    <WhiteSpace />
                    <Description icon={<AntDesign name='book' size={28} />} title='House rules' description={`This place isn't suitable for infants (0-2 yrs) and the host doesn't allow parties or smoking. Get details`} />
                    <WhiteSpace />
                    <Line />
                    <WhiteSpace />
                    <Text style={{ fontSize: 17, fontWeight: '300' }}>
                        {`The reasons you can not refurese to book at Lilyhometel - Doi Can:
- Free parking space for motorbikes
- Around there are many restaurances, drinking water, selling clothers, groceries, supermakets...
- Easy to catch public transport...`}
                    </Text>
                    <WhiteSpace />
                    <Text style={{ fontSize: 17, fontWeight: '500', textDecorationLine: 'underline' }}>Show more</Text>
                    <WhiteSpace />
                    <Button title='Contact host' />
                    <WhiteSpace />
                    <Line />
                    <WhiteSpace />
                    <Text style={{ fontSize: 20, fontWeight: '500' }}>Amenities</Text>
                    <WhiteSpace />
                    <Amenity name='Kitchen' icon={<MaterialIcons name='kitchen' size={28} />} />
                    <Amenity name='Wifi' icon={<MaterialIcons name='wifi' size={28} />} />
                    <Amenity name='Free parking on permises' icon={<MaterialCommunityIcons name='car-brake-parking' size={28} />} />
                    <Amenity name='Indoor fireplace' icon={<MaterialIcons name='fireplace' size={28} />} />
                    <Amenity name='Dryer' icon={<MaterialIcons name='local-laundry-service' size={28} />} />
                    <WhiteSpace />
                    <Button title='Show all 41 amentities' />

                    <WhiteSpace />
                    <Line />

                    <WhiteSpace />
                    <Text style={{ fontSize: 20, fontWeight: '500' }}>Location</Text>
                    <WhiteSpace />
                    <View style={{ borderRadius: 16, overflow: 'hidden' }}>
                        <ScalableImage source={Images.IMG_0216} width={screenWidth - 40} />

                    </View>
                    <WhiteSpace />
                    <Text style={{ fontSize: 17, fontWeight: '500' }}>Ba Đình, Hà Nội, Việt Nam</Text>

                    <WhiteSpace />
                    <Text style={{ fontSize: 17, fontWeight: '300' }}>Jamine's House is located at No. 42B, 209 Doi Can Alley, Doi Can Street, Ba Dinh distric, Ha Noi city. It is located near many commercial centers,</Text>
                    <WhiteSpace />
                    <Button title='More about the location' />
                    <WhiteSpace />
                    {/* <Line />
                    <WhiteSpace />
                    <IconLabel name='star' text='4.91 (263 reviews)' size={24} textStyle={{ fontWeight: '600' }} /> */}
                    {/* <WhiteSpace />
                    <WhiteSpace />
                    <WhiteSpace /> */}
                    {/* <WhiteSpace /> */}

                </View>

            </Animated.ScrollView>
            <HorizontalView style={{
                padding: 20,
                borderColor: '#ccc', borderTopWidth: 1,
                paddingBottom: 30,
            }}>
                <View>
                    <Text style={{ fontWeight: '600', fontSize: 18 }}>₫449,426  <Text style={{ fontWeight: '400', fontSize: 14 }}>/ night</Text></Text>
                    <IconLabel name='star' text='4.91 (263)' />
                </View>
                <TouchableOpacity style={{ backgroundColor: 'rgb(255, 56, 92)', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 10 }}>
                    <Text style={{ color: 'white', fontWeight: '500' }}>Check avaibility</Text>
                </TouchableOpacity>
            </HorizontalView>
            <View style={{
                height: headerHeight,
                position: 'absolute', top: 0, left: 0, right: 0,
                justifyContent: 'flex-end'
            }}>
                <Animated.View style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'white',
                    borderColor: '#ccc', borderBottomWidth: 1,
                    opacity: opacity3
                }} />

                <HorizontalView style={{
                    height: 48,
                    paddingHorizontal: 18,
                    // backgroundColor: 'yellow',
                    alignContent: 'center',
                }}>
                    <IconButton name='close' opacity={opacity2} />
                    <HorizontalView>
                        <IconButton name='share-apple' opacity={opacity2} />
                        <IconButton name='heart' style={{ marginLeft: 20 }} opacity={opacity2} />
                    </HorizontalView>
                </HorizontalView>
            </View>
        </View>
    </>
}

export default AirbnbScreen