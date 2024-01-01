
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

function ShowHotel({ hotel }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: hotel.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{hotel.title}</Text>
      <Text style={styles.rating}>Puan: {hotel.rating}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    margin: 10,
    elevation: 3, // Android için gölge efekti
    shadowColor: 'black', // iOS için gölge efekti
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.3,
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
  rating: {
    fontSize: 16,
    padding: 10,
  },
});

export default ShowHotel;
