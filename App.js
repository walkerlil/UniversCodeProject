import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import {
  ActivityIndicator,
  Provider,
  Snackbar,
} from "react-native-paper";
import ListItem from "./components/ListItem";
import tw from "twrnc";
import ListHeader from "./components/ListHeader";
import API_ROUTES from "./constants/routes";

export default function App() {
  const [category, setCategory] = useState([0]);
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [posts, setPosts] = useState(null);

  const getRedditData = async () => {
    setLoading(true);
    const res = await axios({
      method: "get",
      url: API_ROUTES[category].url,
    });
    setPosts(res.data.data?.children);
    setLoading(false);
  };

  useEffect(() => {
    getRedditData();
  }, [category]);

  const onChangeCategory = async (index) => {
    setCategory([index]);
  };

  const onDismissSnackBar = () => {
    setSnackbarVisible(false);
    setSnackbarMessage(null);
  };

  return (
    <Provider>
      <SafeAreaView style={tw`bg-gray-900 flex`}>
        <StatusBar style="light" />
        <FlatList
          style={tw`bg-gray-900 flex h-full`}
          ListHeaderComponent={() => (
            <ListHeader {...{ category, onChangeCategory }} />
          )}
          stickyHeaderIndices={[0]}
          data={!loading && posts}
          keyExtractor={(item) => item?.id}
          ListEmptyComponent={()=> <ActivityIndicator size={"large"} style={tw` self-center justify-center z-10 h-full `}/>}
          renderItem={({ item }) => (
            <ListItem {...{ loading, item, setSnackbarVisible, setSnackbarMessage }} /> 
          )}
          refreshControl={
            <RefreshControl
              tintColor={"white"}
              colors={["white", "white"]}
              refreshing={loading}
              onRefresh={getRedditData}
            />
          }
        />
        <Snackbar
          visible={snackbarVisible}
          onDismiss={onDismissSnackBar}
          style={tw`bg-black`}
          action={{
            label: "Dismiss",
          }}
        >
          {snackbarMessage}
        </Snackbar>
      </SafeAreaView>
    </Provider>
  );
}
