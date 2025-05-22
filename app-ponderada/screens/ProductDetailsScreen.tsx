import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView, Modal, Pressable } from 'react-native';
import { Appbar, Text, IconButton, useTheme } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ProductDetailsScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

  const { produto } = route.params as {
    produto: {
      nome: string;
      descricao: string;
      preco: string;
      imagem: any;
    };
  };

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Appbar.Header style={{ backgroundColor: colors.background, elevation: 0 }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color={colors.primary} />
        <Appbar.Content title="Detalhes" titleStyle={{ color: colors.primary }} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.container}>
        <Pressable onPress={() => setModalVisible(true)}>
          <Image source={produto.imagem} style={styles.image} resizeMode="cover" />
        </Pressable>

        <View style={styles.content}>
          <View style={styles.headerRow}>
            <Text variant="titleLarge" style={[styles.nome, { color: colors.primary }]}>  
              {produto.nome}
            </Text>
            <IconButton
              icon="heart-outline"
              size={24}
              onPress={() => alert('Favorito!')}
              iconColor={colors.primary}
            />
          </View>

          <Text variant="titleMedium" style={[styles.preco, { color: colors.secondary }]}>  
            {produto.preco}
          </Text>

          <Text style={styles.descricao}>{produto.descricao}</Text>
        </View>
      </ScrollView>

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <Pressable style={styles.modalContainer} onPress={() => setModalVisible(false)}>
          <Image source={produto.imagem} style={styles.fullscreenImage} resizeMode="contain" />
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 32,
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nome: {
    fontWeight: '600',
    fontSize: 22,
    flex: 1,
  },
  preco: {
    marginTop: 8,
    marginBottom: 16,
    fontWeight: '500',
  },
  descricao: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000dd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: '90%',
    height: '80%',
  },
});