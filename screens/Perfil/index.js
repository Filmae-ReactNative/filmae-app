import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from './style';

const EditarPerfil = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profilePic}>
          <Image source={require('../../assets/usuario.png')} style={styles.profilePic} />
        </View>
        <Text style={styles.username}>Usuário</Text>
      </View>
      <Text style={styles.editTitle}>Editar Perfil</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha</Text>
        <TextInput style={styles.input} secureTextEntry />
      </View>
      <TouchableOpacity>
        <Text style={styles.deleteAccount}>Deletar minha conta</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditarPerfil;
