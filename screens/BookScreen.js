import React, { useState } from 'react';
import { View, Text, Button, Modal, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../firebaseConfig';

const BookScreen = ({ route }) => {
  const { roomId } = route.params;
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isSelectingStartDate, setSelectingStartDate] = useState(true);

  const db = getFirestore(app);

  const handleBooking = async () => {
    if (!startDate || !endDate) {
      Alert.alert('Hata', 'Lütfen giriş ve çıkış tarihlerini seçin.');
      return;
    }

    try {
      await addDoc(collection(db, 'books'), {
        roomId,
        startDate,
        endDate
      });
      Alert.alert('Başarılı', 'Rezervasyon yapıldı!');
    } catch (error) {
      Alert.alert('Hata', `Rezervasyon yapılırken bir hata oluştu: ${error.message}`);
    }
  };

  const toggleDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const onDateSelected = (date) => {
    if (isSelectingStartDate) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
    toggleDatePicker();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dateTouch} onPress={() => { toggleDatePicker(); setSelectingStartDate(true); }}>
        <Text style={styles.dateText}>Giriş Tarihi: {startDate || 'Tarih Seç'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.dateTouch} onPress={() => { toggleDatePicker(); setSelectingStartDate(false); }}>
        <Text style={styles.dateText}>Çıkış Tarihi: {endDate || 'Tarih Seç'}</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={isDatePickerVisible}
        onRequestClose={toggleDatePicker}
      >
        <View style={styles.modalView}>
          <DatePicker
            onSelectedChange={onDateSelected}
            current={isSelectingStartDate ? startDate : endDate}
          />
        </View>
      </Modal>

      <TouchableOpacity style={styles.button} onPress={handleBooking}>
        <Text style={styles.buttonText}>Rezervasyon Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  button: {
    backgroundColor: '#694fad',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dateTouch: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#694fad',
    marginVertical: 10,
    width: '80%',
    alignSelf: 'center',
  },
  dateText: {
    color: '#694fad',
    textAlign: 'center',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#694fad',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});

export default BookScreen;
