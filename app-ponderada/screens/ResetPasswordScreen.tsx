import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ResetPasswordScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { email, codigo } = route.params as { email: string; codigo: string };
  const [novaSenha, setNovaSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const redefinirSenha = async () => {
    if (!novaSenha || novaSenha.length < 4) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 4 caracteres.');
      return;
    }

    setLoading(true);
    try {
      const resp = await fetch('http://192.168.86.248:3001/api/reset-password/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: codigo, newPassword: novaSenha }),
      });

      const data = await resp.json();

      if (resp.ok) {
        // atualiza senha no AsyncStorage
        const dados = await AsyncStorage.getItem('usuarios');
        const lista = dados ? JSON.parse(dados) : [];

        const atualizados = lista.map((u: any) =>
          u.email === email ? { ...u, senha: novaSenha } : u
        );

        await AsyncStorage.setItem('usuarios', JSON.stringify(atualizados));

        Alert.alert('Sucesso', 'Senha redefinida com sucesso!');
        navigation.navigate('Login');
      } else {
        Alert.alert('Erro', data.error || 'Falha ao redefinir senha.');
      }
    } catch {
      Alert.alert('Erro', 'Erro ao conectar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={{ marginBottom: 20 }}>
        Nova senha
      </Text>
      <TextInput
        label="Digite a nova senha"
        // secureTextEntry
        value={novaSenha}
        onChangeText={setNovaSenha}
        mode="outlined"
        style={styles.input}
      />
      <Button mode="contained" onPress={redefinirSenha} loading={loading}>
        Redefinir Senha
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, flex: 1, justifyContent: 'center' },
  input: { marginBottom: 16 },
});