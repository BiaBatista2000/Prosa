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
  Alert,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function Cadastro() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] =
    useState(false);

  const [mostrarCalendario, setMostrarCalendario] =
    useState(false);

  const [mostrarAnos, setMostrarAnos] = useState(false);

  const hoje = new Date();

  const [mesAtual, setMesAtual] = useState(
    hoje.getMonth()
  );

  const [anoAtual, setAnoAtual] = useState(
    hoje.getFullYear()
  );

  const [dataEscolhida, setDataEscolhida] = useState<{
    dia: number;
    mes: number;
    ano: number;
  } | null>(null);

  const meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const diasSemana = [
    'DOM',
    'SEG',
    'TER',
    'QUA',
    'QUI',
    'SEX',
    'SÁB',
  ];

  const anos = [];

  for (
    let ano = hoje.getFullYear();
    ano >= 1920;
    ano--
  ) {
    anos.push(ano);
  }

  const quantidadeDias = new Date(
    anoAtual,
    mesAtual + 1,
    0
  ).getDate();

  const primeiroDia = new Date(
    anoAtual,
    mesAtual,
    1
  ).getDay();

  const diasCalendario: (number | null)[] = [];

  for (let i = 0; i < primeiroDia; i++) {
    diasCalendario.push(null);
  }

  for (
    let dia = 1;
    dia <= quantidadeDias;
    dia++
  ) {
    diasCalendario.push(dia);
  }

  const abrirCalendario = () => {
    if (dataEscolhida) {
      setMesAtual(dataEscolhida.mes);
      setAnoAtual(dataEscolhida.ano);
    } else {
      setMesAtual(hoje.getMonth());
      setAnoAtual(hoje.getFullYear());
    }

    setMostrarAnos(false);
    setMostrarCalendario(true);
  };

  const mudarMes = (direcao: number) => {
    let novoMes = mesAtual + direcao;
    let novoAno = anoAtual;

    if (novoMes < 0) {
      novoMes = 11;
      novoAno = novoAno - 1;
    }

    if (novoMes > 11) {
      novoMes = 0;
      novoAno = novoAno + 1;
    }

    setMesAtual(novoMes);
    setAnoAtual(novoAno);
  };

  const selecionarAno = (ano: number) => {
    setAnoAtual(ano);
    setMostrarAnos(false);

    const quantidadeDiasNoMes = new Date(
      ano,
      mesAtual + 1,
      0
    ).getDate();

    if (
      dataEscolhida &&
      dataEscolhida.dia > quantidadeDiasNoMes
    ) {
      setDataEscolhida({
        dia: quantidadeDiasNoMes,
        mes: mesAtual,
        ano: ano,
      });
    }
  };

  const selecionarDia = (dia: number) => {
    setDataEscolhida({
      dia: dia,
      mes: mesAtual,
      ano: anoAtual,
    });
  };

  const confirmarData = () => {
    if (!dataEscolhida) {
      return;
    }

    const diaFormatado = String(
      dataEscolhida.dia
    ).padStart(2, '0');

    const mesFormatado = String(
      dataEscolhida.mes + 1
    ).padStart(2, '0');

    const dataFormatada =
      diaFormatado +
      '/' +
      mesFormatado +
      '/' +
      String(dataEscolhida.ano);

    setDataNascimento(dataFormatada);
    setMostrarCalendario(false);
    setMostrarAnos(false);
  };

  const cancelarCalendario = () => {
    setMostrarCalendario(false);
    setMostrarAnos(false);
  };

  const irParaHoje = () => {
    setMesAtual(hoje.getMonth());
    setAnoAtual(hoje.getFullYear());

    setDataEscolhida({
      dia: hoje.getDate(),
      mes: hoje.getMonth(),
      ano: hoje.getFullYear(),
    });

    setMostrarAnos(false);
  };

  const cadastrar = () => {
    if (
      nome.trim() === '' ||
      email.trim() === '' ||
      dataNascimento.trim() === '' ||
      senha.trim() === '' ||
      confirmarSenha.trim() === ''
    ) {
      Alert.alert(
        'Preencha todos os campos',
        'Para realizar o cadastro, preencha todos os campos.'
      );
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert(
        'Senhas diferentes',
        'A senha e a confirmação de senha precisam ser iguais.'
      );
      return;
    }

    Alert.alert(
      'Cadastro realizado!',
      'Seu cadastro foi realizado com sucesso. Esta é uma mensagem de demonstração.',
      [
        {
          text: 'OK',
        },
      ]
    );
  };

  const irParaLogin = () => {
    router.push('/acesso/login');
  };

  const larguraCampo = Math.min(
    width * 0.86,
    360
  );

  const alturaCampo = Math.min(
    height * 0.067,
    54
  );

  const larguraBotao = Math.min(
    width * 0.88,
    353
  );

  const alturaBotao = Math.min(
    height * 0.085,
    70
  );

  const alturaLogo = height * 0.25;

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#55793F"
      />

      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={
            styles.scrollConteudo
          }
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled={true}
        >
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

          <View style={styles.caixaCadastro}>
            <Text style={styles.titulo}>
              Bem-Vindo!
            </Text>

            <View style={styles.linhaTitulo} />

            <View
              style={[
                styles.campo,
                {
                  width: larguraCampo,
                  height: alturaCampo,
                  borderRadius:
                    alturaCampo / 2,
                },
              ]}
            >
              <Ionicons
                name="person"
                size={20}
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

            <View
              style={[
                styles.campo,
                {
                  width: larguraCampo,
                  height: alturaCampo,
                  borderRadius:
                    alturaCampo / 2,
                },
              ]}
            >
              <Ionicons
                name="mail"
                size={20}
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

            <Pressable
              onPress={abrirCalendario}
              style={[
                styles.campo,
                {
                  width: larguraCampo,
                  height: alturaCampo,
                  borderRadius:
                    alturaCampo / 2,
                },
              ]}
            >
              <Ionicons
                name="calendar"
                size={20}
                color="#636161"
                style={styles.icone}
              />

              <Text
                style={[
                  styles.dataTexto,
                  {
                    color: dataNascimento
                      ? '#636161'
                      : '#BDBBB5',
                  },
                ]}
              >
                {dataNascimento ||
                  'Data de Nascimento...'}
              </Text>

              <Ionicons
                name="chevron-down"
                size={22}
                color="#636161"
              />
            </Pressable>

            {mostrarCalendario && (
              <View
                style={[
                  styles.calendario,
                  {
                    width: larguraCampo,
                  },
                ]}
              >
                <View
                  style={
                    styles.cabecalhoSuperior
                  }
                >
                  <Text
                    style={
                      styles.tituloCalendario
                    }
                  >
                    Data de nascimento
                  </Text>

                  <Pressable
                    onPress={cancelarCalendario}
                    style={styles.botaoFechar}
                  >
                    <Ionicons
                      name="close"
                      size={27}
                      color="#636161"
                    />
                  </Pressable>
                </View>

                <View
                  style={
                    styles.areaDataSelecionada
                  }
                >
                  <Text
                    style={
                      styles.labelSelecionada
                    }
                  >
                    DATA ESCOLHIDA
                  </Text>

                  <Text style={styles.dataGrande}>
                    {dataEscolhida
                      ? String(
                          dataEscolhida.dia
                        ).padStart(2, '0') +
                        '/' +
                        String(
                          dataEscolhida.mes + 1
                        ).padStart(2, '0') +
                        '/' +
                        String(
                          dataEscolhida.ano
                        )
                      : '--/--/----'}
                  </Text>
                </View>

                {!mostrarAnos ? (
                  <>
                    <View
                      style={
                        styles.navegacaoMes
                      }
                    >
                      <Pressable
                        onPress={() =>
                          mudarMes(-1)
                        }
                        style={
                          styles.botaoNavegacao
                        }
                      >
                        <Ionicons
                          name="chevron-back"
                          size={36}
                          color="#55793F"
                        />
                      </Pressable>

                      <View
                        style={
                          styles.mesCentral
                        }
                      >
                        <Text
                          style={styles.mesAno}
                        >
                          {meses[mesAtual]}
                        </Text>

                        <Pressable
                          onPress={() =>
                            setMostrarAnos(
                              true
                            )
                          }
                          style={styles.botaoAno}
                        >
                          <Text
                            style={styles.ano}
                          >
                            {anoAtual}
                          </Text>

                          <Ionicons
                            name="chevron-down"
                            size={19}
                            color="#55793F"
                          />
                        </Pressable>
                      </View>

                      <Pressable
                        onPress={() =>
                          mudarMes(1)
                        }
                        style={
                          styles.botaoNavegacao
                        }
                      >
                        <Ionicons
                          name="chevron-forward"
                          size={36}
                          color="#55793F"
                        />
                      </Pressable>
                    </View>

                    <View
                      style={
                        styles.linhaCalendario
                      }
                    />

                    <View
                      style={styles.diasSemana}
                    >
                      {diasSemana.map(
                        (dia) => (
                          <Text
                            key={dia}
                            style={
                              styles.nomeDiaSemana
                            }
                          >
                            {dia}
                          </Text>
                        )
                      )}
                    </View>

                    <View
                      style={styles.gradeDias}
                    >
                      {diasCalendario.map(
                        (dia, index) => {
                          if (dia === null) {
                            return (
                              <View
                                key={
                                  'vazio-' +
                                  index
                                }
                                style={
                                  styles.dia
                                }
                              />
                            );
                          }

                          const selecionado =
                            dataEscolhida?.dia ===
                              dia &&
                            dataEscolhida?.mes ===
                              mesAtual &&
                            dataEscolhida?.ano ===
                              anoAtual;

                          return (
                            <Pressable
                              key={
                                String(
                                  anoAtual
                                ) +
                                '-' +
                                String(
                                  mesAtual
                                ) +
                                '-' +
                                String(dia)
                              }
                              onPress={() =>
                                selecionarDia(
                                  dia
                                )
                              }
                              style={[
                                styles.dia,
                                selecionado &&
                                  styles.diaSelecionado,
                              ]}
                            >
                              <Text
                                style={[
                                  styles.numeroDia,
                                  selecionado &&
                                    styles.numeroDiaSelecionado,
                                ]}
                              >
                                {dia}
                              </Text>
                            </Pressable>
                          );
                        }
                      )}
                    </View>

                    <View
                      style={styles.areaBotoes}
                    >
                      <Pressable
                        onPress={irParaHoje}
                        style={
                          styles.botaoHoje
                        }
                      >
                        <Ionicons
                          name="today"
                          size={23}
                          color="#55793F"
                        />

                        <Text
                          style={
                            styles.textoHoje
                          }
                        >
                          Hoje
                        </Text>
                      </Pressable>

                      <Pressable
                        onPress={confirmarData}
                        style={[
                          styles.botaoConfirmar,
                          !dataEscolhida &&
                            styles.botaoConfirmarDesativado,
                        ]}
                      >
                        <Ionicons
                          name="checkmark-circle"
                          size={24}
                          color="#FFFFFF"
                        />

                        <Text
                          style={
                            styles.textoConfirmar
                          }
                        >
                          Confirmar data
                        </Text>
                      </Pressable>
                    </View>

                    <Text
                      style={
                        styles.instrucaoCalendario
                      }
                    >
                      Primeiro toque no dia e depois confirme
                    </Text>
                  </>
                ) : (
                  <View style={styles.areaAnos}>
                    <View
                      style={
                        styles.cabecalhoAnos
                      }
                    >
                      <Text
                        style={styles.tituloAnos}
                      >
                        Escolha o ano
                      </Text>

                      <Pressable
                        onPress={() =>
                          setMostrarAnos(false)
                        }
                        style={
                          styles.botaoVoltarCalendario
                        }
                      >
                        <Ionicons
                          name="arrow-back"
                          size={25}
                          color="#55793F"
                        />

                        <Text
                          style={
                            styles.textoVoltarCalendario
                          }
                        >
                          Calendário
                        </Text>
                      </Pressable>
                    </View>

                    <ScrollView
                      style={styles.listaAnos}
                      contentContainerStyle={
                        styles.conteudoListaAnos
                      }
                      showsVerticalScrollIndicator={
                        true
                      }
                      nestedScrollEnabled={true}
                      keyboardShouldPersistTaps="handled"
                    >
                      {anos.map((ano) => {
                        const anoSelecionado =
                          ano === anoAtual;

                        return (
                          <Pressable
                            key={ano}
                            onPress={() =>
                              selecionarAno(
                                ano
                              )
                            }
                            style={[
                              styles.itemAno,
                              anoSelecionado &&
                                styles.itemAnoSelecionado,
                            ]}
                          >
                            <Text
                              style={[
                                styles.textoAno,
                                anoSelecionado &&
                                  styles.textoAnoSelecionado,
                              ]}
                            >
                              {ano}
                            </Text>

                            {anoSelecionado && (
                              <Ionicons
                                name="checkmark-circle"
                                size={25}
                                color="#FFFFFF"
                              />
                            )}
                          </Pressable>
                        );
                      })}
                    </ScrollView>
                  </View>
                )}
              </View>
            )}

            <View
              style={[
                styles.campo,
                {
                  width: larguraCampo,
                  height: alturaCampo,
                  borderRadius:
                    alturaCampo / 2,
                },
              ]}
            >
              <Ionicons
                name="lock-closed"
                size={20}
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

              <Pressable
                onPress={() =>
                  setMostrarSenha(
                    !mostrarSenha
                  )
                }
                hitSlop={10}
              >
                <Ionicons
                  name={
                    mostrarSenha
                      ? 'eye-outline'
                      : 'eye-off-outline'
                  }
                  size={25}
                  color="#636161"
                />
              </Pressable>
            </View>

            <View
              style={[
                styles.campo,
                {
                  width: larguraCampo,
                  height: alturaCampo,
                  borderRadius:
                    alturaCampo / 2,
                },
              ]}
            >
              <Ionicons
                name="lock-closed"
                size={20}
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
                placeholder="Confirmar senha..."
                placeholderTextColor="#BDBBB5"
                value={confirmarSenha}
                onChangeText={
                  setConfirmarSenha
                }
                secureTextEntry={
                  !mostrarConfirmarSenha
                }
              />

              <Pressable
                onPress={() =>
                  setMostrarConfirmarSenha(
                    !mostrarConfirmarSenha
                  )
                }
                hitSlop={10}
              >
                <Ionicons
                  name={
                    mostrarConfirmarSenha
                      ? 'eye-outline'
                      : 'eye-off-outline'
                  }
                  size={25}
                  color="#636161"
                />
              </Pressable>
            </View>

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

            <Pressable
              onPress={cadastrar}
              style={({ pressed }) => [
                styles.botao,
                {
                  width: larguraBotao,
                  height: alturaBotao,
                  borderRadius:
                    alturaBotao / 2,
                },
                pressed &&
                  styles.botaoPressionado,
              ]}
            >
              <Text style={styles.textoBotao}>
                Cadastrar
              </Text>
            </Pressable>

            <Pressable
              onPress={irParaLogin}
              style={styles.areaLogin}
            >
              <Text style={styles.textoLogin}>
                Já tem uma conta?{' '}
                <Text style={styles.linkLogin}>
                  Entre...
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

  caixaCadastro: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FAF5E9',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 20,
  },

  titulo: {
    fontSize: 35,
    color: '#636161',
    textAlign: 'center',
    fontWeight: '800',
    textShadowColor:
      'rgba(99, 97, 97, 0.40)',
    textShadowOffset: {
      width: 2,
      height: 4,
    },
    textShadowRadius: 4,
    marginTop: 10,
    marginBottom: 10,
  },

  linhaTitulo: {
    width: 280,
    height: 2,
    backgroundColor: '#CDC9BF',
    marginBottom: 30,
  },

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

  dataTexto: {
    flex: 1,
    fontSize: 17,
    textAlignVertical: 'center',
  },

  calendario: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#CDC9BF',
    borderRadius: 24,
    padding: 18,
    marginTop: -5,
    marginBottom: 18,
  },

  cabecalhoSuperior: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  tituloCalendario: {
    color: '#636161',
    fontSize: 21,
    fontWeight: '800',
  },

  botaoFechar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#F4F0E5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  areaDataSelecionada: {
    backgroundColor: '#F4F0E5',
    borderRadius: 18,
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 12,
    marginBottom: 15,
  },

  labelSelecionada: {
    color: '#55793F',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  dataGrande: {
    color: '#636161',
    fontSize: 26,
    fontWeight: '900',
    marginTop: 3,
  },

  navegacaoMes: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  botaoNavegacao: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#F4F0E5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  mesCentral: {
    flex: 1,
    alignItems: 'center',
  },

  mesAno: {
    color: '#636161',
    fontSize: 22,
    fontWeight: '900',
  },

  botaoAno: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
  },

  ano: {
    color: '#55793F',
    fontSize: 18,
    fontWeight: '700',
    marginRight: 4,
  },

  linhaCalendario: {
    height: 1.5,
    backgroundColor: '#E2DED4',
    marginVertical: 14,
  },

  diasSemana: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
  },

  nomeDiaSemana: {
    width: '14.28%',
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '900',
    color: '#55793F',
  },

  gradeDias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  dia: {
    width: '14.28%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    marginVertical: 2,
  },

  diaSelecionado: {
    backgroundColor: '#55793F',
  },

  numeroDia: {
    fontSize: 19,
    color: '#636161',
    fontWeight: '600',
  },

  numeroDiaSelecionado: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 20,
  },

  areaBotoes: {
    marginTop: 14,
    gap: 10,
  },

  botaoHoje: {
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#55793F',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textoHoje: {
    color: '#55793F',
    fontSize: 17,
    fontWeight: '900',
    marginLeft: 8,
  },

  botaoConfirmar: {
    height: 54,
    borderRadius: 27,
    backgroundColor: '#D8C33F',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  botaoConfirmarDesativado: {
    opacity: 0.45,
  },

  textoConfirmar: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    marginLeft: 8,
  },

  instrucaoCalendario: {
    textAlign: 'center',
    color: '#77746D',
    fontSize: 13,
    marginTop: 11,
  },

  areaAnos: {
    marginTop: 4,
  },

  cabecalhoAnos: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  tituloAnos: {
    color: '#636161',
    fontSize: 21,
    fontWeight: '900',
  },

  botaoVoltarCalendario: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F0E5',
    borderRadius: 18,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },

  textoVoltarCalendario: {
    color: '#55793F',
    fontSize: 14,
    fontWeight: '800',
    marginLeft: 5,
  },

  listaAnos: {
    height: 330,
    flexGrow: 0,
  },

  conteudoListaAnos: {
    paddingBottom: 10,
  },

  itemAno: {
    minHeight: 52,
    borderRadius: 18,
    backgroundColor: '#F4F0E5',
    marginBottom: 8,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  itemAnoSelecionado: {
    backgroundColor: '#55793F',
  },

  textoAno: {
    color: '#636161',
    fontSize: 20,
    fontWeight: '800',
  },

  textoAnoSelecionado: {
    color: '#FFFFFF',
  },

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

  areaLogin: {
    paddingVertical: 2,
    paddingHorizontal: 10,
  },

  textoLogin: {
    color: '#636161',
    fontSize: 14,
    textAlign: 'center',
  },

  linkLogin: {
    color: '#55793F',
    fontWeight: '700',
  },
});
