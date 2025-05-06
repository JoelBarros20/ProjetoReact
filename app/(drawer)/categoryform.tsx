import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

type Category = {
  id: number;
  name: string;
};

export default function CategoryForm() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const { width } = Dimensions.get("window");
  const router = useRouter();

  const API_URL = "http://192.168.1.89:8000/api/categories";

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      Alert.alert("Erro", "Não foi possível carregar as categorias");
    }
  };

  const handleAddCategory = async () => {
    if (!name) {
      Alert.alert("Erro", "Preencha o campo da categoria!");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        setName("");
        fetchCategories();
      } else {
        const errorData = await response.json();
        Alert.alert("Erro", errorData.message || "Erro ao adicionar categoria");
      }
    } catch (error) {
      console.error("Erro ao adicionar categoria:", error);
      Alert.alert("Erro", "Erro ao conectar com a API");
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchCategories();
      } else {
        Alert.alert("Erro", "Erro ao deletar categoria");
      }
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
      Alert.alert("Erro", "Erro ao conectar com a API");
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    router.replace("/login"); // Redireciona para login
  };

  return (
    <SafeAreaView style={[styles.container, { paddingHorizontal: width * 0.05 }]}>
      <View style={styles.logoutContainer}>
        <Button title="Logout" color="#333" onPress={handleLogout} />
      </View>

      <Text style={styles.title}>Criar categoria</Text>

      <TextInput
        style={[styles.input, { width: width * 0.9 }]}
        placeholder="Nome da categoria"
        value={name}
        onChangeText={setName}
      />

      <View style={{ width: width * 0.9, marginBottom: 10 }}>
        <Button title="Guardar Categoria" onPress={handleAddCategory} />
      </View>

      <Text style={styles.listTitle}>Categorias da API:</Text>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text style={styles.userText}>{item.name}</Text>
            <Button
              title="Deletar"
              color="red"
              onPress={() => handleDeleteCategory(item.id)}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  logoutContainer: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  listTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  userItem: {
    paddingVertical: 10,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userText: {
    fontSize: 16,
  },
});
