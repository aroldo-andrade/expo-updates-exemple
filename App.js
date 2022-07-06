import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Updates from "expo-updates";

export default function App() {

  const [updateState, setUpdateState] = useState()
  const [erro, setErro] = useState('')
  const [count, setCount] = useState(0)
  const timeId = useRef()

  //expo export --public-url 'https://192.168.100.106:5500'
  //expo run:android --variant release

  useEffect(() => {
    const updateApp = async () => {
        setErro('')
        const updateState = await Updates.checkForUpdateAsync();
        setUpdateState(updateState)

        if (!!updateState.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync(); // depende da sua estratégia
        }
    }

    const updateLoop = () =>{
      updateApp().catch(erro => {

        setErro(JSON.stringify(erro))

      }).finally(() =>{
        timeId.current = setTimeout(() => {
          setCount(old => ++old)
          updateLoop()
        }, 6000)

      })
    }

    updateLoop()

    return () => {
      if (timeId.current) {
        clearTimeout(timeId.current)
      }
    }

  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your teste 150</Text>
      <Text> erro: {erro}</Text>
      <Text> count: {count}</Text>
      <Text> updateState: {JSON.stringify(updateState)}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
