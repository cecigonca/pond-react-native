import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Appbar, Text, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function FavoritesScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [favoritos, setFavoritos] = useState<any[]>([]);

  useEffect(() => {
    const carregar = async () => {
      const email = await AsyncStorage.getItem('usuarioLogado');
      const data = await AsyncStorage.getItem(`favoritos_${email}`);
      setFavoritos(data ? JSON.parse(data) : []);
    };
    carregar();
  }, []);

  return (
    <>
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color={colors.primary} />
        <Appbar.Content title="Meus Favoritos" titleStyle={{ color: colors.primary }} />
      </Appbar.Header>

      <FlatList
        data={favoritos}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={item.imagem} style={styles.foto} />
            <Text style={[styles.nome, { color: colors.primary }]}>{item.nome}</Text>
            <Text style={styles.preco}>{item.preco}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhum produto favoritado ainda.</Text>
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  lista: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    elevation: 3,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  foto: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  nome: {
    fontSize: 16,
    fontWeight: '500',
  },
  preco: {
    fontSize: 14,
    color: '#666',
  },
  vazio: {
    textAlign: 'center',
    marginTop: 40,
    color: '#999',
  },
});
