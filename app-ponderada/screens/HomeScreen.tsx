import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Appbar, Text, useTheme, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { gerarProdutosFalsos, Produto } from '../utils/FakeProducts';

const TAMANHO_PAGINA = 20;
const TOTAL_PRODUTOS = 10000;

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();

  const [todosProdutos, setTodosProdutos] = useState<Produto[]>([]);
  const [produtosVisiveis, setProdutosVisiveis] = useState<Produto[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [carregandoMais, setCarregandoMais] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);

  useEffect(() => {
    const gerarProdutos = () => {
      const produtos = gerarProdutosFalsos(TOTAL_PRODUTOS);
      setTodosProdutos(produtos);
      setProdutosVisiveis(produtos.slice(0, TAMANHO_PAGINA));
    };
    gerarProdutos();
  }, []);

  const carregarMais = () => {
    if (carregandoMais) return;

    setCarregandoMais(true);
    setTimeout(() => {
      const proximaPagina = paginaAtual + 1;
      const inicio = (proximaPagina - 1) * TAMANHO_PAGINA;
      const fim = inicio + TAMANHO_PAGINA;
      const novosProdutos = todosProdutos.slice(inicio, fim);
      setProdutosVisiveis((prev) => [...prev, ...novosProdutos]);
      setPaginaAtual(proximaPagina);
      setCarregandoMais(false);
    }, 1000); // Simula carregamento
  };

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
      console.log('Imagem capturada:', resultado.assets[0].uri);
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
      console.log('Imagem selecionada:', resultado.assets[0].uri);
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
        <Appbar.Content title="Produtos" titleStyle={{ color: colors.primary }} />
        <Appbar.Action icon="bell" color={colors.primary} onPress={() => navigation.navigate('Notifications')} />
        <Appbar.Action icon="account" color={colors.primary} onPress={() => navigation.navigate('Profile')} />
      </Appbar.Header>

      <FlatList
        data={produtosVisiveis}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.galeria}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemGaleria}
            onPress={() =>
              navigation.navigate('ProductDetails', {
                produto: item,
              })
            }
          >
            <Image source={item.imagem} style={styles.fotoProduto} />
            <Text style={[styles.nomeProduto, { color: colors.primary }]}>{item.nome}</Text>
          </TouchableOpacity>
        )}
        onEndReached={carregarMais}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          carregandoMais ? (
            <View style={styles.loading}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={{ color: colors.primary, marginTop: 6 }}>Carregando mais...</Text>
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
            color: colors.onPrimary,
            style: { backgroundColor: colors.primary },
          },
          {
            icon: 'image',
            label: 'Galeria',
            onPress: abrirGaleria,
            color: colors.onPrimary,
            style: { backgroundColor: colors.primary },
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