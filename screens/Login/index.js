import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  View,
} from "react-native";
import React from "react";
import { styles } from "./style";
import { useState } from "react";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");

  const handleLogin = () => {
    if (!email || !senha) {
      setMensagem("Por favor, preencha todos os campos.");
      setTipoMensagem("error");
    } else {
      setMensagem("Login realizado com sucesso!");
      setTipoMensagem("success");
      navigation.navigate("Home");
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
      <Text style={styles.title}>Login</Text>
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

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonCadastro}
        onPress={() => navigation.navigate("Cadastro")}
      >
        <Text style={styles.textoCadastro}>
          Ainda não possui uma conta? Cadastre-se
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
