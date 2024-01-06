import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import {app} from '../firebaseConfig';

function ShowAdminHotels({ hotel, onDelete, onEdit }) {
  const navigation = useNavigation();
  const renderStars = (rate) => {
    let stars = '';
    for (let i = 0; i < rate; i++) {
      stars += '★';
    }
    return stars;
  };

  const handleDelete = async () => {
    // Kullanıcıdan onay alma
    Alert.alert('Sil', 'Otel silinsin mi?', [
      { text: 'İptal', style: 'cancel' },
      {
        text: 'Sil',
        onPress: async () => {
          try {
            const db = getFirestore(app);
            await deleteDoc(doc(db, 'Hotels', hotel.id));
            onDelete();
          } catch (error) {
            Alert.alert('Hata', 'Silinirken hata oluştu: ' + error.message);
          }
        },
      },
    ]);
  };


  const handleEdit = () => {
    onEdit(hotel.id);
  };

  return (
    <TouchableOpacity style={styles.card}
    onPress={() => navigation.navigate('RoomsScreen', { hotelId: hotel.id })}
    >
      <Image source={{ uri: hotel.photo }} style={styles.image} />
      <View style={styles.infoContainer}>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{hotel.name}</Text>
          <Text style={styles.place}>{hotel.place}</Text>
          <Text style={styles.rating}>{renderStars(hotel.rate)}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleEdit}>
            <Text style={styles.buttonText}>Düzenle</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleDelete}>
            <Text style={styles.buttonText}>Sil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 5,
    marginHorizontal: 10,
    elevation: 3,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    width: '95%',
  },
  image: {
    width: '100%',
    height: 200,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  detailsContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  button: {
    marginLeft: 10,
    backgroundColor: '#694fad',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  place: {
    fontSize: 16,
  },
  rating: {
    fontSize: 16,
    color: '#694fad',
  },
});

export default ShowAdminHotels;
