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

export default function Onboarding2() {
  const router = useRouter();

  // ==========================================
  // ANIMAÇÕES
  // ==========================================

  const propositoTituloAnim = useRef(
    new Animated.Value(0)
  ).current;

  const imagemAnim = useRef(
    new Animated.Value(0)
  ).current;

  const acreditamosTituloAnim = useRef(
    new Animated.Value(0)
  ).current;

  const botaoAnim = useRef(
    new Animated.Value(0)
  ).current;

  // ==========================================
  // ANIMAÇÃO DAS BOLINHAS
  // ==========================================

  // A segunda começa preenchida
  const bolinhaSegundaAnim = useRef(
    new Animated.Value(1)
  ).current;

  // A terceira começa vazia
  const bolinhaTerceiraAnim = useRef(
    new Animated.Value(0)
  ).current;

  // ==========================================
  // TEXTOS
  // ==========================================

  const textoProposito =
    'Queremos unir, promover e auxiliar novos laços e conexões.';

  const textoAcreditamos =
    'Boas relações começam com respeito, acolhimento e interesse em conhecer o outro. Oferecemos essa oportunidade a você.';

  const palavrasProposito =
    textoProposito.split(' ');

  const palavrasAcreditamos =
    textoAcreditamos.split(' ');

  const [
    palavrasPropositoVisiveis,
    setPalavrasPropositoVisiveis,
  ] = useState(0);

  const [
    palavrasAcreditamosVisiveis,
    setPalavrasAcreditamosVisiveis,
  ] = useState(0);

  // ==========================================
  // ANIMAÇÕES DAS PALAVRAS
  // ==========================================

  const animacoesProposito = useRef(
    palavrasProposito.map(
      () => new Animated.Value(0)
    )
  ).current;

  const animacoesAcreditamos = useRef(
    palavrasAcreditamos.map(
      () => new Animated.Value(0)
    )
  ).current;

  // ==========================================
  // ANIMAÇÃO PRINCIPAL
  // ==========================================

  useEffect(() => {

    Animated.timing(propositoTituloAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {

      // ==========================================
      // TEXTO DO PROPÓSITO
      // ==========================================

      palavrasProposito.forEach((_, index) => {

        setTimeout(() => {

          setPalavrasPropositoVisiveis(
            index + 1
          );

          Animated.timing(
            animacoesProposito[index],
            {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            }
          ).start();

        }, index * 180);

      });

      const tempoTextoProposito =
        palavrasProposito.length * 180 + 800;

      // ==========================================
      // IMAGEM
      // ==========================================

      setTimeout(() => {

        Animated.timing(imagemAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start(() => {

          setTimeout(() => {

            // ==========================================
            // TÍTULO ACREDITAMOS
            // ==========================================

            Animated.timing(
              acreditamosTituloAnim,
              {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
              }
            ).start(() => {

              // ==========================================
              // TEXTO ACREDITAMOS
              // ==========================================

              palavrasAcreditamos.forEach(
                (_, index) => {

                  setTimeout(() => {

                    setPalavrasAcreditamosVisiveis(
                      index + 1
                    );

                    Animated.timing(
                      animacoesAcreditamos[index],
                      {
                        toValue: 1,
                        duration: 800,
                        useNativeDriver: true,
                      }
                    ).start();

                  }, index * 180);

                }
              );

              const tempoTextoAcreditamos =
                palavrasAcreditamos.length * 180 +
                800;

              // ==========================================
              // BOTÃO
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

              }, tempoTextoAcreditamos);

            });

          }, 300);

        });

      }, tempoTextoProposito);

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
  // IR PARA O ONBOARDING 3
  // ==========================================

  const continuar = () => {

    // ==========================================
    // PRIMEIRO:
    // ESVAZIA A SEGUNDA BOLINHA
    // ==========================================

    Animated.timing(
      bolinhaSegundaAnim,
      {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }
    ).start(() => {

      // ==========================================
      // DEPOIS:
      // PREENCHE A TERCEIRA
      // ==========================================

      Animated.timing(
        bolinhaTerceiraAnim,
        {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }
      ).start(() => {

        // ==========================================
        // SÓ DEPOIS NAVEGA
        // ==========================================

        router.push('/onboarding/index3');

      });

    });

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
            PROPÓSITO
        ========================================== */}

        <Animated.View
          style={[
            styles.blocoProposito,
            animacaoEntrada(
              propositoTituloAnim
            ),
          ]}
        >

          <Text style={styles.tituloVerde}>
            Nosso propósito:
          </Text>

          <View style={styles.textoAnimado}>

            {palavrasProposito.map(
              (palavra, index) => {

                if (
                  index >=
                  palavrasPropositoVisiveis
                ) {
                  return null;
                }

                return (
                  <Animated.Text
                    key={index}
                    style={[
                      styles.palavra,
                      animacaoEntrada(
                        animacoesProposito[index]
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
              '../../../assets/images/img_onboarding2.png'
            )}
            style={styles.imagem}
          />

        </Animated.View>

        {/* ==========================================
            ACREDITAMOS
        ========================================== */}

        <View style={styles.blocoAcreditamos}>

          <Animated.View
            style={animacaoEntrada(
              acreditamosTituloAnim
            )}
          >

            <Text style={styles.tituloVerde}>
              O que acreditamos:
            </Text>

          </Animated.View>

          <View style={styles.textoAnimado}>

            {palavrasAcreditamos.map(
              (palavra, index) => {

                if (
                  index >=
                  palavrasAcreditamosVisiveis
                ) {
                  return null;
                }

                return (
                  <Animated.Text
                    key={index}
                    style={[
                      styles.palavra,
                      animacaoEntrada(
                        animacoesAcreditamos[index]
                      ),
                    ]}
                  >
                    {palavra}{' '}
                  </Animated.Text>
                );

              }
            )}

          </View>

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
              onPress={continuar}
            >

              <Text style={styles.textoBotao}>
                Continuar
              </Text>

            </Pressable>

          </Animated.View>

          {/* ==========================================
              INDICADORES
              SEM ANIMAÇÃO DE ENTRADA
          ========================================== */}

          <View style={styles.indicadores}>

            {/* ======================================
                PRIMEIRA - VAZIA
            ====================================== */}

            <View style={styles.areaBolinha}>

              <View
                style={styles.bolinhaVazia}
              />

            </View>

            {/* ======================================
                SEGUNDA - COMEÇA ATIVA
            ====================================== */}

            <View style={styles.areaBolinha}>

              {/* Fundo vazio */}

              <View
                style={styles.bolinhaVazia}
              />

              {/* Preenchimento animado */}

              <Animated.View
                style={[
                  styles.bolinhaPreenchida,
                  {
                    opacity:
                      bolinhaSegundaAnim,
                  },
                ]}
              />

            </View>

            {/* ======================================
                TERCEIRA - COMEÇA VAZIA
            ====================================== */}

            <View style={styles.areaBolinha}>

              {/* Fundo vazio */}

              <View
                style={styles.bolinhaVazia}
              />

              {/* Preenchimento animado */}

              <Animated.View
                style={[
                  styles.bolinhaPreenchida,
                  {
                    opacity:
                      bolinhaTerceiraAnim,
                  },
                ]}
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
  // PROPÓSITO
  // ==========================================

  blocoProposito: {
    width: '100%',
  },

  tituloVerde: {
    fontSize: 25,

    color: '#A3B16E',

    fontWeight: '800',

    marginBottom: 5,
  },

  textoAnimado: {
    width: '100%',

    flexDirection: 'row',

    flexWrap: 'wrap',

    alignItems: 'flex-start',
  },

  palavra: {
    fontSize: 22,

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
    width: 280,

    height: 210,

    resizeMode: 'contain',

    alignSelf: 'center',

    marginTop: 15,

    marginBottom: 8,
  },

  // ==========================================
  // ACREDITAMOS
  // ==========================================

  blocoAcreditamos: {
    width: '100%',

    marginTop: 15,
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
  // ÁREA INDIVIDUAL DA BOLINHA
  // ==========================================

  areaBolinha: {
    width: 15,

    height: 15,

    justifyContent: 'center',

    alignItems: 'center',
  },

  // ==========================================
  // BOLINHA VAZIA
  // ==========================================

  bolinhaVazia: {
    position: 'absolute',

    width: 15,

    height: 15,

    borderRadius: 9,

    borderWidth: 3,

    borderColor: '#55793F',

    backgroundColor: 'transparent',
  },

  // ==========================================
  // PREENCHIMENTO DA BOLINHA
  // ==========================================

  bolinhaPreenchida: {
    position: 'absolute',

    width: 15,

    height: 15,

    borderRadius: 9,

    backgroundColor: '#55793F',

    borderWidth: 3,

    borderColor: '#55793F',
  },

});
