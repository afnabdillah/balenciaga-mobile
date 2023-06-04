import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { Rating } from "react-native-ratings";

const BrowseProductCard = ({ product, navigation }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.item}
      onPress={() => navigation.navigate("ProductPage", { id: product.id })}
    >
      <Image
        style={styles.image}
        source={{
          uri: product.mainImg,
        }}
      />
      <View style={styles.iconContainer}>
        <Icon
          name="heart-plus-outline"
          type="material-community"
          color="#000"
        />
      </View>
      <View style={{ padding: 16 }}>
        <View style={{ marginBottom: 6, flexDirection: "row" }}>
          <View
            style={{
              width: 12,
              aspectRatio: 1,
              marginRight: 6,
              backgroundColor: "blue",
            }}
          />
          <View
            style={{
              width: 12,
              aspectRatio: 1,
              marginRight: 6,
              backgroundColor: "gray",
            }}
          />
          <View
            style={{
              width: 12,
              aspectRatio: 1,
              marginRight: 6,
              backgroundColor: "black",
            }}
          />
          <View
            style={{
              width: 12,
              aspectRatio: 1,
              marginRight: 6,
              backgroundColor: "cyan",
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <Text style={{ color: "gray", fontSize: 10 }}>
            {product.category.name}
          </Text>
          <Text style={{ color: "gray", fontSize: 10 }}>XS-L</Text>
        </View>
        <Text style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>
          {product.name}
        </Text>
        <Text style={{ fontWeight: 800, fontSize: 16, marginBottom: 6 }}>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumSignificantDigits: 1,
          }).format(product.price * 1450)}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Rating
            type="star"
            fractions={1}
            readonly
            tintColor="#f8eeea"
            imageSize={15}
            startingValue={4.2}
            style={{ marginRight: 4 }}
          />
          <Text style={{ fontSize: 12 }}>(12)</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    width: "50%",
    height: 350,
    backgroundColor: "#f8eeea",
    borderWidth: 0.5,
    borderColor: "gray",
    position: "relative",
  },
  iconContainer: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderBottomWidth: 0.5,
    borderColor: "gray",
  },
});

export default BrowseProductCard;
