import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Appbar, Text, List, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const notificacoesMock = [
  { id: '1', titulo: 'Novo produto adicionado', descricao: 'Camisa ecológica foi adicionada ao catálogo.' },
  { id: '2', titulo: 'Perfil atualizado', descricao: 'Seus dados de perfil foram atualizados com sucesso.' },
  { id: '3', titulo: 'Promoção ativa', descricao: 'Produtos selecionados com 20% off por tempo limitado!' },
];

export default function NotificationsScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <>
      <Appbar.Header style={{ backgroundColor: colors.background, elevation: 0 }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color={colors.primary} />
        <Appbar.Content title="Notificações" titleStyle={{ color: colors.primary }} />
      </Appbar.Header>

      <FlatList
        data={notificacoesMock}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <List.Item
            title={item.titulo}
            description={item.descricao}
            left={(props) => <List.Icon {...props} icon="bell" color={colors.primary} />}
            style={styles.item}
          />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  lista: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  item: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginBottom: 12,
  },
});