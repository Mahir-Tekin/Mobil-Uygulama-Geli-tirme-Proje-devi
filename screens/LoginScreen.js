import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebaseConfig';
import { getFirestore, doc, getDoc } from 'firebase/firestore';


function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth(app);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const db = getFirestore(app);
        const userDocRef = doc(db, 'users', userCredential.user.uid);
        const userDoc = await getDoc(userDocRef);
  
        if (userDoc.exists()) {
          const userRole = userDoc.data().role;
          
          if (userRole === 'admin') {
            navigation.navigate('Admin');
          } else {
            navigation.navigate('Main'); 
          }
        } else {
          Alert.alert('Hata', 'Kullanıcı bilgileri bulunamadı!');
        }
      })
      .catch((error) => {
        Alert.alert('Hata', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giriş Yap</Text>
      <Text style={styles.title}>admin hesap=Test123@gmail.com  şifre=1231234</Text>
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
    backgroundColor: '#f5f5f5', 
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
    color: '#694fad', 
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff', 
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
  },
  button: {
    width: '100%',
    backgroundColor: '#694fad', 
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff', 
    fontSize: 16,
  },
  signupPrompt: {
    color: '#666', 
    marginBottom: 5,
  },
  signupButton: {
    color: '#694fad', 
    fontSize: 16,
  },
});

export default LoginScreen;
