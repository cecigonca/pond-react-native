import React from 'react';
import { View, FlatList, StyleSheet, Image } from 'react-native';
import { Appbar, Card, FAB, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const produtos = Array.from({ length: 10 }, (_, i) => ({
  id: i.toString(),
  nome: `Produto ${i + 1}`,
  descricao: `Descrição do produto ${i + 1}`,
}));

export default function HomeScreen() {
  const [fabOpen, setFabOpen] = React.useState(false);
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  return (
    <>
      {/* Appbar com fundo claro e ícones dourados */}
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        {/* Logo no canto esquerdo */}
        <Image
          source={require('../assets/logo.png')} // ajuste o caminho conforme seu projeto
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
          <Card style={styles.card} mode="elevated">
            <Card.Title title={item.nome} subtitle={item.descricao} />
          </Card>
        )}
      />

      {/* FAB com ícone branco */}
      <FAB.Group
        open={fabOpen}
        visible={true}
        icon={fabOpen ? 'close' : 'plus'}
        actions={[
          { icon: 'camera', label: 'Câmera', onPress: () => alert('Abrir câmera') },
          { icon: 'image', label: 'Upload de imagem', onPress: () => alert('Selecionar imagem') },
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
  },
  logo: {
    width: 32,
    height: 32,
    marginLeft: 12,
    marginRight: 8,
  },
});