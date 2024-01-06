import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
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
        <View style={styles.header}>
        <Text style={styles.headerText}>Rezervasyon.Com</Text>
      </View>
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
        <TouchableOpacity style={styles.buttonContainer} onPress={handleAddRoom}>
        <Text style={styles.buttonText}>Oda Ekle</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    header: {
      backgroundColor: '#694fad', 
      padding: 20,
      alignItems: 'center',
    },
    headerText: {
      marginTop: 10,
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
    },
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5', 
    },
    input: {
      width: '100%',
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 10,
      marginBottom: 20,
      borderRadius: 5,
      backgroundColor: 'white', 
    },
    buttonContainer: {
      backgroundColor: '#694fad', 
      borderRadius: 5,
      padding: 10,
      marginTop: 10,
    },
    buttonText: {
      color: 'white', 
      textAlign: 'center',
      fontSize: 16,
    },
  });
  
  export default AddRoomScreen;
  