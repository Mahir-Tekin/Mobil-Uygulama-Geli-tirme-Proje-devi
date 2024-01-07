import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { app } from '../firebaseConfig';
import ShowHotel from '../components/ShowHotel';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

function HomeScreen({ navigation }) {
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Rezervasyon.Com</Text>
      </View>
      <FlatList
        data={hotels}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ShowHotel
            hotel={item}
          />
        )}
      />
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
});

export default HomeScreen;
