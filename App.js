import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
  const [text, setText] = useState('')
  const [totalText, setTotalText]= useState('')
  const [notes, setNotes] = useState([])

  function addNotePressed(){
    // setTotalText(totalText + text + "\n")
    setText("")
    setNotes([...notes, {key:notes.length, name:text}])
  }

  const saveNotes = async () => {
    try {
      const jsonValue = JSON.stringify(notes)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) { }
  }
  
  const loadNotes = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      if(jsonValue != null){
        const arr =  JSON.parse(jsonValue);
        if(arr!=null){
          setNotes(arr)
        }
      }
    } catch(e) {}
  }

  return (
    <View style={styles.container}>
      <Text>{"< Notes >"}  </Text>
      <TextInput style={styles.textInput} value={text} onChangeText={setText} />
      <Button title="Add Note" onPress={addNotePressed}/>
      <Text>{totalText}</Text>
      <FlatList 
        data={notes}
        renderItem={(note) => <Text>{note.item.name}</Text>}
      />
      <Button title="Save Notes" onPress={saveNotes}/>
      <Button title="Load Notes" onPress={loadNotes}/>
      <StatusBar style="auto" />
    </View>
  );x
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput:{
    backgroundColor:'lightblue',
    minWidth: 200
  }
});
