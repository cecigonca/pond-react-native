import React, { useEffect, useState, useCallback } from 'react';
import {View, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import { Appbar, Text, useTheme, FAB } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { gerarProdutosFalsos, Produto } from '../utils/FakeProducts';

const TAMANHO_PAGINA = 20;
const TOTAL_PRODUTOS = 10000;

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();

  // gera produtos falsos 
  const [todosProdutos] = useState<Produto[]>(() =>
    gerarProdutosFalsos(TOTAL_PRODUTOS)
  );

  const [produtosReais, setProdutosReais] = useState<Produto[]>([]);
  const [produtosVisiveis, setProdutosVisiveis] = useState<Produto[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [carregandoMais, setCarregandoMais] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);

  // carrega produtos reais
  useFocusEffect(
    useCallback(() => {
      (async () => {
        const email = await AsyncStorage.getItem('usuarioLogado');
        const data = await AsyncStorage.getItem(`produtosReais_${email}`);
        setProdutosReais(data ? JSON.parse(data) : []);
      })();
    }, [])
  );

  // recarrega a pag para add produto real novo
  useEffect(() => {
    setProdutosVisiveis([
      ...produtosReais,
      ...todosProdutos.slice(0, TAMANHO_PAGINA),
    ]);
    setPaginaAtual(1);
  }, [produtosReais, todosProdutos]);

  // scroll infinito para fake products
  const carregarMais = () => {
    if (carregandoMais) return;
    setCarregandoMais(true);

    setTimeout(() => {
      const proximaPagina = paginaAtual + 1;
      const inicioFake = (proximaPagina - 1) * TAMANHO_PAGINA;
      const fimFake = inicioFake + TAMANHO_PAGINA;
      const novosFake = todosProdutos.slice(inicioFake, fimFake);

      setProdutosVisiveis(prev => [...prev, ...novosFake]);
      setPaginaAtual(proximaPagina);
      setCarregandoMais(false);
    }, 1000);
  };

  // ações da FAB: câmera e galeria
  const abrirCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão para acessar a câmera negada.');
      return;
    }
    const resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    if (!resultado.canceled) {
      navigation.navigate('AddProduct', { imageUri: resultado.assets[0].uri });
    }
  };

  const abrirGaleria = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão para acessar a galeria negada.');
      return;
    }
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    if (!resultado.canceled) {
      navigation.navigate('AddProduct', { imageUri: resultado.assets[0].uri });
    }
  };

  return (
    <>
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Appbar.Content
          title="Produtos"
          titleStyle={{ color: colors.primary }}
        />
        <Appbar.Action
          icon="bell"
          color={colors.primary}
          onPress={() => navigation.navigate('Notifications')}
        />
        <Appbar.Action
          icon="account"
          color={colors.primary}
          onPress={() => navigation.navigate('Profile')}
        />
      </Appbar.Header>

      <FlatList
        data={produtosVisiveis}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.galeria}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemGaleria}
            onPress={() =>
              navigation.navigate('ProductDetails', { produto: item })
            }
          >
            <Image source={item.imagem} style={styles.fotoProduto} />
            <Text
              style={[styles.nomeProduto, { color: colors.primary }]}
            >
              {item.nome}
            </Text>
          </TouchableOpacity>
        )}
        onEndReached={carregarMais}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          carregandoMais ? (
            <View style={styles.loading}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={{ color: colors.primary, marginTop: 6 }}>
                Carregando mais...
              </Text>
            </View>
          ) : null
        }
      />

      <FAB.Group
        open={fabOpen}
        visible
        icon={fabOpen ? 'close' : 'plus'}
        actions={[
          {
            icon: 'camera',
            label: 'Câmera',
            onPress: abrirCamera,
            style: { backgroundColor: colors.primary },
            color: colors.onPrimary,
          },
          {
            icon: 'image',
            label: 'Galeria',
            onPress: abrirGaleria,
            style: { backgroundColor: colors.primary },
            color: colors.onPrimary,
          },
        ]}
        onStateChange={({ open }) => setFabOpen(open)}
        fabStyle={{ backgroundColor: colors.primary }}
        color={colors.onPrimary}
      />
    </>
  );
}

const styles = StyleSheet.create({
  galeria: {
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 24,
  },
  itemGaleria: {
    flex: 1,
    alignItems: 'center',
    margin: 8,
    backgroundColor: '#F9F6F3',
    borderRadius: 12,
    padding: 12,
  },
  fotoProduto: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  nomeProduto: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  loading: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  logo: {
    width: 32,
    height: 32,
    marginLeft: 12,
    marginRight: 8,
  },
});