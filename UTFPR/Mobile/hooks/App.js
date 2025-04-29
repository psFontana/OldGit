import { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const [contador, setContador] = useState(0)

  useEffect(() => {
    //efeito
    alert("Contador atualizado!!!!!")
  }, [contador]);
  useEffect(() => {
    //efeito
    alert("Inicializando Sistema...")
  }, []);

  const textContador = useRef(null)
  const inputRef = useRef(null)
  const inputRef2 = useRef(null)

  return (
    < View style={styles.container} >
      <Text ref={textContador} style={{ fontSize: 40, color: 'Blue' }}>{contador}</Text>

      <TextInput style={styles.input}
        ref={inputRef}
        placeholder='Preencha o valor inicial!'
      />
      <TextInput style={styles.input}
        ref={inputRef2}
        placeholder='Preencha o valor inicial!'
      />
      <Button title="+" onPress={() => setContador(contador + 1)} />
      <Button title="-" onPress={() => setContador(contador - 1)} />
      <Button title='Alterar Foco' onPress={() => inputRef2.current.focus()} />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    borderColor: "black",
  }
});