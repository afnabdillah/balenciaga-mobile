import { View, FlatList, ActivityIndicator, Text } from "react-native";
import React from "react";
import { useQuery } from "@apollo/client";
import BrowseProductCard from "../components/BrowseProductCard";
import FilterHeader from "../components/FilterHeader";
import { SEARCH_PRODUCTS } from "../queries/productsQueries";

const BrowseProducts = ({ route, navigation }) => {
  const { search } = route.params.data;

  const { loading, error, data } = useQuery(SEARCH_PRODUCTS, {
    variables: { search },
  });

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f8eeea" }}>
        <ActivityIndicator size={"large"} color="black" />
      </View>
    );
  }

  if (error) {
    console.log(error, "<<< ini error");
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f8eeea" }}>
        <Text style={{ color: "red" }}>Oops, something went wrong</Text>
      </View>
    );
  }

  if (data.searchProducts.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f8eeea" }}>
        <Text>There are no products containing "{search}"</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ListHeaderComponent={
          <FilterHeader count={data.searchProducts.length} />
        }
        data={data.searchProducts}
        numColumns={2}
        renderItem={({ item }) => {
          return <BrowseProductCard navigation={navigation} product={item} />;
        }}
      />
    </View>
  );
};

export default BrowseProducts;
