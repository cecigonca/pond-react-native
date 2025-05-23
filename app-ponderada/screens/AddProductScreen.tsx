// AddProductScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Text, Appbar, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import uuid from 'react-native-uuid';

export default function AddProductScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { imageUri } = (route.params as any) || {};

  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleAddProduct = async () => {
    if (!nome || !preco || !descricao) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    try {
      const email = await AsyncStorage.getItem('usuarioLogado');
      if (!email) {
        Alert.alert('Erro', 'Usuário não logado');
        return;
      }
      const key = `produtosReais_${email}`;
      const data = await AsyncStorage.getItem(key);
      const produtos = data ? JSON.parse(data) : [];

      const novoProduto = {
        id: uuid.v4().toString(),
        nome,
        preco,
        descricao,
        imagem: { uri: imageUri },
      };

      const atualizados = [novoProduto, ...produtos];
      await AsyncStorage.setItem(key, JSON.stringify(atualizados));

      Alert.alert('Sucesso', 'Produto adicionado com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      Alert.alert('Erro', 'Não foi possível adicionar o produto');
    }
  };

  return (
    <>
      <Appbar.Header style={{ backgroundColor: colors.background, elevation: 0 }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color={colors.primary} />
        <Appbar.Content title="Novo Produto" titleStyle={{ color: colors.primary }} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.container}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text style={styles.placeholder}>Nenhuma imagem selecionada</Text>
        )}

        <TextInput
          label="Nome do produto"
          value={nome}
          onChangeText={setNome}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Preço"
          value={preco}
          onChangeText={setPreco}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Descrição"
          value={descricao}
          onChangeText={setDescricao}
          multiline
          mode="outlined"
          style={[styles.input, { height: 100 }]}
        />

        <Button
          mode="contained"
          onPress={handleAddProduct}
          style={[styles.button, { backgroundColor: colors.primary }]}
          labelStyle={{ color: colors.onPrimary }}
        >
          Adicionar Produto
        </Button>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  placeholder: {
    textAlign: 'center',
    marginVertical: 16,
    color: '#999',
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
