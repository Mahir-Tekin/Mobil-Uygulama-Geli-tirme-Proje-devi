import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { app } from '../firebaseConfig';
import ShowAdminHotels from '../components/ShowAdminHotels';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

function AdminScreen({ navigation }) {
  const [hotels, setHotels] = useState([]);
  const db = getFirestore(app);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    const querySnapshot = await getDocs(collection(db, 'Hotels'));
    const hotelsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setHotels(hotelsData);
  };

  const handleDelete = async (hotelId) => {
    try {
      await deleteDoc(doc(db, 'Hotels', hotelId));
      Alert.alert('Başarıyla Silindi', 'Otel veritabanından silindi.');
      fetchHotels();
    } catch (error) {
      Alert.alert('Silinemedi', 'Bir hata oluştu: ' + error.message);
    }
  };

  const handleEdit = (hotelId) => {
    navigation.navigate('EditHotelScreen', { hotelId: hotelId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Rezervasyon.Com</Text>
      </View>
      <FlatList
        data={hotels}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ShowAdminHotels
            hotel={item}
            onDelete={() => handleDelete(item.id)}
            onEdit={() => handleEdit(item.id)}
          />
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddHotelScreen')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#694fad', 
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
      marginTop:10,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    paddingBottom: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#694fad',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, 
    shadowColor: '#694fad', 
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { height: 2, width: 0 },
  },
  addButtonText: {
    color: 'white',
    fontSize: 30,
  },
});

export default AdminScreen;
