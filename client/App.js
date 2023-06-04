import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ApolloProvider } from "@apollo/client";
import ProductPage from "./screens/ProductPage";
import Categories from "./screens/Categories";
import Specifications from "./screens/Specifications";
import Header from "./components/Header";
import Materials from "./screens/Materials";
import SizeChart from "./screens/SizeChart";
import BrowseProducts from "./screens/BrowseProducts";
import client from "./config/apolloClient";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="HomePage"
                component={Categories}
                options={{
                  header: ({ navigation }) => {
                    return <Header navigation={navigation} />;
                  },
                  headerStyle: {
                    height: 50,
                  },
                }}
              />
              <Stack.Screen
                name="ProductPage"
                component={ProductPage}
                options={{
                  header: ({ navigation }) => {
                    return <Header navigation={navigation} />;
                  },
                  headerStyle: {
                    height: 50,
                  },
                }}
              />
              <Stack.Screen
                name="BrowseProducts"
                component={BrowseProducts}
                options={{
                  header: ({ navigation }) => {
                    return <Header navigation={navigation} />;
                  },
                  headerStyle: {
                    height: 50,
                  },
                }}
              />
              <Stack.Screen name="SPECIFICATIONS" component={Specifications} />
              <Stack.Screen name="MATERIALS" component={Materials} />
              <Stack.Screen name="SIZE CHART" component={SizeChart} />
            </Stack.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}
