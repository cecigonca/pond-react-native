import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Appbar, useTheme, List } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function NotificationsScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [notificacoes, setNotificacoes] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      const carregar = async () => {
        try {
          const data = await AsyncStorage.getItem('notificacoes');
          const lista = data ? JSON.parse(data) : [];
          setNotificacoes(lista);
        } catch (error) {
          console.error('Erro ao carregar notificações:', error);
        }
      };
      carregar();
    }, [])
  );

  return (
    <>
      <Appbar.Header style={{ backgroundColor: colors.background, elevation: 0 }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color={colors.primary} />
        <Appbar.Content title="Notificações" titleStyle={{ color: colors.primary }} />
      </Appbar.Header>

      <FlatList
        data={notificacoes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <List.Item
            title={item.titulo}
            description={`${item.descricao}\n${new Date(item.data).toLocaleString('pt-BR')}`}
            left={(props) => <List.Icon {...props} icon="bell" color={colors.primary} />}
            style={styles.item}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhuma notificação por enquanto.</Text>
        }
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
  vazio: {
    textAlign: 'center',
    marginTop: 40,
    color: '#999',
    fontSize: 16,
  },
});
