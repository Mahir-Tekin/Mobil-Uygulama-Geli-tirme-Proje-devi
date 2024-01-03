import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ShowAdminRoom = ({ room }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: room.photo }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.description}>{room.description}</Text>
        <Text style={styles.price}>{`Fiyat: ${room.price}₺`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  infoContainer: {
    padding: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1abc9c',
  },
});

export default ShowAdminRoom;
