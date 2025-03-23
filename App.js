import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Camera from "./components/camera";
import Galeria from "./components/galeria";


const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View style={styles.screen}>
      <Text>🏠 Tela Inicial</Text>
    </View>
  );
}


function TelaSegura({ onLogout }) {
  const [access, setAccess] = useState(false);
  

  useEffect(() => {
    (async () => {
      const authentication = await LocalAuthentication.authenticateAsync();
      setAccess(authentication.success);
    })();
  }, []);

  const signOut = () => {
    onLogout();
    setAccess(false);
    
  };

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Inicio") iconName = "home";           
            else if (route.name === "Galeria") iconName = "images";
            else if (route.name === "Câmera") iconName = "camera";
            else if (route.name === "Sair") iconName = "log-out";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Inicio" component={HomeScreen} />
        <Tab.Screen name="Câmera" component={Camera} />
        <Tab.Screen name="Galeria" component={Galeria} />
        <Tab.Screen name="Sair" component={signOut} />
      </Tab.Navigator>
    </View>
  );
}


function Button({ labelButton, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={{ color: "white" }}>{labelButton}</Text>
    </TouchableOpacity>
  );
}

export default function App() {
  const [biometria, setBiometria] = useState(false);
  const [render, setRender] = useState(false);
  

  useEffect(() => {
    (async () => {
      const compativel = await LocalAuthentication.hasHardwareAsync();
      setBiometria(compativel);
    })();
  }, []);

  return (
    <NavigationContainer>
      {render ? (
        <TelaSegura onLogout={() => setRender(false)} />
      ) : (
        <View style={styles.container}>
          <Text>
            {biometria ? "Faça o login com biometria" : "Dispositivo não compatível com biometria"}
          </Text>
          <TouchableOpacity onPress={() => setRender(true)}>
            <Image source={require("./assets/digital.png")} style={styles.img} />
          </TouchableOpacity>
          <StatusBar style="auto" />
        </View>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 100,
    height: 100,
  },
  button: {
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
    marginTop: 10,
  },
});
