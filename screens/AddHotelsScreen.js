import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';


function AddHotelScreen() {
  const navigation = useNavigation();
  const [photo, setPhoto] = useState('');
  const [rate, setRate] = useState('');
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const db = getFirestore(app);

  const handleSubmit = async () => {
    if (!photo || !rate || !name || !place) {
      Alert.alert('Hata', 'Tüm alanlar doldurulmalıdır!');
      return;
    }
  
    const numericRate = parseFloat(rate);
    if (isNaN(numericRate) || numericRate < 0 || numericRate > 5) {
      Alert.alert('Hata', 'Puan 0 ile 5 arasında olmalıdır!');
      return;
    }
  
    try {
      await addDoc(collection(db, 'Hotels'), {
        photo,
        rate: numericRate,
        name,
        place,
      });
      Alert.alert('Başarılı', 'Otel başarıyla eklendi!', [
        { text: 'Tamam', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Hata', 'Otel eklenirken bir hata oluştu: ' + error.message);
    }
  };

  return (
    
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Fotoğraf URL"
        value={photo}
        onChangeText={setPhoto}
      />
      <TextInput
        style={styles.input}
        placeholder="Puan"
        value={rate}
        onChangeText={setRate}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Otel Adı"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Yer"
        value={place}
        onChangeText={setPlace}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Otel Ekle</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#694fad',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#694fad', 
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white', 
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddHotelScreen;
