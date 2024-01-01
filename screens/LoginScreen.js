import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebaseConfig';

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth(app);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        Alert.alert('Başarılı', 'Giriş yapıldı!');
        navigation.navigate('Main');
      })
      .catch((error) => {
        Alert.alert('Hata', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giriş Yap</Text>
      <TextInput
        style={styles.input}
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>
      <Text style={styles.signupPrompt}>Bir hesabınız yok mu?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signupButton}>Hesap Oluştur</Text>
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
    fontSize: 28,
    marginBottom: 30,
    color: '#333', // Başlık rengi
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd', // Giriş alanı çerçevesi rengi
    backgroundColor: '#fff', // Giriş alanı arka plan rengi
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
  },
  button: {
    width: '100%',
    backgroundColor: '#007bff', // Buton arka plan rengi
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff', // Buton yazı rengi
    fontSize: 16,
  },
  signupPrompt: {
    color: '#666', // Kayıt teklif yazı rengi
    marginBottom: 5,
  },
  signupButton: {
    color: '#007bff', // Kayıt butonu rengi
    fontSize: 16,
  },
});

export default LoginScreen;
