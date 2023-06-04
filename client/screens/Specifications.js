import { View, Text } from "react-native";
import React from "react";

const Specifications = ({ route }) => {
  const { data } = route.params;

  return (
    <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 12 }}>
      {data.split(".").map((el, i) => {
        return (
          <Text key={i} style={{ marginBottom: 4 }}>
            {`\u2022`} {el.trim()}
          </Text>
        );
      })}
    </View>
  );
};

export default Specifications;
