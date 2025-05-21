import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Avatar, useTheme, Button, Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <>
      <Appbar.Header style={{ backgroundColor: colors.background, elevation: 0 }}>
        <Appbar.BackAction color={colors.primary} onPress={() => navigation.goBack()} />
        <Appbar.Content title="Perfil" titleStyle={{ color: colors.primary }} />
      </Appbar.Header>

      <View style={styles.container}>
        {/* Bloco de topo */}
        <View style={styles.topSection}>
          <Avatar.Image
            size={180}
            source={require('../assets/avatar.png')}
            style={{ backgroundColor: colors.primary }}
          />
          <Text variant="headlineSmall" style={[styles.nome, { color: colors.primary }]}>
            Nome da Usuária
          </Text>
          <Text style={styles.role}>Cliente Premium</Text>
        </View>

        {/* Card com informações */}
        <View style={styles.card}>
          <View style={styles.infoGroup}>
            <Text style={styles.label}>E-mail</Text>
            <Text style={styles.info}>email@exemplo.com</Text>
          </View>

          <View style={styles.infoGroup}>
            <Text style={styles.label}>Telefone</Text>
            <Text style={styles.info}>+55 11 91234-5678</Text>
          </View>

          <View style={styles.infoGroup}>
            <Text style={styles.label}>Membro desde</Text>
            <Text style={styles.info}>jan/2024</Text>
          </View>
        </View>

        {/* Botão */}
        <Button
          mode="outlined"
          style={styles.botao}
          labelStyle={styles.botaoTexto}
          textColor={colors.primary}
          onPress={() => alert('Funcionalidade futura: editar perfil')}
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