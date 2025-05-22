import React from 'react';
import { View, FlatList, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Appbar, FAB, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const produtos = Array.from({ length: 10 }, (_, i) => ({
  id: i.toString(),
  nome: `Produto ${i + 1}`,
  preco: `R$ ${(i + 1) * 10},00`,
  descricao: `Descrição do produto ${i + 1}`,
  imagem: require('../assets/produto.png'), // ajuste para suas imagens reais
}));

export default function HomeScreen() {
  const [fabOpen, setFabOpen] = React.useState(false);
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

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
        <Appbar.Content
          title="Lista de Produtos"
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
        data={produtos}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.galeria}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemGaleria}
            onPress={() =>
              navigation.navigate('ProductDetails', {
                produto: {
                  nome: item.nome,
                  descricao: item.descricao,
                  preco: item.preco,
                  imagem: item.imagem,
                },
              })
            }
          >
            <Image source={item.imagem} style={styles.fotoProduto} />
            <Text style={[styles.nomeProduto, { color: colors.primary }]}>
              {item.nome}
            </Text>
          </TouchableOpacity>
        )}
      />

      <FAB.Group
        open={fabOpen}
        visible={true}
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
            label: 'Upload de imagem',
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
  logo: {
    width: 32,
    height: 32,
    marginLeft: 12,
    marginRight: 8,
  },
});
