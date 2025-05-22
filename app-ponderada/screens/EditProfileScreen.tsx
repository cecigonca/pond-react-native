import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button, Appbar, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [imagemPerfil, setImagemPerfil] = useState<string | null>(null);
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [mensagemInfo, setMensagemInfo] = useState('');
  const [dadosOriginais, setDadosOriginais] = useState<any>(null);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const usuariosData = await AsyncStorage.getItem('usuarios');
        const usuarioLogado = await AsyncStorage.getItem('usuarioLogado');
        const listaUsuarios = usuariosData ? JSON.parse(usuariosData) : [];

        const usuarioAtual = listaUsuarios.find((u: any) => u.email === usuarioLogado);
        if (usuarioAtual) {
          setNome(usuarioAtual.nome);
          setEmail(usuarioAtual.email);
          setTelefone(usuarioAtual.telefone);
          setSenha(usuarioAtual.senha);
          setImagemPerfil(usuarioAtual.imagemPerfil || null);
          setDadosOriginais(usuarioAtual);
        }
      } catch (e) {
        console.error('Erro ao carregar dados do perfil:', e);
      }
    };

    carregarDados();
  }, []);

  const selecionarImagem = async () => {
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
      setImagemPerfil(resultado.assets[0].uri);
    }
  };

  const salvarAlteracoes = async () => {
    const houveMudanca =
      nome !== dadosOriginais?.nome ||
      telefone !== dadosOriginais?.telefone ||
      senha !== dadosOriginais?.senha ||
      imagemPerfil !== dadosOriginais?.imagemPerfil;

    if (!houveMudanca) {
      setMensagemInfo('Nenhuma alteração detectada.');
      setMensagemSucesso('');
      setTimeout(() => setMensagemInfo(''), 3000);
      return;
    }

    try {
      const usuariosData = await AsyncStorage.getItem('usuarios');
      const usuarioLogado = await AsyncStorage.getItem('usuarioLogado');
      const listaUsuarios = usuariosData ? JSON.parse(usuariosData) : [];

      const atualizados = listaUsuarios.map((u: any) =>
        u.email === usuarioLogado
          ? { ...u, nome, telefone, senha, imagemPerfil }
          : u
      );

      await AsyncStorage.setItem('usuarios', JSON.stringify(atualizados));

      setMensagemSucesso('Perfil atualizado com sucesso!');
      setMensagemInfo('');
      setDadosOriginais({ ...dadosOriginais, nome, telefone, senha, imagemPerfil });
      setTimeout(() => setMensagemSucesso(''), 3000);
    } catch (e) {
      console.error('Erro ao salvar alterações:', e);
      setMensagemInfo('Erro ao salvar alterações.');
      setTimeout(() => setMensagemInfo(''), 3000);
    }
  };

  return (
    <>
      <Appbar.Header style={{ backgroundColor: colors.background, elevation: 0 }}>
        <Appbar.BackAction color={colors.primary} onPress={() => navigation.goBack()} />
        <Appbar.Content title="Editar Perfil" titleStyle={{ color: colors.primary }} />
      </Appbar.Header>

      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image
            source={imagemPerfil ? { uri: imagemPerfil } : require('../assets/avatar.png')}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editIcon} onPress={selecionarImagem}>
            <Text style={styles.editText}>✎</Text>
          </TouchableOpacity>
        </View>

        <TextInput label="Nome" mode="outlined" value={nome} onChangeText={setNome} style={styles.input} />
        <TextInput label="E-mail" mode="outlined" value={email} disabled style={styles.input} />
        <TextInput label="Telefone" mode="outlined" value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" style={styles.input} />
        <TextInput label="Senha" mode="outlined" value={senha} onChangeText={setSenha} secureTextEntry style={styles.input} />

        <Button mode="contained" onPress={salvarAlteracoes} style={styles.button} labelStyle={{ fontSize: 16 }}>
          Salvar Alterações
        </Button>

        {mensagemSucesso !== '' && (
          <Text style={styles.mensagemSucesso}>{mensagemSucesso}</Text>
        )}
        {mensagemInfo !== '' && (
          <Text style={styles.mensagemInfo}>{mensagemInfo}</Text>
        )}
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
  mensagemSucesso: {
    textAlign: 'center',
    marginTop: 12,
    color: 'green',
    fontSize: 14,
  },
  mensagemInfo: {
    textAlign: 'center',
    marginTop: 12,
    color: '#666',
    fontSize: 14,
  },
});