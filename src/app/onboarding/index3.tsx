import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  StatusBar,
  Animated,
} from 'react-native';

import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';

export default function Onboarding3() {
  const router = useRouter();

  // ==========================================
  // ANIMAÇÕES
  // ==========================================

  const inicialTituloAnim = useRef(
    new Animated.Value(0)
  ).current;

  const imagemAnim = useRef(
    new Animated.Value(0)
  ).current;

  const finalTituloAnim = useRef(
    new Animated.Value(0)
  ).current;

  const textoSimAnim = useRef(
    new Animated.Value(0)
  ).current;

  const botaoAnim = useRef(
    new Animated.Value(0)
  ).current;

  // ==========================================
  // TEXTOS
  // ==========================================

  const textoCompartilhe =
    'É simples: por meio de uma boa conversa! Compartilhe histórias, relatos e momentos.';

  const textoFinal =
    'Na Prosa, participe de eventos, conheça pessoas e inspire outras com sua trajetória.';

  const palavrasCompartilhe =
    textoCompartilhe.split(' ');

  const palavrasFinal =
    textoFinal.split(' ');

  const [
    palavrasCompartilheVisiveis,
    setPalavrasCompartilheVisiveis,
  ] = useState(0);

  const [
    palavrasFinalVisiveis,
    setPalavrasFinalVisiveis,
  ] = useState(0);

  // ==========================================
  // ANIMAÇÕES DAS PALAVRAS
  // ==========================================

  const animacoesCompartilhe = useRef(
    palavrasCompartilhe.map(
      () => new Animated.Value(0)
    )
  ).current;

  const animacoesFinal = useRef(
    palavrasFinal.map(
      () => new Animated.Value(0)
    )
  ).current;

  // ==========================================
  // ANIMAÇÃO PRINCIPAL
  // ==========================================

  useEffect(() => {

    // ==========================================
    // 1. TÍTULO INICIAL
    // ==========================================

    Animated.timing(inicialTituloAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {

      // ==========================================
      // 2. PRIMEIRO TEXTO
      // PALAVRA POR PALAVRA
      // ==========================================

      palavrasCompartilhe.forEach(
        (_, index) => {

          setTimeout(() => {

            setPalavrasCompartilheVisiveis(
              index + 1
            );

            Animated.timing(
              animacoesCompartilhe[index],
              {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
              }
            ).start();

          }, index * 180);

        }
      );

      const tempoTextoCompartilhe =
        palavrasCompartilhe.length * 180 +
        800;

      // ==========================================
      // 3. IMAGEM
      // ==========================================

      setTimeout(() => {

        Animated.timing(imagemAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start(() => {

          // ==========================================
          // PEQUENA PAUSA
          // ==========================================

          setTimeout(() => {

            // ==========================================
            // 4. TÍTULO FINAL
            // ==========================================

            Animated.timing(
              finalTituloAnim,
              {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
              }
            ).start(() => {

              // ==========================================
              // 5. SEGUNDO TEXTO
              // PALAVRA POR PALAVRA
              // ==========================================

              palavrasFinal.forEach(
                (_, index) => {

                  setTimeout(() => {

                    setPalavrasFinalVisiveis(
                      index + 1
                    );

                    Animated.timing(
                      animacoesFinal[index],
                      {
                        toValue: 1,
                        duration: 800,
                        useNativeDriver: true,
                      }
                    ).start();

                  }, index * 180);

                }
              );

              const tempoTextoFinal =
                palavrasFinal.length * 180 +
                800;

              // ==========================================
              // 6. TEXTO "CLIQUE EM SIM"
              // ==========================================

              setTimeout(() => {

                Animated.timing(
                  textoSimAnim,
                  {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                  }
                ).start(() => {

                  // ==========================================
                  // 7. BOTÃO
                  // ==========================================

                  setTimeout(() => {

                    Animated.timing(
                      botaoAnim,
                      {
                        toValue: 1,
                        duration: 800,
                        useNativeDriver: true,
                      }
                    ).start();

                  }, 300);

                });

              }, tempoTextoFinal);

            });

          }, 300);

        });

      }, tempoTextoCompartilhe);

    });

  }, []);

  // ==========================================
  // ANIMAÇÃO PADRÃO
  // ==========================================

  const animacaoEntrada = (
    animacao: Animated.Value
  ) => ({
    opacity: animacao,

    transform: [
      {
        translateY: animacao.interpolate({
          inputRange: [0, 1],
          outputRange: [8, 0],
        }),
      },
    ],
  });

  // ==========================================
  // FINALIZAR ONBOARDING
  // ==========================================

  const finalizarOnboarding = () => {

    // A terceira bolinha já está ativa.
    // Apenas fazemos a navegação.

    router.push('/acesso/login');

  };

  // ==========================================
  // TELA
  // ==========================================

  return (
    <View style={styles.container}>

      <StatusBar
        backgroundColor="#55793F"
        barStyle="light-content"
      />

      {/* ==========================================
          FAIXA SUPERIOR
      ========================================== */}

      <View style={styles.faixaSuperior} />

      {/* ==========================================
          CONTEÚDO
      ========================================== */}

      <View style={styles.conteudo}>

        {/* ==========================================
            PRIMEIRO BLOCO
        ========================================== */}

        <Animated.View
          style={[
            styles.blocoInicial,
            animacaoEntrada(
              inicialTituloAnim
            ),
          ]}
        >

          <Text style={styles.tituloVerde}>
            Como isso irá funcionar?
          </Text>

          {/* PRIMEIRO TEXTO ANIMADO */}

          <View style={styles.textoAnimado}>

            {palavrasCompartilhe.map(
              (palavra, index) => {

                if (
                  index >=
                  palavrasCompartilheVisiveis
                ) {
                  return null;
                }

                return (
                  <Animated.Text
                    key={index}
                    style={[
                      styles.palavraCompartilhe,
                      animacaoEntrada(
                        animacoesCompartilhe[index]
                      ),
                    ]}
                  >
                    {palavra}{' '}
                  </Animated.Text>
                );

              }
            )}

          </View>

        </Animated.View>

        {/* ==========================================
            IMAGEM
        ========================================== */}

        <Animated.View
          style={[
            styles.animacaoImagem,
            animacaoEntrada(imagemAnim),
          ]}
        >

          <Image
            source={require(
               '../../../assets/images/img_onboarding3.png'
            )}
            style={styles.imagem}
          />

        </Animated.View>

        {/* ==========================================
            BLOCO FINAL
        ========================================== */}

        <View style={styles.blocoFinal}>

          {/* TÍTULO */}

          <Animated.View
            style={animacaoEntrada(
              finalTituloAnim
            )}
          >

            <Text style={styles.tituloVerde}>
              Muito além das conversas!
            </Text>

          </Animated.View>

          {/* SEGUNDO TEXTO ANIMADO */}

          <View style={styles.textoAnimado}>

            {palavrasFinal.map(
              (palavra, index) => {

                if (
                  index >=
                  palavrasFinalVisiveis
                ) {
                  return null;
                }

                return (
                  <Animated.Text
                    key={index}
                    style={[
                      styles.palavraFinal,
                      animacaoEntrada(
                        animacoesFinal[index]
                      ),
                    ]}
                  >
                    {palavra}{' '}
                  </Animated.Text>
                );

              }
            )}

          </View>

          {/* TEXTO SIM */}

          <Animated.View
            style={animacaoEntrada(
              textoSimAnim
            )}
          >

            <Text style={styles.textoSim}>
              Clique em SIM para começar!
            </Text>

          </Animated.View>

        </View>

        {/* ==========================================
            ÁREA FINAL
        ========================================== */}

        <View style={styles.areaFinal}>

          {/* ==========================================
              BOTÃO
          ========================================== */}

          <Animated.View
            style={animacaoEntrada(
              botaoAnim
            )}
          >

            <Pressable
              style={({ pressed }) => [
                styles.botao,
                pressed &&
                  styles.botaoPressionado,
              ]}
              onPress={finalizarOnboarding}
            >

              <Text style={styles.textoBotao}>
                Sim
              </Text>

            </Pressable>

          </Animated.View>

          {/* ==========================================
              INDICADORES
              TERCEIRA BOLINHA ATIVA
              DESDE O INÍCIO
          ========================================== */}

          <View style={styles.indicadores}>

            {/* PRIMEIRA - VAZIA */}

            <View
              style={styles.bolinhaVazia}
            />

            {/* SEGUNDA - VAZIA */}

            <View
              style={styles.bolinhaVazia}
            />

            {/* TERCEIRA - ATIVA */}

            <View style={styles.areaBolinha}>

              <View
                style={styles.bolinhaAtiva}
              />

            </View>

          </View>

        </View>

      </View>

      {/* ==========================================
          FAIXA INFERIOR
      ========================================== */}

      <View style={styles.faixaInferior} />

    </View>
  );
}

// ==========================================
// ESTILOS
// ==========================================

const styles = StyleSheet.create({

  // ==========================================
  // FUNDO
  // ==========================================

  container: {
    flex: 1,

    backgroundColor: '#55793F',
  },

  faixaSuperior: {
    height: 35,

    backgroundColor: '#55793F',
  },

  faixaInferior: {
    height: 75,

    backgroundColor: '#55793F',
  },

  // ==========================================
  // CONTEÚDO
  // ==========================================

  conteudo: {
    flex: 1,

    backgroundColor: '#FAF5E9',

    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 30,

    alignItems: 'center',
  },

  // ==========================================
  // PRIMEIRO BLOCO
  // ==========================================

  blocoInicial: {
    width: '100%',
  },

  // ==========================================
  // TÍTULOS
  // ==========================================

  tituloVerde: {
    fontSize: 25,

    color: '#A3B16E',

    fontWeight: '800',

    marginBottom: 5,
  },

  // ==========================================
  // TEXTO ANIMADO
  // ==========================================

  textoAnimado: {
    width: '100%',

    flexDirection: 'row',

    flexWrap: 'wrap',

    alignItems: 'flex-start',
  },

  palavraCompartilhe: {
    fontSize: 22,

    color: '#636161',

    lineHeight: 25,
  },

  palavraFinal: {
    fontSize: 20,

    color: '#636161',

    lineHeight: 25,
  },

  // ==========================================
  // IMAGEM
  // ==========================================

  animacaoImagem: {
    alignSelf: 'center',
  },

  imagem: {
    width: 245,

    height: 150,

    resizeMode: 'contain',

    alignSelf: 'center',

    marginTop: 15,

    marginBottom: 8,
  },

  // ==========================================
  // BLOCO FINAL
  // ==========================================

  blocoFinal: {
    width: '100%',

    marginTop: 20,
  },

  // ==========================================
  // TEXTO SIM
  // ==========================================

  textoSim: {
    width: '100%',

    fontSize: 20,

    color: '#636161',

    lineHeight: 25,

    textAlign: 'left',

    marginTop: 25,
  },

  // ==========================================
  // ÁREA FINAL
  // ==========================================

  areaFinal: {
    width: '100%',

    alignItems: 'center',

    marginTop: 'auto',

    marginBottom: 30,
  },

  // ==========================================
  // BOTÃO
  // ==========================================

  botao: {
    width: 200,

    height: 95,

    backgroundColor: '#FAF5E9',

    borderRadius: 30,

    borderWidth: 3,

    borderColor: '#BEBBB4',

    justifyContent: 'center',

    alignItems: 'center',

    marginBottom: 35,
  },

  botaoPressionado: {
    transform: [
      {
        scale: 0.97,
      },
    ],

    backgroundColor: '#E8E2D5',
  },

  textoBotao: {
    color: '#636161',

    fontSize: 30,

    fontWeight: '800',
  },

  // ==========================================
  // INDICADORES
  // ==========================================

  indicadores: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    gap: 10,

    height: 15,
  },

  // ==========================================
  // ÁREA DA BOLINHA
  // ==========================================

  areaBolinha: {
    width: 15,

    height: 15,

    justifyContent: 'center',

    alignItems: 'center',
  },

  // ==========================================
  // BOLINHA ATIVA
  // ==========================================

  bolinhaAtiva: {
    width: 15,

    height: 15,

    borderRadius: 9,

    borderWidth: 3,

    borderColor: '#55793F',

    backgroundColor: '#55793F',
  },

  // ==========================================
  // BOLINHA VAZIA
  // ==========================================

  bolinhaVazia: {
    width: 15,

    height: 15,

    borderRadius: 9,

    borderWidth: 3,

    borderColor: '#55793F',

    backgroundColor: 'transparent',
  },

});
