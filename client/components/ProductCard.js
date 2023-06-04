import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <View style={styles.container}>
      <Image
        style={{ width: "100%", height: "100%" }}
        source={{ uri: product.mainImg }}
      />
      <View style={styles.productPromoContainer}>
        <Text style={styles.productMainSpec}>
          {product.specifications.split(".")[0]}
        </Text>
        <Text style={styles.productName}>{product.name}</Text>
        <View style={styles.productPriceContainer}>
          <Text style={styles.productPricePromo}>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumSignificantDigits: 1,
            }).format(product.price * 1450)}
          </Text>
          <Text style={styles.productRegularPrice}>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumSignificantDigits: 1,
            }).format(product.price * 1450 * 1.25)}
          </Text>
        </View>
        <Text style={styles.limitedOffer}>
          Limited Offers 14th - 20th April 2023
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 655,
    position: "relative",
  },
  productPromoContainer: {
    position: "absolute",
    left: 16,
    bottom: "8%",
  },
  productMainSpec: {
    color: "#dee2de",
    fontSize: 28,
    fontWeight: "600",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  productName: {
    color: "#dee2de",
    marginVertical: 6,
    fontSize: 24,
    fontWeight: "normal",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  productPriceContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  productPricePromo: {
    color: "red",
    fontSize: 40,
    fontWeight: "600",
    textDecorationLine: "none",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  productRegularPrice: {
    textDecorationLine: "line-through",
    color: "#dee2de",
    fontSize: 24,
    fontWeight: "600",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  limitedOffer: {
    fontSize: 12,
    color: "red",
    textShadowColor: "#000",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 2,
  },
});

export default ProductCard;
