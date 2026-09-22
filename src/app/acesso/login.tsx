import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useWindowDimensions,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();

  const { width, height } = useWindowDimensions();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [senha, setSenha] = useState('');

  // Controle para mostrar/esconder a senha
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const entrar = () => {
    console.log('Entrar');
  };

  const irParaCadastro = () => {
    router.push('/acesso/cadastro');
  };

  /*
   * Tamanhos proporcionais à tela
   */
  const larguraCampo = Math.min(width * 0.86, 360);
  const alturaCampo = Math.min(height * 0.067, 54);

  const larguraBotao = Math.min(width * 0.88, 353);
  const alturaBotao = Math.min(height * 0.085, 70);

  /*
   * Área verde
   */
  const alturaLogo = height * 0.25;

  return (
    <View style={styles.container}>

      <StatusBar
        barStyle="light-content"
        backgroundColor="#55793F"
      />

      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollConteudo}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >

          {/* PARTE VERDE / LOGO */}
          <View
            style={[
              styles.areaLogo,
              {
                height: alturaLogo,
              },
            ]}
          >
            <Image
              source={require('../../../assets/images/prosa_logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* PARTE CREME */}
          <View style={styles.caixaLogin}>

            {/* TÍTULO */}
            <Text style={styles.titulo}>
              Bem-Vindo!
            </Text>

            {/* LINHA ABAIXO DO TÍTULO */}
            <View style={styles.linhaTitulo} />

            {/* NOME */}
            <View
              style={[
                styles.campo,
                {
                  width: larguraCampo,
                  height: alturaCampo,
                  borderRadius: alturaCampo / 2,
                },
              ]}
            >
              <Ionicons
                name="person"
                size={18}
                color="#636161"
                style={styles.icone}
              />

              <TextInput
                style={[
                  styles.input,
                  {
                    height: alturaCampo,
                  },
                ]}
                placeholder="Seu nome..."
                placeholderTextColor="#BDBBB5"
                value={nome}
                onChangeText={setNome}
                autoCapitalize="words"
              />
            </View>

            {/* E-MAIL */}
            <View
              style={[
                styles.campo,
                {
                  width: larguraCampo,
                  height: alturaCampo,
                  borderRadius: alturaCampo / 2,
                },
              ]}
            >
              <Ionicons
                name="mail"
                size={18}
                color="#636161"
                style={styles.icone}
              />

              <TextInput
                style={[
                  styles.input,
                  {
                    height: alturaCampo,
                  },
                ]}
                placeholder="E-mail..."
                placeholderTextColor="#BDBBB5"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* DATA DE NASCIMENTO */}
            <View
              style={[
                styles.campo,
                {
                  width: larguraCampo,
                  height: alturaCampo,
                  borderRadius: alturaCampo / 2,
                },
              ]}
            >
              <Ionicons
                name="calendar"
                size={18}
                color="#636161"
                style={styles.icone}
              />

              <TextInput
                style={[
                  styles.input,
                  {
                    height: alturaCampo,
                  },
                ]}
                placeholder="Data de Nascimento..."
                placeholderTextColor="#BDBBB5"
                value={dataNascimento}
                onChangeText={setDataNascimento}
                keyboardType="numeric"
              />
            </View>

            {/* SENHA */}
            <View
              style={[
                styles.campo,
                {
                  width: larguraCampo,
                  height: alturaCampo,
                  borderRadius: alturaCampo / 2,
                },
              ]}
            >
              <Ionicons
                name="lock-closed"
                size={18}
                color="#636161"
                style={styles.icone}
              />

              <TextInput
                style={[
                  styles.input,
                  {
                    height: alturaCampo,
                  },
                ]}
                placeholder="Senha..."
                placeholderTextColor="#BDBBB5"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={!mostrarSenha}
              />

              {/* OLHO DA SENHA */}
              <Pressable
                onPress={() => setMostrarSenha(!mostrarSenha)}
                hitSlop={10}
              >
                <Ionicons
                  name={
                    mostrarSenha
                      ? 'eye-outline'
                      : 'eye-off-outline'
                  }
                  size={23}
                  color="#636161"
                />
              </Pressable>
            </View>

            {/* LINHA + CORAÇÃO */}
            <View
              style={[
                styles.linhaArea,
                {
                  width: larguraCampo,
                },
              ]}
            >
              <View style={styles.linha} />

              <Text style={styles.coracao}>
                ♡
              </Text>

              <View style={styles.linha} />
            </View>

            {/* BOTÃO */}
            <Pressable
              onPress={entrar}
              style={({ pressed }) => [
                styles.botao,
                {
                  width: larguraBotao,
                  height: alturaBotao,
                  borderRadius: alturaBotao / 2,
                },
                pressed && styles.botaoPressionado,
              ]}
            >
              <Text style={styles.textoBotao}>
                Entrar
              </Text>
            </Pressable>

            {/* LINK PARA CADASTRO */}
            <Pressable
              onPress={irParaCadastro}
              style={styles.areaCadastro}
            >
              <Text style={styles.textoCadastro}>
                Ainda não tem uma conta?{' '}
                <Text style={styles.linkCadastro}>
                  Cadastre-se...
                </Text>
              </Text>
            </Pressable>

          </View>

        </ScrollView>

      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#55793F',
  },

  keyboard: {
    flex: 1,
  },

  scroll: {
    flex: 1,
  },

  scrollConteudo: {
    flexGrow: 1,
  },

  /* ÁREA VERDE */

  areaLogo: {
    backgroundColor: '#55793F',

    justifyContent: 'center',
    alignItems: 'center',

    paddingTop: 10,
  },

  logo: {
    width: 260,
    height: 150,
    marginTop: 15,
  },

  /* ÁREA CREME */

  caixaLogin: {
    flex: 1,

    width: '100%',

    backgroundColor: '#FAF5E9',

    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,

    alignItems: 'center',

    paddingTop: 14,
    paddingBottom: 20,
  },

  /* TÍTULO */

  titulo: {
    fontSize: 35,

    color: '#636161',

    textAlign: 'center',

    fontWeight: '800',

    textDecorationLine: 'none',

    textShadowColor: 'rgba(99, 97, 97, 0.40)',

    textShadowOffset: {
      width: 2,
      height: 4,
    },

    textShadowRadius: 4,

    marginTop: 10,

    marginBottom: 10,
  },

  /* LINHA ABAIXO DO TÍTULO */

  linhaTitulo: {
    width: 280,

    height: 2,

    backgroundColor: '#CDC9BF',

    marginBottom: 30,
  },

  /* CAMPOS */

  campo: {
    borderWidth: 1.5,

    borderColor: '#CDC9BF',

    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: 15,

    backgroundColor: '#FAF5E9',

    marginBottom: 18,
  },

  icone: {
    marginRight: 8,
  },

  input: {
    flex: 1,

    fontSize: 17,

    color: '#636161',

    paddingVertical: 0,
  },

  /* LINHA DO CORAÇÃO */

  linhaArea: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop: 5,

    marginBottom: 15,
  },

  linha: {
    flex: 1,

    height: 2,

    backgroundColor: '#CDC9BF',
  },

  coracao: {
    fontSize: 25,

    color: '#CDC9BF',

    marginHorizontal: 10,
  },

  /* BOTÃO */

  botao: {
    backgroundColor: '#D8C33F',

    justifyContent: 'center',

    alignItems: 'center',

    marginBottom: 8,
  },

  botaoPressionado: {
    transform: [
      {
        scale: 0.97,
      },
    ],

    backgroundColor: '#C9B532',
  },

  textoBotao: {
    color: '#FFFFFF',

    fontSize: 26,

    fontWeight: '800',
  },

  /* LINK PARA CADASTRO */

  areaCadastro: {
    paddingVertical: 2,

    paddingHorizontal: 10,
  },

  textoCadastro: {
    color: '#636161',

    fontSize: 14,

    textAlign: 'center',
  },

  linkCadastro: {
    color: '#55793F',

    fontWeight: '700',
  },

});