import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import {styles} from './style';

const SearchInput = ({ value, onChangeText, onClear }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Feather name="search" size={20} color="#FFF" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Pesquisar filmes..."
          placeholderTextColor="#fff"
          value={value}
          onChangeText={onChangeText}
          selectionColor="#FFF"
          autoCapitalize="none"
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={onClear} style={styles.limparButton}>
            <Feather name="x" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SearchInput;