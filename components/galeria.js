
import * as MediaLibrary from "expo-media-library";
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";


export default function Galeria() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permissão negada para acessar a galeria.");
        return;
      }

      const album = await MediaLibrary.getAssetsAsync({
        mediaType: "photo",
        first: 50, // Pega as primeiras 50 imagens
      });

      if (album.assets.length > 0) {
        setImages(album.assets);
      } else {
        alert("Nenhuma imagem encontrada.");
      }
    })();
  }, []);

  return (
    <View>      
      {images.length > 0 ? (
        <FlatList
          data={images}
          keyExtractor={(item) => item.id}
          numColumns={3}
          renderItem={({ item }) => (
            <Image source={{ uri: item.uri }} style={{ width: 100, height: 100, margin: 5 }} />
          )}
        />
      ) : (
        <Text>Nenhuma imagem encontrada.</Text>
      )}
    </View>
  );
}