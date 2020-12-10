import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,

} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BlockRGB from "./Components/blockRGB";

const NUM_COLUMNS = 10;

function HomeScreen({ navigation }) {
  const [colorArray, setColorArray] = useState([]);
  const BLOCK_SIZE = useWindowDimensions().width / NUM_COLUMNS;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addColor} title="Add Color">
          <Text style={styles.headerRight}>Add</Text>
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={resetColor} title="Reset">
          <Text style={styles.headerLeft}>Reset</Text>
        </TouchableOpacity>
      ),
    });
  });

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("DetailsScreen", {
            ...item,
          })
        }
      >
        <BlockRGB
          style={{ height: BLOCK_SIZE, width: BLOCK_SIZE }}
          red={item.red}
          green={item.green}
          blue={item.blue}
        />
      </TouchableOpacity>
    );
  }

  function addColor() {
    setColorArray([
      ...colorArray,
      {
        red: Math.floor(Math.random() * 256),
        green: Math.floor(Math.random() * 256),
        blue: Math.floor(Math.random() * 256),
        id: `${colorArray.length}`,
      },
    ]);
  }

  function resetColor() {
    setColorArray([]);
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={colorArray}
        renderItem={renderItem}
        numColumns={NUM_COLUMNS}
      />{" "}
    </View>
  );
}

function DetailsScreen({ route }) {
  const { red, green, blue } = route.params;

  const textRed = red > 125 ? 255 - red - 20 : 255 + red + 20;
  const textGreen = green > 125 ? 255 - green - 20 : 255 + green + 20;
  const textBlue = blue > 125 ? 255 - blue - 20 : 255 + blue + 20;

  return (
    <View
      style={[
        styles.container,
        {
          justifyContent: "center",
          backgroundColor: `rgb(${red}, ${green}, ${blue})`,
        },
      ]}
    >
      <Text
        style={[
          { color: `rgb(${textRed}, ${textGreen}, ${textBlue})` },
          styles.detailsText,
        ]}
      >
        Red: {red}
      </Text>
      <Text
        style={[
          { color: `rgb(${textRed}, ${textGreen}, ${textBlue})` },
          styles.detailsText,
        ]}
      >
        Green: {green}
      </Text>
      <Text
        style={[
          { color: `rgb(${textRed}, ${textGreen}, ${textBlue})` },
          styles.detailsText,
        ]}
      >
        Blue: {blue}
      </Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Colour Generator" component={HomeScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    width: null,
  },

  list: {
    width: "100%",
  },

  detailText: {
    fontSize: 50,
  },

  headerText: {
    fontSize: 20,
    alignItems: "center",
  },

  headerLeft: {
    fontSize: 20,
    margin: 10,
    color: "red",
  },

  headerRight: {
    fontSize: 20,
    margin: 10,
    color: "blue",
  },
});
