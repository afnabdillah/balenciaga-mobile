import { View, Text } from "react-native";
import React from "react";

const Materials = ({ route }) => {
  const { data } = route.params;

  return (
    <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 12 }}>
      <Text>{data}</Text>
    </View>
  );
};

export default Materials;
