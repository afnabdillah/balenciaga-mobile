import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomePage from "../components/HomePage";

export default function Categories() {
  const Tab = createMaterialTopTabNavigator();

  return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            height: 40,
            paddingBottom: 0,
            backgroundColor : "#f8eeea"
          },
          tabBarLabelStyle: {
            fontWeight : 600,
            fontSize : 14,
            color : "#e47c53"
          }
        }}
      >
        <Tab.Screen name="ALL" component={HomePage} />
        <Tab.Screen name="WOMEN" component={HomePage} />
        <Tab.Screen name="MEN" component={HomePage} />
      </Tab.Navigator>
  );
}
