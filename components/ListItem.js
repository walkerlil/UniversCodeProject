import React, { useState } from "react";
import {
  Button,
  Card,
  IconButton,
  Text,
  Menu,
  Divider,
} from "react-native-paper";
import TimeFormatter from "../util/TimeUtils";
import tw from "twrnc";
import { Image, View, Modal } from "react-native";
import { WebView } from "react-native-webview";

const ListItem = ({ item, setSnackbarVisible, setSnackbarMessage }) => {
  const [vote, setVote] = useState();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(false);

  const {
    author,
    created, 
    num_comments,
    ups, 
    downs, 
    url, 
    title, 
    thumbnail
  } = item?.data

  const openWebView = () => setSelected(true);
  const closeWebView = () => setSelected(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const upvote = () => {
    if (vote === "up") {
      setVote(null);
    } else {
      setVote("up");
      setSnackbarVisible(true);
      setSnackbarMessage("You Upvoted This Post");
    }
  };

  const downvote = () => {
    if (vote === "down") {
      setVote(null);
    } else {
      setVote("down");
      setSnackbarVisible(true);
      setSnackbarMessage("You Downvoted This Post");
    }
  };

  return (
    <>
      <Card
        style={tw`bg-gray-900 py-6 rounded-none border-b border-gray-500 border-opacity-50`}
        contentStyle="contained"
        onPress={openWebView}
      >
        <Card.Title
          title={
            author +
            "  •  " +
            TimeFormatter.formatUnixFromNow(created)
          }
          titleStyle={tw`font-semibold text-sm text-gray-400 w-4/5  pl-2`}
        />
        <Card.Content style={tw`justify-between flex-row`}>
          <Image
            source={{ uri: thumbnail }}
            style={tw`w-24 h-24 rounded-xl justify-center`}
          />
          <Text numberOfLines={4} elipsisMode="tail" variant="titleLarge" style={tw`text-white font-semibold text-lg w-1/2`}>
            {title}
          </Text>

          <Menu
            visible={visible}
            contentStyle={tw`bg-gray-800 right-5`}
            onDismiss={closeMenu}
            anchor={<IconButton icon={"dots-vertical"} onPress={openMenu} />}
          >
            <Menu.Item
              onPress={openWebView}
              titleStyle={{ color: "lightgray" }}
              title="View On Web"
            />
            <Divider />
            <Menu.Item
              onPress={upvote}
              leadingIcon={"thumb-up"}
              titleStyle={{ color: "lightgray" }}
              title="Upvote"
            />
            <Menu.Item
              onPress={downvote}
              leadingIcon={"thumb-down"}
              titleStyle={{ color: "lightgray" }}
              title="Downvote"
            />
          </Menu>
        </Card.Content>
        <View style={tw`flex-row justify-between pt-2`}>
          <Card.Actions>
            <Button icon="comment" textColor="lightgray" mode="text" size={12}>
              {num_comments}
            </Button>
          </Card.Actions>
          <Card.Actions>
            <Button
              icon="thumb-down"
              mode={vote === "down" ? "contained" : "outlined"}
              textColor={vote === "down" ? "white" : "gray"}
              onPress={downvote}
            >
              {downs}
            </Button>
            <Button
              icon="thumb-up"
              textColor={vote === "up" ? "white" : "gray"}
              mode={vote === "up" ? "contained" : "outlined"}
              onPress={upvote}
            >
              {ups}
            </Button>
          </Card.Actions>
        </View>
      </Card>
      <Modal
        animationType="slide"
        presentationStyle="pageSheet"
        visible={selected}
      >
        <IconButton
          icon={"chevron-left"}
          style={tw`bg-white`}
          onPress={closeWebView}
        />
        <WebView
          style={tw`flex bg-gray-900`}
          source={{ uri: url }}
        />
      </Modal>
    </>
  );
};

export default ListItem;
