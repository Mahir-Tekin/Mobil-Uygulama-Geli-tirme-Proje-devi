import React from 'react';
import { View, FlatList,StyleSheet,Text } from 'react-native';
import ShowHotel from '../components/ShowHotel';

function HomeScreen() {
  const hotels = [
    // Bu dizi otel verilerinizi içermelidir. Örnek:
    { id: '1', title: 'Otel 1', imageUrl: 'https://example.com/otel1.jpg', rating: 4.5 },
    { id: '2', title: 'Otel 1', imageUrl: 'https://example.com/otel1.jpg', rating: 4.5 },
    { id: '3', title: 'Otel 1', imageUrl: 'https://example.com/otel1.jpg', rating: 4.5 },
    { id: '4', title: 'Otel 1', imageUrl: 'https://example.com/otel1.jpg', rating: 4.5 },
    // Daha fazla otel bilgisi...
  ];

  return (
    <View>
        <View style={styles.header}>
        <Text style={styles.headerText}>Rezervasyon.Com</Text>
        </View>
      <FlatList
        data={hotels}
        renderItem={({ item }) => <ShowHotel hotel={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    header: {
      backgroundColor: '#694fad', // Mor arka plan rengi
      padding: 20,
      alignItems: 'center',
    },
    headerText: {
        marginTop:10,
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
      // fontFamily: 'YourFontName', // Eğer özel bir font kullanacaksanız
    },
  });

export default HomeScreen;