import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button, Appbar, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [nome, setNome] = useState('Nome da Usuária');
  const [email, setEmail] = useState('email@exemplo.com');
  const [telefone, setTelefone] = useState('+55 11 91234-5678');
  const [senha, setSenha] = useState('');

  return (
    <>
      <Appbar.Header style={{ backgroundColor: colors.background, elevation: 0 }}>
        <Appbar.BackAction color={colors.primary} onPress={() => navigation.goBack()} />
        <Appbar.Content title="Editar Perfil" titleStyle={{ color: colors.primary }} />
      </Appbar.Header>

      <View style={styles.container}>
        {/* Avatar com botão de edição */}
        <View style={styles.avatarContainer}>
          <Image
            source={require('../assets/avatar.png')}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editIcon} onPress={() => alert('Alterar foto')}>
            <Text style={styles.editText}>✎</Text>
          </TouchableOpacity>
        </View>

        {/* Formulário */}
        <TextInput
          label="Nome"
          mode="outlined"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
        />
        <TextInput
          label="E-mail"
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          label="Telefone"
          mode="outlined"
          keyboardType="phone-pad"
          value={telefone}
          onChangeText={setTelefone}
          style={styles.input}
        />
        <TextInput
          label="Senha"
          mode="outlined"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
          style={styles.input}
        />

        {/* Botão */}
        <Button
          mode="contained"
          onPress={() => alert('Perfil atualizado!')}
          style={styles.button}
          labelStyle={{ fontSize: 16 }}
        >
          Salvar Alterações
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: '#fff',
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: '36%',
    backgroundColor: '#AF8155',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  editText: {
    color: 'white',
    fontSize: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    borderRadius: 8,
    backgroundColor: '#AF8155',
  },
});
