import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import * as React from "react";

import Colors from "../constants/Colors";
import PenguinScreen from "../screens/PenguinScreen";
import ScannerScreen from "../screens/ScannerScreen";
import MapScreen from "../screens/MapScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";

export type BottomTabParamList = {
  Penguin: {};
  Scanner: undefined;
  Map: undefined;
};

export type PenguinParamList = {
  PenguinScreen: undefined;
};

export type ScannerParamList = {
  ScannerScreen: undefined;
  ProductDetail: { ean: string | null };
};

export type MapParamList = {
  MapScreen: undefined;
};

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Penguin"
      tabBarOptions={{ activeTintColor: Colors.tint }}
    >
      <BottomTab.Screen
        name="Penguin"
        component={PenguinNavigator}
        options={{
          title: "Verlauf",
          tabBarIcon: ({ color }) => (
            <AntDesign
              size={24}
              name="linechart"
              color={color}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Scanner"
        component={ScannerNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={24}
              name="barcode-scan"
              color={color}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Map"
        component={MapNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Fontisto
              size={24}
              name="earth"
              color={color}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const PenguinStack = createStackNavigator<PenguinParamList>();

function PenguinNavigator() {
  return (
    <PenguinStack.Navigator>
      <PenguinStack.Screen
        name="PenguinScreen"
        component={PenguinScreen}
        options={{ headerTitle: "CO2 Verlauf" }}
      />
    </PenguinStack.Navigator>
  );
}

const ScannerStack = createStackNavigator<ScannerParamList>();

function ScannerNavigator() {
  return (
    <ScannerStack.Navigator>
      <ScannerStack.Screen
        name="ScannerScreen"
        component={ScannerScreen}
        options={{ headerTitle: "Scanner" }}
      />
      <ScannerStack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ headerTitle: "Product" }}
        initialParams={{ ean: null }}
      />
    </ScannerStack.Navigator>
  );
}

const MapStack = createStackNavigator<MapParamList>();

function MapNavigator() {
  return (
    <MapStack.Navigator>
      <MapStack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{ headerTitle: "Map" }}
      />
    </MapStack.Navigator>
  );
}
