import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useRef } from "react";
import { FlatList, RefreshControl, SafeAreaView } from "react-native";
import { ActivityIndicator, FAB, Provider, Snackbar } from "react-native-paper";
import ListItem from "./components/ListItem";
import tw from "twrnc";
import ListHeader from "./components/ListHeader";
import API_ROUTES from "./constants/routes";
import SplashScreen from "./components/SplashScreen";
import getCategoryPosts from "./api/getCategoryPosts";

export default function App() {
  const [category, setCategory] = useState([0]);
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [posts, setPosts] = useState(null);
  const [splash, setSplashCompleted] = useState(false);

  const listRef = useRef();

  const getRedditData = async () => {
    setLoading(true);
    try{
      const res = await getCategoryPosts(category)
      setPosts(res?.data?.data?.children);
      setTimeout(()=>{
        setLoading(false);
      }, 500)
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
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

  useEffect(() => {
    setTimeout(() => {
      setSplashCompleted(true);
    }, 3500);
  }, []); 

  if (!splash) return <SplashScreen />;

  return (
    <Provider>
      <SafeAreaView style={tw`bg-gray-900 flex`}>
        <StatusBar style="light" />
        <FlatList
          ref={listRef}
          style={tw`bg-gray-900 flex h-full`}
          ListHeaderComponent={() => (
            <ListHeader {...{ category, onChangeCategory }} />
          )}
          stickyHeaderIndices={[0]}
          data={!loading && posts}
          keyExtractor={(item) => item?.id}
          ListEmptyComponent={() => (
            <ActivityIndicator
              size={"large"}
              style={tw` self-center justify-center z-10 h-full `}
            />
          )}
          renderItem={({ item }) => (
            <ListItem
              {...{ loading, item, setSnackbarVisible, setSnackbarMessage }}
            />
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
        <FAB
          icon="chevron-up"
          style={[
            tw`absolute m-4 bottom-10 right-4`,
            { backgroundColor: API_ROUTES[category]?.color },
          ]}
          onPress={() =>
            listRef?.current?.scrollToIndex({
              animated: true,
              index: 0,
              viewPosition: 0,
              viewOffset: 0,
            })
          }
        />
        <Snackbar
          visible={snackbarVisible}
          onDismiss={onDismissSnackBar}
          style={tw`bg-gray-700`}
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
