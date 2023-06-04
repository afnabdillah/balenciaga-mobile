import { View, Text, StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";
import React from "react";

const FilterHeader = ({count}) => {

  return (
    <View style={styles.contentsHeader}>
      <Text>{count} item(s)</Text>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            flexDirection: "row",
            marginRight: 24,
            alignItems: "center",
          }}
        >
          <Icon type="font-awesome" name="sort" style={{ marginRight: 8 }} />
          <Text style={{ fontWeight: "600" }}>SORT BY</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon type="font-awesome" name="filter" style={{ marginRight: 8 }} />
          <Text style={{ fontWeight: "600" }}>FILTER</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentsHeader: {
    height: 50,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f8eeea",
  },
});

export default FilterHeader;
