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
import { fazerLogin } from "../../services/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");

  const salvarDadosNoAsyncStorage = async (usuario) => {
    try {
      await AsyncStorage.setItem("@dadosUsuario", JSON.stringify(usuario));
      console.log("Dados salvos no AsyncStorage");
    } catch (error) {
      console.error("Erro ao salvar dados no AsyncStorage:", error);
    }
  };

  const handleLogin = async () => {
    if (!email || !senha) {
      setMensagem("Por favor, preencha todos os campos.");
      setTipoMensagem("error");
      return;
    }
  
    try {
      const usuario = await fazerLogin(email, senha);

      await salvarDadosNoAsyncStorage({
        email: usuario.email,
        displayName: usuario.displayName || "Usuário",
        uid: usuario.uid,
      });
      
      setMensagem("Login realizado com sucesso!");
      setTipoMensagem("success");
      navigation.navigate("MainApp");
    } catch (error) {
      let errorMessage = "Erro ao fazer login. Tente novamente.";
      
     if (error.code === 'auth/user-not-found') {
          errorMessage = "Usuário não encontrado.";
      }
  
      setMensagem(errorMessage);
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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
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

      {mensagem ? (
      <View style={styles.mensagemContainer}>
        <Text
          style={[
            styles.mensagem,
            { color: tipoMensagem === "success" ? "green" : "red" },
          ]}
        >
          {mensagem}
        </Text>
      </View>
    ) : null}
    
    </SafeAreaView>
  );
}
