import React, { useState } from 'react'
import { StyleSheet, View, Button, StatusBar, Animated } from 'react-native'
import Header from '../components/Header'

export default My = (props) => {

  const [dynamicMargin, setDynamicHeight] = useState(new Animated.Value(16));
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));

  const marginAnimation = (targetMargin) => Animated.spring(
    dynamicMargin,
    {
      toValue: targetMargin,
      duration: 300
    }
  );

  const moveAnimation = () => Animated.timing(
    animatedValue,
    {
      toValue: 1,
      duration: 3000
    }
  );

  const marginLeft = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 200, 0]
  });

  return (
    <View style={styles.fill}>
      <StatusBar translucent={true} barStyle={'light-content'} backgroundColor={'transparent'} />
      <Header title="我的" style={styles.header} fullScreen />
      <View style={styles.buttonWrapper}>
        <Button
          title="展开"
          onPress={() => {
            const targetMargin = dynamicMargin._value === 0 ? 16 : 0;
            marginAnimation(targetMargin).start();
            moveAnimation().start();
          }}
          color="#437dff"
        />
      </View>
      <Animated.View style={{ height: dynamicMargin, backgroundColor: "red", marginHorizontal: dynamicMargin }} />
      <View style={{ height: 60, backgroundColor: "green" }}/>
      <Animated.View style={{ marginTop: 10, width: 100, height: 100, marginLeft: marginLeft, backgroundColor:'red' }} />
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
  buttonWrapper: {
    padding: 16
  }
})