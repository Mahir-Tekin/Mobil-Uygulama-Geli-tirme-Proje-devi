import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function ShowHotel({ hotel }) {
  const navigation = useNavigation();

  const renderStars = (rate) => {
    let stars = '';
    for (let i = 0; i < rate; i++) {
      stars += '★';
    }
    return stars;
  };

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('RoomsScreen', { hotelId: hotel.id })}
    >
      <Image source={{ uri: hotel.photo }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{hotel.name}</Text>
        <Text style={styles.place}>{hotel.place}</Text>
        <Text style={styles.rating}>{renderStars(hotel.rate)}</Text>
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
    padding: 5,
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

export default ShowHotel;
