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

export default function Onboarding() {
  const router = useRouter();

  // ==========================================
  // ANIMAÇÕES
  // ==========================================

  const logoAnim = useRef(
    new Animated.Value(0)
  ).current;

  const tituloAnim = useRef(
    new Animated.Value(0)
  ).current;

  const continuarAnim = useRef(
    new Animated.Value(0)
  ).current;

  const botaoAnim = useRef(
    new Animated.Value(0)
  ).current;

  // ==========================================
  // ANIMAÇÃO DAS BOLINHAS
  // ==========================================

  const bolinhaPrimeiraAnim = useRef(
    new Animated.Value(1)
  ).current;

  const bolinhaSegundaAnim = useRef(
    new Animated.Value(0)
  ).current;

  // ==========================================
  // TEXTO
  // ==========================================

  const textoCompleto =
    'A Prosa surgiu com a intenção de criar relações novas. Aqui, você encontrará experiências e oportunidades de se conectar com pessoas diferentes.';

  const palavras =
    textoCompleto.split(' ');

  const [
    palavrasVisiveis,
    setPalavrasVisiveis,
  ] = useState(0);

  // ==========================================
  // ANIMAÇÕES DAS PALAVRAS
  // ==========================================

  const animacoesPalavras = useRef(
    palavras.map(
      () => new Animated.Value(0)
    )
  ).current;

  // ==========================================
  // ANIMAÇÃO PRINCIPAL
  // ==========================================

  useEffect(() => {

    // ==========================================
    // LOGO
    // ==========================================

    Animated.timing(logoAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {

      // ==========================================
      // TÍTULO
      // ==========================================

      Animated.timing(tituloAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }).start(() => {

        // ==========================================
        // TEXTO PALAVRA POR PALAVRA
        // ==========================================

        palavras.forEach(
          (_, index) => {

            setTimeout(() => {

              setPalavrasVisiveis(
                index + 1
              );

              Animated.timing(
                animacoesPalavras[index],
                {
                  toValue: 1,
                  duration: 800,
                  useNativeDriver: true,
                }
              ).start();

            }, index * 280);

          }
        );

        const tempoTexto =
          palavras.length * 280 + 600;

        // ==========================================
        // CONTINUAR
        // ==========================================

        setTimeout(() => {

          Animated.timing(
            continuarAnim,
            {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            }
          ).start(() => {

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

            }, 300);

          });

        }, tempoTexto);

      });

    });

    // ==========================================
    // ESTADO INICIAL DAS BOLINHAS
    // ==========================================

    bolinhaPrimeiraAnim.setValue(1);
    bolinhaSegundaAnim.setValue(0);

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
        translateY:
          animacao.interpolate({
            inputRange: [0, 1],
            outputRange: [6, 0],
          }),
      },
    ],
  });

  // ==========================================
  // IR PARA O ONBOARDING 2
  // ==========================================

  const continuar = () => {

    // ==========================================
    // ESVAZIA A PRIMEIRA BOLINHA
    // ==========================================

    Animated.timing(
      bolinhaPrimeiraAnim,
      {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }
    ).start(() => {

      // ==========================================
      // PREENCHE A SEGUNDA BOLINHA
      // ==========================================

      Animated.timing(
        bolinhaSegundaAnim,
        {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }
      ).start(() => {

        // ==========================================
        // NAVEGA
        // ==========================================

        router.push('/onboarding/index2');

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
            LOGO
        ========================================== */}

        <Animated.View
          style={animacaoEntrada(
            logoAnim
          )}
        >

          <Image
            source={require(
              '../../assets/images/prosa_logo.png'
            )}
            style={styles.logo}
            resizeMode="contain"
          />

        </Animated.View>

        {/* ==========================================
            TÍTULO
        ========================================== */}

        <Animated.View
          style={[
            styles.animacaoLargura,
            animacaoEntrada(tituloAnim),
          ]}
        >

          <Text style={styles.titulo}>
            Sinta-se à vontade
          </Text>

        </Animated.View>

        {/* ==========================================
            DESCRIÇÃO
        ========================================== */}

        <View style={styles.descricao}>

          {palavras.map(
            (palavra, index) => {

              if (
                index >= palavrasVisiveis
              ) {
                return null;
              }

              const animacao =
                animacoesPalavras[index];

              return (
                <Animated.Text
                  key={index}
                  style={[
                    styles.palavra,
                    animacaoEntrada(
                      animacao
                    ),
                  ]}
                >
                  {palavra}{' '}
                </Animated.Text>
              );

            }
          )}

        </View>

        {/* ==========================================
            ÁREA FINAL
        ========================================== */}

        <View style={styles.areaFinal}>

          {/* ==========================================
              CONTINUAR
          ========================================== */}

          <Animated.View
            style={animacaoEntrada(
              continuarAnim
            )}
          >

            <Text style={styles.continuar}>
              Que tal uma apresentação,{'\n'}
              Preparado?
            </Text>

          </Animated.View>

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
                Claro
              </Text>

            </Pressable>

          </Animated.View>

          {/* ==========================================
              INDICADORES
          ========================================== */}

          <View style={styles.indicadores}>

            {/* ======================================
                PRIMEIRA - ATIVA
            ====================================== */}

            <View style={styles.areaBolinha}>

              <View
                style={styles.bolinhaVazia}
              />

              <Animated.View
                style={[
                  styles.bolinhaPreenchida,
                  {
                    opacity:
                      bolinhaPrimeiraAnim,
                  },
                ]}
              />

            </View>

            {/* ======================================
                SEGUNDA - VAZIA
            ====================================== */}

            <View style={styles.areaBolinha}>

              <View
                style={styles.bolinhaVazia}
              />

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
                TERCEIRA - VAZIA
            ====================================== */}

            <View style={styles.areaBolinha}>

              <View
                style={styles.bolinhaVazia}
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
 
  alignItems: 'center', 
 
  paddingHorizontal: 25, 
 
  paddingTop: 5, 
 
  paddingBottom: 10,

  minHeight: 0,
},

  // ==========================================
  // LOGO
  // ==========================================

  logo: { 
  marginTop: 5, 
 
  width: 260, 
 
  height: 150, 
},

  // ==========================================
  // TÍTULO
  // ==========================================

  titulo: {
    fontSize: 30,

    color: '#636161',

    textAlign: 'center',

    fontWeight: '800',

    marginBottom: 10,
  },

  animacaoLargura: {
    width: '100%',
  },

  // ==========================================
  // DESCRIÇÃO
  // ==========================================

  descricao: {
    width: '100%',

    flexDirection: 'row',

    flexWrap: 'wrap',

    alignItems: 'flex-start',
  },

  palavra: {
    fontSize: 21,

    color: '#636161',

    lineHeight: 26,
  },

  // ==========================================
  // ÁREA FINAL
  // ==========================================

  areaFinal: {
    width: '100%',

    alignItems: 'center',

    marginTop: 'auto',

    marginBottom: 20,
  },

  continuar: {
    fontSize: 23,

    color: '#A3B16E',

    textAlign: 'center',

    fontWeight: '700',

    lineHeight: 32,

    marginBottom: 25,
  },

  // ==========================================
  // BOTÃO
  // ==========================================

  botao: {
    width: 180,

    height: 80,

    backgroundColor: '#FAF5E9',

    borderRadius: 30,

    borderWidth: 3,

    borderColor: '#BEBBB4',

    justifyContent: 'center',

    alignItems: 'center',

    marginBottom: 25,
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

    fontSize: 27,

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
  // PREENCHIMENTO
  // ==========================================

  bolinhaPreenchida: {
    position: 'absolute',

    width: 15,

    height: 15,

    borderRadius: 9,

    borderWidth: 3,

    borderColor: '#55793F',

    backgroundColor: '#55793F',
  },

});