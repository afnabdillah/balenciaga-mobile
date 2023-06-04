import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Button, Icon } from "@rneui/themed";
import Carousel from "react-native-reanimated-carousel";
import React from "react";
import { Rating } from "react-native-ratings";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_DETAILS_BY_ID } from "../queries/productsQueries";

const ProductDetails = ({ navigation, id }) => {
  const { loading, error, data } = useQuery(GET_PRODUCT_DETAILS_BY_ID, {
    variables: { id },
  });

  const [quantity, setQuantity] = useState(0);

  const [color, setColor] = useState("BLACK");

  const [size, setSize] = useState("M");

  const width = Dimensions.get("window").width;

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

  return (
    <ScrollView>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{data.findProductById.name}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
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
        <Text style={styles.overviewContainer}>
          {data.findProductById.description}
        </Text>
      </View>
      <View style={{ position: "relative" }}>
        <Carousel
          width={width}
          height={width}
          data={[
            data.findProductById.mainImg,
            ...data.findProductById.images.map((el) => el.imgUrl),
          ]}
          autoPlay={true}
          autoPlayInterval={5000}
          scrollAnimationDuration={1000}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          pagingEnabled={false}
          snapEnabled={true}
          renderItem={({ item }) => (
            <View style={[styles.imageContainer]}>
              <Image
                source={{
                  uri: item,
                }}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </View>
          )}
        />
      </View>
      <View>
        <Text style={styles.colourTextContainer}>
          <Text style={styles.textBold}>COLOUR : </Text>
          {color}
        </Text>
        <View style={styles.colourContainer}>
          <Pressable
            onPress={() => setColor("BLUE")}
            style={[
              styles.colourPicker,
              { backgroundColor: "blue" },
              color === "BLUE"
                ? { borderWidth: 3, borderColor: "#3d4141" }
                : null,
            ]}
          />
          <Pressable
            onPress={() => setColor("GRAY")}
            style={[
              styles.colourPicker,
              { backgroundColor: "gray" },
              color === "GRAY"
                ? { borderWidth: 3, borderColor: "#3d4141" }
                : null,
            ]}
          />
          <Pressable
            onPress={() => setColor("BLACK")}
            style={[
              styles.colourPicker,
              { backgroundColor: "black" },
              color === "BLACK"
                ? { borderWidth: 3, borderColor: "#3d4141" }
                : null,
            ]}
          />
          <Pressable
            onPress={() => setColor("CYAN")}
            style={[
              styles.colourPicker,
              { backgroundColor: "cyan" },
              color === "CYAN"
                ? { borderWidth: 3, borderColor: "#3d4141" }
                : null,
            ]}
          />
        </View>
      </View>
      <View>
        <Text style={styles.colourTextContainer}>
          <Text style={styles.textBold}>SIZE : </Text>
          {data.findProductById.category.name.split(" ")[0].split("'")[0]} {size}
        </Text>
        <View style={styles.colourContainer}>
          <Pressable
            onPress={() => setSize("XS")}
            style={[
              styles.sizePicker,
              size === "XS" ? { borderColor: "black" } : null,
            ]}
          >
            <Text style={styles.textBold}>XS</Text>
          </Pressable>
          <Pressable
            onPress={() => setSize("S")}
            style={[
              styles.sizePicker,
              size === "S" ? { borderColor: "black" } : null,
            ]}
          >
            <Text style={styles.textBold}>S</Text>
          </Pressable>
          <Pressable
            onPress={() => setSize("M")}
            style={[
              styles.sizePicker,
              size === "M" ? { borderColor: "black" } : null,
            ]}
          >
            <Text style={styles.textBold}>M</Text>
          </Pressable>
          <Pressable
            onPress={() => setSize("L")}
            style={[
              styles.sizePicker,
              size === "L" ? { borderColor: "black" } : null,
            ]}
          >
            <Text style={styles.textBold}>L</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <Text
          style={{
            textDecorationLine: "line-through",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumSignificantDigits: 1,
          }).format(data?.findProductById.price * 1450 * 1.25)}
        </Text>
        <Text
          style={{
            color: "red",
            fontWeight: "bold",
            fontSize: 26,
            marginTop: -8,
          }}
        >
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumSignificantDigits: 1,
          }).format(data?.findProductById.price * 1450)}
        </Text>
        <Text style={{ color: "red", fontSize: 12, marginVertical: 8 }}>
          Limited Offer from From 14 April 2023 to 20 April 2023
        </Text>
      </View>
      <View style={styles.quantityContainer}>
        <Text style={[styles.textBold, { marginBottom: 8 }]}>QUANTITY</Text>
        <View
          style={{ borderBottomWidth: 1, borderColor: "black", width: "50%" }}
        >
          <Picker
            style={styles.quantitySelector}
            selectedValue={quantity}
            onValueChange={(itemValue) => setQuantity(itemValue)}
          >
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
          </Picker>
        </View>
        <Text style={styles.fadedText}>In stock</Text>
      </View>
      <View style={styles.cartContainer}>
        <Button
          title="ADD TO CART"
          buttonStyle={{
            backgroundColor: "rgba(214, 61, 57, 1)",
            height: 60,
          }}
          containerStyle={{
            width: "80%",
          }}
          titleStyle={{
            color: "white",
            marginHorizontal: 20,
            fontSize: 20,
          }}
        />
        <Button
          buttonStyle={{
            backgroundColor: "white",
            shadowColor: "gray",
            height: 60,
            aspectRatio: 1,
            borderWidth: 2,
            borderColor: "black",
          }}
        >
          <Icon
            name="heart-plus-outline"
            type="material-community"
            color="#000"
            size={30}
          />
        </Button>
      </View>
      <View style={styles.inventoryContainer}>
        <Text style={[styles.textBold, { marginBottom: 8 }]}>
          STORE INVENTORY STATUS
        </Text>
        <Text style={styles.fadedText}>
          We can display a nearest store stock status if location service is
          turned on.
        </Text>
        <Button
          containerStyle={{ marginVertical: 8 }}
          buttonStyle={{
            borderWidth: 2,
            shadowColor: "gray",
            borderColor: "black",
            height: 40,
            backgroundColor: "white",
          }}
          titleStyle={{ color: "black", fontSize: 14 }}
          title="USE MY LOCATION"
        />
      </View>
      <TouchableOpacity activeOpacity={0.6} style={styles.findInStoreContainer}>
        <Icon
          style={{ paddingHorizontal: 12, marginRight: 8 }}
          name="warehouse"
          type="material-community"
          color="#000"
          size={30}
        />
        <Text>FIND IN STORE</Text>
      </TouchableOpacity>
      <View style={styles.descriptionContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 24,
          }}
        >
          <Text style={styles.textBold}>DESCRIPTION</Text>
          <Text style={styles.fadedText}>Product ID : {id}</Text>
        </View>
        <TouchableOpacity
          style={styles.tabDetailsContainer}
          onPress={() => {
            navigation.navigate("SPECIFICATIONS", {
              data: data.findProductById.specifications,
            });
          }}
        >
          <Text style={styles.tabDetailsTitle}>SPECIFICATIONS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("MATERIALS", {
              data: data.findProductById.material,
            });
          }}
          style={styles.tabDetailsContainer}
        >
          <Text style={styles.tabDetailsTitle}>MATERIALS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SIZE CHART");
          }}
          style={styles.tabDetailsContainer}
        >
          <Text style={styles.tabDetailsTitle}>VIEW SIZE CHART</Text>
        </TouchableOpacity>
        <View style={styles.tabDetailsContainer}>
          <Text style={styles.tabDetailsTitle}>RETURN POLICY</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    paddingVertical: 8,
    minHeight: 115,
    paddingHorizontal: 12,
    backgroundColor: "#f8eeea",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  overviewContainer: {
    marginTop: 6,
  },
  imageContainer: {
    height: 375,
    aspectRatio: 1,
  },
  colourTextContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#f8eeea",
  },
  textBold: {
    fontWeight: "bold",
  },
  colourContainer: {
    flexDirection: "row",
    height: 60,
    paddingHorizontal: 12,
    backgroundColor: "#f8eeea",
  },
  colourPicker: {
    aspectRatio: 1,
    height: "100%",
    marginRight: 12,
  },
  sizePicker: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#c3bfbf",
    borderWidth: 2,
    height: "80%",
    aspectRatio: "1",
    marginRight: 12,
  },
  priceContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#f8eeea",
  },
  quantityContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#f8eeea",
  },
  quantitySelector: {
    width: "100%",
    borderWidth: 6,
    borderColor: "black",
  },
  fadedText: {
    color: "gray",
    fontSize: 12,
  },
  cartContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#f8eeea",
  },
  inventoryContainer: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: "#f8eeea",
  },
  findInStoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: "gray",
    borderTopColor: "gray",
    backgroundColor: "#f8eeea",
  },
  descriptionContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#f8eeea",
  },
  tabDetailsTitle: {
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingBottom: 16,
    marginBottom: 16,
  },
});

export default ProductDetails;
