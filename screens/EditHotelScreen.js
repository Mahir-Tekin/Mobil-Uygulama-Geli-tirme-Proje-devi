import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { app } from '../firebaseConfig';

function EditHotelScreen({ route, navigation }) {
    const [hotel, setHotel] = useState({
      photo: '',
      rate: '',
      name: '',
      place: '',
    });
    const db = getFirestore(app);
    const { hotelId } = route.params;
  
    useEffect(() => {
      const fetchHotelData = async () => {
        try {
          const hotelRef = doc(db, 'Hotels', hotelId);
          const hotelSnap = await getDoc(hotelRef);
  
          if (hotelSnap.exists()) {
            setHotel(hotelSnap.data());
          } else {
            Alert.alert('Hata', 'Otel bulunamadı.');
            navigation.goBack();
          }
        } catch (error) {
          Alert.alert('Hata', 'Bir hata oluştu: ' + error.message);
        }
      };
  
      fetchHotelData();
    }, [hotelId]);
  
    const handleUpdate = async () => {
      try {
        const hotelRef = doc(db, 'Hotels', hotelId);
        await updateDoc(hotelRef, {
          ...hotel,
          rate: parseFloat(hotel.rate), 
        });
        Alert.alert('Başarılı', 'Otel güncellendi!');
        navigation.goBack();
      } catch (error) {
        Alert.alert('Hata', 'Güncellenirken bir hata oluştu: ' + error.message);
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Fotoğraf URL</Text>
        <TextInput
          style={styles.input}
          value={hotel.photo}
          onChangeText={(text) => setHotel({ ...hotel, photo: text })}
        />
        <Text style={styles.label}>Puan</Text>
        <TextInput
          style={styles.input}
          value={String(hotel.rate)}
          onChangeText={(text) => setHotel({ ...hotel, rate: text })}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Otel Adı</Text>
        <TextInput
          style={styles.input}
          value={hotel.name}
          onChangeText={(text) => setHotel({ ...hotel, name: text })}
        />
        <Text style={styles.label}>Yer</Text>
        <TextInput
          style={styles.input}
          value={hotel.place}
          onChangeText={(text) => setHotel({ ...hotel, place: text })}
        />
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Güncelle</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    label: {
      fontSize: 18,
      marginBottom: 10,
    },
    input: {
      fontSize: 16,
      borderWidth: 1,
      borderColor: 'gray',
      marginBottom: 20,
      padding: 10,
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
  
  export default EditHotelScreen;
  