import React, { useState } from 'react';
import { View, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import { TextInput, Button, Text, useTheme, Card, Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function CadastroScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = async () => {
    if (!nome || !email || !telefone || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      const data = await AsyncStorage.getItem('usuarios');
      const usuarios = data ? JSON.parse(data) : [];

      const jaExiste = usuarios.some((u: any) => u.email === email);
      if (jaExiste) {
        Alert.alert('Erro', 'E-mail já cadastrado');
        return;
      }

      const novoUsuario = { nome, email, telefone, senha };
      const atualizados = [...usuarios, novoUsuario];
      await AsyncStorage.setItem('usuarios', JSON.stringify(atualizados));

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar');
      console.error(error);
    }
  };

  return (
    <>
      <Appbar.Header style={{ backgroundColor: colors.background, elevation: 0 }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color={colors.primary} />
        <Appbar.Content title="Cadastro" titleStyle={{ color: colors.primary }} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Card style={styles.card} mode="contained">
          <Card.Content>
            <Text
              variant="headlineSmall"
              style={[styles.title, { color: colors.primary }]}
            >
              Crie sua conta
            </Text>

            <TextInput
              label="Nome completo"
              value={nome}
              onChangeText={setNome}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="E-mail"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Telefone"
              value={telefone}
              onChangeText={setTelefone}
              keyboardType="phone-pad"
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
              mode="outlined"
              style={styles.input}
            />
            <Button
              mode="contained"
              onPress={handleCadastro}
              style={[styles.button, { backgroundColor: colors.primary }]}
              labelStyle={{ color: colors.onPrimary, fontSize: 16 }}
            >
              Cadastrar
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: 24,
    flexGrow: 1,
    backgroundColor: '#FAFAFA',
    justifyContent: 'flex-start',
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginTop: 16,
  },
  title: {
    marginBottom: 24,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  card: {
    marginTop: 24,
    borderRadius: 16,
    backgroundColor: '#FFF',
    elevation: 4,
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 8,
    borderRadius: 8,
  },
});