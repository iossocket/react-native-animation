import React, { useState } from 'react'
import { StyleSheet, View, StatusBar, Animated, Text, Dimensions } from 'react-native'
import Header from '../components/Header'
import { STATUS_BAR_HEIGHT, HEADER_HEIGHT } from "../utils/device"

const totalHeight = STATUS_BAR_HEIGHT + HEADER_HEIGHT;
const deviceWidth = Dimensions.get('window').width
export default MyList = () => {
  const [animatedValue] = useState(new Animated.Value(0));
  
  const translateY = animatedValue.interpolate({
    inputRange: [0, totalHeight / 2],
    outputRange: [0, -totalHeight / 2],
    extrapolate: 'clamp',
  });

  const scaleX = animatedValue.interpolate({
    inputRange: [0, totalHeight / 2],
    outputRange: [1, deviceWidth / (deviceWidth - 32)],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.fill}>
      <StatusBar translucent={true} barStyle={'dark-content'} backgroundColor={'transparent'} />
      <Header title="" style={styles.header} fullScreen />
      <Animated.FlatList 
        style={styles.list}
        data={data}
        contentContainerStyle={{ paddingTop: totalHeight / 2 }}
        renderItem={({ item }) => (
          <View style={styles.nonsenseItem}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        scrollEventThrottle={1} 
        onScroll={Animated.event(
          [{
            nativeEvent: { contentOffset: { y: animatedValue } },
          }],
          { useNativeDriver: true }
        )}
        keyExtractor={(item, i) => `${i}${item}`}
        />
        <Animated.View style={[styles.position , { transform: [{ translateY }] }]}>
          <Animated.View style={[styles.headerWrapper, { transform: [{ scaleX }] } ]}/>
        </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  fill: {
    flex: 1
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: '#437dff',
    textAlign: 'center'
  },
  header: {
    backgroundColor: '#437dff',
  },
  list: {
    flex: 1
  },
  nonsenseItem: {
    backgroundColor: 'red',
    margin: 8,
  },
  itemText: {
    backgroundColor: '#09c',
    fontSize: 20,
    padding: 20,
    textAlign: 'center',
    color: '#FFF'
  },
  position: {
    position: 'absolute',
    height: totalHeight,
    left: 0,
    right: 0,
    top: totalHeight / 2
  },
  headerWrapper: {
    position: 'absolute',
    backgroundColor: 'yellow',
    height: totalHeight,
    left: 16,
    right: 16,
    top: 0,
    bottom: 0
  },
})

const data = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
];