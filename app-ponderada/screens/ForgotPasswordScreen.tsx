import React, { useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { TextInput, Button, Text, useTheme, Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function ForgotPasswordScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const [etapa, setEtapa] = useState<'email' | 'codigo'>('email');
  const [email, setEmail] = useState('');
  const [codigo, setCodigo] = useState('');
  const [loading, setLoading] = useState(false);

  const enviarCodigo = async () => {
    setLoading(true);
    try {
      const resp = await fetch('http://10.150.0.183:3001/api/reset-password/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await resp.json();

      if (resp.ok) {
        Alert.alert('Sucesso', 'Código enviado para seu e-mail.');
        setEtapa('codigo');
      } else {
        Alert.alert('Erro', data.error || 'Erro ao enviar código.');
      }
    } catch {
      Alert.alert('Erro', 'Falha de conexão com servidor.');
    } finally {
      setLoading(false);
    }
  };

  const verificarCodigo = () => {
    if (!codigo) {
      Alert.alert('Erro', 'Digite o código recebido.');
      return;
    }
    navigation.navigate('ResetPassword', { email, codigo });
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} color={colors.primary} />
        <Appbar.Content title="Recuperar Senha" />
      </Appbar.Header>

      <View style={styles.container}>
        <Text variant="titleLarge" style={{ marginBottom: 16 }}>
          {etapa === 'email' ? 'Informe seu e-mail' : 'Digite o código'}
        </Text>

        {etapa === 'email' ? (
          <>
            <TextInput
              label="E-mail"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              keyboardType="email-address"
              style={styles.input}
            />
            <Button mode="contained" onPress={enviarCodigo} loading={loading}>
              Enviar código
            </Button>
          </>
        ) : (
          <>
            <Text style={{ marginBottom: 8 }}>Código enviado para: {email}</Text>
            <TextInput
              label="Código de verificação"
              value={codigo}
              onChangeText={setCodigo}
              keyboardType="numeric"
              mode="outlined"
              style={styles.input}
            />
            <Button mode="contained" onPress={verificarCodigo}>
              Verificar código
            </Button>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, flex: 1, justifyContent: 'center' },
  input: { marginBottom: 16 },
});