import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Animated, Platform, Keyboard, StyleSheet } from 'react-native';

import styles from './styles';

const ANIMATION_DURATION = 250;

class Logo extends Component {
  static propTypes = {
    tintColor: PropTypes.string,
  }
  state = {
    containerImageWidth: new Animated.Value(styles.$largeContainerSize),
    imageWidth: new Animated.Value(styles.$largeImageSize),
  }
  componentDidMount () {
    const name = Platform.OS === 'ios' ? 'Will' : 'Did';
    this.keyboardShowListener = Keyboard.addListener(`keyboard${ name }Show`, this.keyboardShow);
    this.keyboardHideListener = Keyboard.addListener(`keyboard${ name }Hide`, this.keyboardHide);
  }
  componentWillUnmount () {
    this.keyboardShowListener.remove();
    this.keyboardHideListener.remove();
  }

  keyboardShow = () => {
    Animated.parallel([
      Animated.timing(this.state.containerImageWidth, {
        toValue: styles.$smallContainerSize,
        duration: ANIMATION_DURATION,
      }),
      Animated.timing(this.state.imageWidth, {
        toValue: styles.$smallImageSize,
        duration: ANIMATION_DURATION,
      })
    ]).start();
  };

  keyboardHide = () => {
    Animated.parallel([
      Animated.timing(this.state.containerImageWidth, {
        toValue: styles.$largeContainerSize,
        duration: ANIMATION_DURATION,
      }),
      Animated.timing(this.state.imageWidth, {
        toValue: styles.$largeImageSize,
        duration: ANIMATION_DURATION,
      })
    ]).start();
  }

  render () {
    const containerImageStyles = [
      styles.containerImage,
      { width: this.state.containerImageWidth, height: this.state.containerImageWidth }
    ];
    const imageStyles = [
      styles.logo,
      { width: this.state.imageWidth },
      this.props.tintColor ? { tintColor: this.props.tintColor } : null,
    ];
    return (
      <View style={styles.container}>
        <Animated.View style={containerImageStyles}>
          <Animated.Image
            resizeMode="contain"
            style={[ StyleSheet.absoluteFill, containerImageStyles ]}
            source={require('./images/background.png')}
          />
          <Animated.Image
            resizeMode="contain"
            style={imageStyles}
            source={require('./images/logo.png')}
          />
        </Animated.View>
        <Text style={styles.text}>Currency Converter</Text>
      </View>
    );
  }
}

export default Logo;
