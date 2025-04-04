import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import RegisterScreen, { RegistraProtocolo } from "./components/registraProtocolo";
import { ListaProtocolos } from "./components/listaProtocolos";
import { Inicio } from "./components/inicio";

const Tab = createBottomTabNavigator();

// Tela Segura (com abas)
function TelaSegura({ onLogout }) {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Registrar") iconName = "document-text-outline";
            else if(route.name === "Inicio") iconName = "home-outline"
            else if (route.name === "Protocolos") iconName = "list-outline";
            else if (route.name === "Sair") iconName = "log-out";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
        })}
      > 
        <Tab.Screen name="Inicio" component={Inicio} />
        <Tab.Screen name="Registrar" component={RegistraProtocolo} />
        <Tab.Screen name="Protocolos" component={ListaProtocolos} />
        <Tab.Screen name="Sair">
          {() => <LogoutScreen onLogout={onLogout} />}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
}


function LogoutScreen({ onLogout }) {
  return (
    <View style={styles.screen}>
      <Text>Tem certeza que deseja sair?</Text>
      <TouchableOpacity style={styles.button} onPress={onLogout}>
        <Text style={{ color: "white" }}>Sim</Text>
      </TouchableOpacity>
    </View>
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

  const autenticar = async () => {
    const authentication = await LocalAuthentication.authenticateAsync();
    if (authentication.success) {
      setRender(true);
    }
  };

  return (
    <NavigationContainer>
      {render ? (
        <TelaSegura onLogout={() => setRender(false)} />
      ) : (
        <View style={styles.container}>
          <Text>
            {biometria ? "Faça o login com biometria" : "Dispositivo não compatível com biometria"}
          </Text>
          <TouchableOpacity onPress={autenticar}>
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
