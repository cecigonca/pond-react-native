import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Appbar, useTheme, Avatar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect, StackActions } from '@react-navigation/native';

export default function ProfileScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState({nome: '', email: '', telefone: '', dataCadastro: '', imagemPerfil: '',});

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

  const handleLogout = async () => {
    await AsyncStorage.removeItem('usuarioLogado');
    navigation.dispatch(StackActions.replace('Login'));
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
            size={160}
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

        <View style={styles.botoesContainer}>
          <Button
            mode="outlined"
            style={styles.botao}
            labelStyle={styles.botaoTexto}
            textColor={colors.primary}
            onPress={() => navigation.navigate('Favorites')}
          >
            Meus Favoritos
          </Button>

          <Button
            mode="outlined"
            style={styles.botao}
            labelStyle={styles.botaoTexto}
            textColor={colors.primary}
            onPress={() => navigation.navigate('EditProfile')}
          >
            Editar Perfil
          </Button>

          <Button
            mode="contained"
            style={styles.botaoLogout}
            labelStyle={styles.botaoTexto}
            onPress={handleLogout}
          >
            Sair da Conta
          </Button>
        </View>
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
    marginBottom: 24,
  },
  nome: {
    marginTop: 16,
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: '#666',
  },
  card: {
    padding: 24,
    backgroundColor: '#F9F6F3',
    borderRadius: 16,
    elevation: 2,
    marginBottom: 32,
  },
  infoGroup: {
    marginBottom: 12,
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
  botoesContainer: {
    gap: 8,
    alignItems: 'center',
  },
  botao: {
    borderColor: '#AF8155',
    borderWidth: 1.2,
    borderRadius: 24,
    width: 220,
    height: 48,
    justifyContent: 'center',
  },
  botaoLogout: {
    marginTop: 12,
    backgroundColor: '#E53935',
    borderRadius: 24,
    width: 220,
    height: 48,
    justifyContent: 'center',
  },
  botaoTexto: {
    fontWeight: '500',
    fontSize: 16,
  },
});