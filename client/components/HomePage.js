import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import React from "react";
import ProductCard from "./ProductCard";
import { useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { GET_PRODUCTS_BY_CATEGORY } from "../queries/productsQueries";
import { useQuery } from "@apollo/client";
import Carousel from "react-native-reanimated-carousel";

const HomePage = ({ navigation }) => {
  const routeName = useRoute().name;

  const { loading, error, data } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
    variables: { categoryName: routeName },
  });

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f8eeea",
        }}
      >
        <ActivityIndicator size={"large"} color="black" />
      </View>
    );
  }

  if (error) {
    console.log(error, "<<< ini error");
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f8eeea",
        }}
      >
        <Text style={{ color: "red" }}>Oops, something went wrong</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#f8eeea" />
      <FlatList
        data={data.filterProductsByCategory}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("ProductPage", { id: item.id })}
            >
              <ProductCard product={item} />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomePage;
