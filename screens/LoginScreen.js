import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebaseConfig';

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth(app);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Giriş başarılı
        Alert.alert('Başarılı', 'Giriş yapıldı!');
      })
      .catch((error) => {
        // Giriş başarısız
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
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Giriş Yap" onPress={handleLogin} />
      <Text style={styles.signupText}>Bir hesabınız yok mu?</Text>
      <Button
        title="Hesap Oluştur"
        onPress={() => navigation.navigate('SignUp')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  signupText: {
    marginTop: 20,
  },
});

export default LoginScreen;