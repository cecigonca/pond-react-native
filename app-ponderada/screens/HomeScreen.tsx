import React from 'react';
import { View, FlatList, StyleSheet, Image } from 'react-native';
import { Appbar, Card, FAB, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const produtos = Array.from({ length: 10 }, (_, i) => ({
  id: i.toString(),
  nome: `Produto ${i + 1}`,
  descricao: `Descrição do produto ${i + 1}`,
}));

export default function HomeScreen() {
  const [fabOpen, setFabOpen] = React.useState(false);
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  // 📷 Abertura da câmera
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

  // 🖼️ Abertura da galeria
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
      {/* Appbar com fundo claro e ícones dourados */}
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

      {/* Lista de produtos */}
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <Card
            style={[styles.card, { backgroundColor: colors.surface }]}
            mode="elevated"
          >
            <Card.Title
              title={item.nome}
              subtitle={item.descricao}
              titleStyle={{ color: colors.primary }}
              subtitleStyle={{ color: colors.onSurface }}
            />
          </Card>
        )}
      />

      {/* FAB com ações da paleta personalizada */}
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
  lista: {
    padding: 8,
  },
  card: {
    marginBottom: 8,
    borderRadius: 12,
  },
  logo: {
    width: 32,
    height: 32,
    marginLeft: 12,
    marginRight: 8,
  },
});
