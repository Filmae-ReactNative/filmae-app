import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  View,
  ActivityIndicator
} from "react-native";
import React from "react";
import { styles } from "./style";
import { useState } from "react";
import { cadastrarUsuario } from "../../services/firebaseConfig";

export default function Cadastro({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");

  const handleCadastrar = async () => {
    if (!email || !senha || !nome) {
      setMensagem("Por favor, preencha todos os campos.");
      setTipoMensagem("error");
      return;
    }

    setTipoMensagem("loading");
  
    try {
      setTipoMensagem("loading"); // Exibir carregando
      const usuario = await cadastrarUsuario(email, senha, nome);
  
      setMensagem("Cadastro realizado com sucesso!");
      setTipoMensagem("success");
  
      setTimeout(() => {
        navigation.navigate("Login");
      }, 1000); 
    } catch (error) {
      setMensagem("Houve um erro ao cadastrar. Tente novamente.");
      setTipoMensagem("error");
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <Image
          source={require("../../assets/filmaeLogo.png")}
          style={styles.logo}
        />
      </View>
      <Text style={styles.title}>Cadastro</Text>

      <Text style={styles.text}></Text>

      <Text style={styles.text}>Nome</Text>
      <TextInput
        placeholder="Digite um nome..."
        style={styles.input}
        keyboardType="default"
        placeholderTextColor="#aaa"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.text}>Email</Text>
      <TextInput
        placeholder="Digite um email..."
        style={styles.input}
        keyboardType="email-address"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.text}>Senha</Text>
      <TextInput
        placeholder="Sua senha..."
        style={styles.input}
        secureTextEntry
        placeholderTextColor="#aaa"
        value={senha}
        onChangeText={setSenha}
      />

      {tipoMensagem === "loading" ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleCadastrar}>
          <Text style={styles.buttonText}>Criar Conta</Text>
        </TouchableOpacity>
      )}

      {mensagem ? (
        <Text
          style={{
            marginTop: 20,
            color: tipoMensagem === "success" ? "green" : "red",
            textAlign: "center",
            fontSize: 16,
          }}
        >
          {mensagem}
        </Text>
      ) : null}
    </SafeAreaView>
  );
}

