
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebaseConfig'; 
import { getFirestore, doc, setDoc } from 'firebase/firestore';

function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const auth = getAuth(app);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const db = getFirestore(app);
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          name: name,
          role: 'user'
        });
  
        Alert.alert('Başarılı', 'Hesap oluşturuldu!');
        navigation.navigate('Login');
      })
      .catch((error) => {
        Alert.alert('Hata', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hesap Oluştur</Text>
      <TextInput
        style={styles.input}
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Kullanıcı Adı"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Kayıt Ol</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5', // Arka plan rengi
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#694fad', // Başlık rengi
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#694fad', // Giriş alanı çerçevesi rengi
    backgroundColor: '#fff', // Giriş alanı arka plan rengi
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
  },
  button: {
    width: '100%',
    backgroundColor: '#694fad', // Buton arka plan rengi
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff', // Buton yazı rengi
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
