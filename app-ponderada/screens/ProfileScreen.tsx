import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Avatar, useTheme, Button, Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function ProfileScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    telefone: '',
    dataCadastro: '',
    imagemPerfil: '',
  });

  useFocusEffect(
    useCallback(() => {
      const carregarUsuario = async () => {
        try {
          const dados = await AsyncStorage.getItem('usuarios');
          const todos = dados ? JSON.parse(dados) : [];
          const emailLogado = await AsyncStorage.getItem('usuarioLogado');
          const encontrado = todos.find((u: any) => u.email === emailLogado);
          if (encontrado) setUsuario(encontrado);
        } catch (e) {
          console.error('Erro ao carregar usuário:', e);
        }
      };

      carregarUsuario();
    }, [])
  );

  const formatarData = (dataISO: string) => {
    try {
      return new Date(dataISO).toLocaleDateString('pt-BR', {
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return 'Desconhecido';
    }
  };

  return (
    <>
      <Appbar.Header style={{ backgroundColor: colors.background, elevation: 0 }}>
        <Appbar.BackAction color={colors.primary} onPress={() => navigation.goBack()} />
        <Appbar.Content title="Perfil" titleStyle={{ color: colors.primary }} />
      </Appbar.Header>

      <View style={styles.container}>
        <View style={styles.topSection}>
          <Avatar.Image
            size={180}
            source={
              usuario.imagemPerfil
                ? { uri: usuario.imagemPerfil }
                : require('../assets/avatar.png')
            }
            style={{ backgroundColor: colors.primary }}
          />
          <Text variant="headlineSmall" style={[styles.nome, { color: colors.primary }]}>
            {usuario.nome || 'Nome da Usuária'}
          </Text>
          <Text style={styles.role}>Cliente Premium</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.infoGroup}>
            <Text style={styles.label}>E-mail</Text>
            <Text style={styles.info}>{usuario.email || 'email@exemplo.com'}</Text>
          </View>

          <View style={styles.infoGroup}>
            <Text style={styles.label}>Telefone</Text>
            <Text style={styles.info}>{usuario.telefone || '+55 11 91234-5678'}</Text>
          </View>

          <View style={styles.infoGroup}>
            <Text style={styles.label}>Membro desde</Text>
            <Text style={styles.info}>
              {usuario.dataCadastro
                ? formatarData(usuario.dataCadastro)
                : 'Desconhecido'}
            </Text>
          </View>
        </View>

        <Button
          mode="outlined"
          style={styles.botao}
          labelStyle={styles.botaoTexto}
          textColor={colors.primary}
          onPress={() => navigation.navigate('EditProfile')}
        >
          Editar Perfil
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  topSection: {
    alignItems: 'center',
    marginTop: 36,
  },
  nome: {
    marginTop: 20,
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: '#666',
  },
  card: {
    marginTop: 24,
    padding: 24,
    backgroundColor: '#F9F6F3',
    borderRadius: 12,
    elevation: 2,
  },
  infoGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  info: {
    fontSize: 16,
    color: '#333',
  },
  botao: {
    marginTop: 24,
    alignSelf: 'center',
    borderColor: '#AF8155',
    borderWidth: 1.3,
    borderRadius: 24,
    width: 200,
    height: 48,
    justifyContent: 'center',
  },
  botaoTexto: {
    fontWeight: '500',
    fontSize: 16,
  },
});