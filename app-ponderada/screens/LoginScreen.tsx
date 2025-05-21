import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';

export default function LoginScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    if (email && senha) {
      navigation.navigate('Home');
    } else {
      alert('Preencha todos os campos');
    }
  };

  return (
    <View style={styles.container}>
    <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />

      <Text variant="headlineMedium" style={styles.title}>Login</Text>

      <TextInput
        label="E-mail"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Senha"
        value={senha}
        onChangeText={setSenha}
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />

      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Entrar
      </Button>

      <Text style={[styles.link, { color: colors.primary }]}>
        Cadastrar ou Esqueceu a senha?
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { marginBottom: 32, textAlign: 'center' },
  input: { marginBottom: 16 },
  button: { marginTop: 8 },
  link: { marginTop: 24, textAlign: 'center' },

  logo: {
  width: 200,
  height: 200,
  alignSelf: 'center',
  marginBottom: 28,
},
});