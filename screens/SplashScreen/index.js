import LottieView from 'lottie-react-native';
import Estrelas from '../../assets/animations/estrelas.json';
import React, { useEffect } from 'react';
import { View, Text, Animated, Image } from 'react-native';
import {styles} from './style';
import Logo from '../../assets/logoFilmae1.png';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const opacidadeLogo = new Animated.Value(0);
  const escalaLogo = new Animated.Value(0);
  const opacidadeTexto = new Animated.Value(0);
  const posicaoTexto = new Animated.Value(50);
  const navigation = useNavigation();

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(opacidadeLogo, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(escalaLogo, {
          toValue: 1.2,
          friction: 7,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(opacidadeTexto, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.spring(posicaoTexto, {
          toValue: 0,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    const timer = setTimeout(() => {

      navigation.replace("Login");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: opacidadeLogo,
            transform: [{ scale: escalaLogo }],
          },
        ]}
      >

        <Image 
          source={Logo} 
          style={styles.logo}
          resizeMode="contain"
        />

      </Animated.View>

      <Animated.View
        style={[
          styles.textoContainer,
          {
            opacity: opacidadeTexto,
            transform: [{ translateY: posicaoTexto }],
          },
        ]}
      >
        <Text style={styles.bemVindo}>Bem-vindo(a) !</Text>
        <Text style={styles.subtitulo}>
          Sua jornada cinematográfica começa aqui
        </Text>

      </Animated.View>
      <LottieView
        source={Estrelas}
        autoPlay
        loop
        speed={0.7}
        style={styles.estrelas}
      />
    </View>
  );
};

export default SplashScreen;

