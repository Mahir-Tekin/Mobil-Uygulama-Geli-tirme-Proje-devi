import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../firebaseConfig';


const AddRoomScreen = ({ route }) => {
    const { hotelId } = route.params; 
    const [roomPhoto, setRoomPhoto] = useState('');
    const [roomDescription, setRoomDescription] = useState('');
    const [roomPrice, setRoomPrice] = useState('');
  
    const db = getFirestore(app);
  
    const handleAddRoom = async () => {
      if (!roomPhoto || !roomDescription || !roomPrice) {
        Alert.alert('Hata', 'Tüm alanlar doldurulmalıdır.');
        return;
      }
  
      try {
        await addDoc(collection(db, 'rooms'), {
          hotelId, 
          photo: roomPhoto,
          description: roomDescription,
          price: parseFloat(roomPrice) 
        });
        Alert.alert('Başarı', 'Oda başarıyla eklendi.');
      } catch (error) {
        Alert.alert('Hata', `Oda eklenirken bir hata oluştu: ${error.message}`);
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Oda Ekleme Ekranı</Text>
        <TextInput
          style={styles.input}
          placeholder="Oda Fotoğrafı URL"
          value={roomPhoto}
          onChangeText={setRoomPhoto}
        />
        <TextInput
          style={styles.input}
          placeholder="Oda Açıklaması"
          value={roomDescription}
          onChangeText={setRoomDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Oda Fiyatı"
          value={roomPrice}
          onChangeText={setRoomPrice}
          keyboardType="numeric"
        />
        <Button title="Oda Ekle" onPress={handleAddRoom} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      width: '100%',
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 10,
      marginBottom: 20,
      borderRadius: 5,
    },
  });
  
  export default AddRoomScreen;
  