import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { Formik } from "formik";

const Header = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ search: "" }}
        onSubmit={(values) => {
          navigation.navigate("BrowseProducts", {
            data : values
          });
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <TextInput
            placeholder="Search keyword ..."
            style={styles.searchInputStyle}
            onChangeText={handleChange("search")}
            onBlur={handleBlur("search")}
            value={values.search}
            onSubmitEditing={handleSubmit}
            returnKeyType={"search"}
          />
        )}
      </Formik>
      <TouchableOpacity activeOpacity={0.7} style={styles.iconContainerStyle}>
        <Icon
          name="line-scan"
          type="material-community"
          color="#000"
          size={25}
        />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} style={styles.iconContainerStyle}>
        <Icon name="cart" type="evilicon" color="#000" size={30} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingVertical: 4,
    paddingHorizontal: 12,
    height: 50,
    width: "100%",
    backgroundColor: "#f8eeea",
    flexDirection: "row",
    alignItems: "center",
  },
  searchInputStyle: {
    paddingHorizontal: 6,
    flex: 4,
    backgroundColor: "white",
    height: "80%",
  },
  iconContainerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Header;
