
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebaseConfig'; 

function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth(app);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Kayıt başarılı
        Alert.alert('Başarılı', 'Hesap oluşturuldu!');
        navigation.navigate('Login');
      })
      .catch((error) => {
        // Kayıt başarısız
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
        placeholder="Şifre"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Kayıt Ol" onPress={handleSignUp} />
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
});

export default SignUpScreen;
