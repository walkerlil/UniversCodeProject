import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button, Menu } from "react-native-paper";
import tw from "twrnc";
import API_ROUTES from "../constants/routes";

export default function ListHeader({ category, onChangeCategory, showMostRecent, setShowMostRecent }) {
  const [visible, setVisible] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const openSortMenu = () => setSortOpen(true);
  const closeSortMenu = () => setSortOpen(false);

  const date = new Date();
  let hours = date.getHours();
  let welcomeMessage =
    hours < 12
      ? "Good Morning"
      : hours <= 18 && hours >= 12
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <View
      style={tw`bg-gray-900 py-5 px-2 flex-row justify-between items-center mb-2`}
    >
      <View>
        <Text style={tw`text-gray-500 font-semibold text-sm`}>
          {new Date().toDateString()}
        </Text>
        <Text style={tw`text-white font-semibold text-2xl`}>
          {welcomeMessage}
        </Text>
      </View>
      <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        contentStyle={tw`bg-gray-800`}
        anchor={
          <Button
            style={tw`self-start rounded-md`}
            mode="outlined"
            textColor={API_ROUTES[category]?.color}
            icon={API_ROUTES[category]?.icon}
            onPress={openMenu}
          >
            {API_ROUTES[category]?.name}
          </Button>
        }
      >
        {API_ROUTES.map((category, index) => (
          <Menu.Item
            leadingIcon={API_ROUTES[index]?.icon}
            titleStyle={{ color: API_ROUTES[index]?.color }}
            style={{ color: API_ROUTES[index]?.color }}
            onPress={() => onChangeCategory(index)}
            title={category.name}
          />
        ))}
      </Menu>
      <Menu
        visible={sortOpen}
        onDismiss={closeSortMenu}
        contentStyle={tw`bg-gray-800`}
        anchor={
          <Button
            style={tw`self-start rounded-md`}
            textColor={"gray"}
            mode="text"
            icon={'sort'}
            onPress={openSortMenu}
          >
            {showMostRecent ? "Recent" : "Latest"}
          </Button>
        }
      >
        <Menu.Item
          leadingIcon={"sort-ascending"}
          titleStyle={{ color: 'white'}}
          onPress={() => setShowMostRecent(true)}
          title="Sort Most Recent"
        />
        <Menu.Item
          leadingIcon={"sort-descending"}
          titleStyle={{ color: 'white'}}
          onPress={() => setShowMostRecent(false)}
          title="Sort Latest"
        />
      </Menu>
      </View>
    </View>
  );
}
