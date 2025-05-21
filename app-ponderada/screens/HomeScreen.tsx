import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Appbar, Card, FAB, Text } from 'react-native-paper';

const produtos = Array.from({ length: 10 }, (_, i) => ({
  id: i.toString(),
  nome: `Produto ${i + 1}`,
  descricao: `Descrição do produto ${i + 1}`,
}));

export default function HomeScreen() {
  const [fabOpen, setFabOpen] = React.useState(false);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Lista de Produtos" />
        <Appbar.Action icon="bell" onPress={() => alert('Notificações')} />
        <Appbar.Action icon="account" onPress={() => alert('Perfil')} />
      </Appbar.Header>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title title={item.nome} subtitle={item.descricao} />
          </Card>
        )}
      />

      <FAB.Group
        open={fabOpen}
        visible
        icon={fabOpen ? 'close' : 'plus'}
        actions={[
          { icon: 'camera', label: 'Câmera', onPress: () => alert('Abrir câmera') },
          { icon: 'image', label: 'Upload de imagem', onPress: () => alert('Selecionar imagem') },
        ]}
        onStateChange={({ open }) => setFabOpen(open)}
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
});