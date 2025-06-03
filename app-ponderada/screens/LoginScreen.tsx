import React, { useState } from 'react';
import { View, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!email || !senha) {
      alert('Preencha todos os campos');
      return;
    }

    const data = await AsyncStorage.getItem('usuarios');
    const usuarios = data ? JSON.parse(data) : [];

    const encontrado = usuarios.find((u: any) => u.email === email && u.senha === senha);

    if (encontrado) {
      await AsyncStorage.setItem('usuarioLogado', email);
      navigation.navigate('Home');
    } else {
      alert('E-mail ou senha incorretos');
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

      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={[styles.link, { color: colors.primary }]}>Não possui conta? Cadastre-se</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={[styles.link, { color: colors.primary }]}>Esqueci minha senha</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { marginBottom: 32, textAlign: 'center' },
  input: { marginBottom: 16 },
  button: { marginTop: 8 },
  link: { marginTop: 16, textAlign: 'center' },
  logo: { width: 200, height: 200, alignSelf: 'center', marginBottom: 28 },
});
