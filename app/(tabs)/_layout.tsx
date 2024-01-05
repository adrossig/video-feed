import { ResizeMode, Video } from "expo-av";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import VideoComponent from "../../components/VideoComponent";

const VIDEO_FEED = [
  {
    id: 1,
    video: require("../../assets/videos/video1.mp4"),
  },
  {
    id: 2,
    video: require("../../assets/videos/video2.mp4"),
  },
  {
    id: 3,
    video: require("../../assets/videos/video3.mp4"),
  },
  {
    id: 4,
    video: require("../../assets/videos/video4.mp4"),
  },
];

export default function TabLayout() {
  const [videoIndex, setVideoIndex] = useState(VIDEO_FEED[0].id);
  const [videoFeed, setVideoFeed] = useState<typeof VIDEO_FEED>([]);

  const onEndReach = () => {
    setVideoFeed((currentVideo) => [...currentVideo, ...VIDEO_FEED]);
  };

  useEffect(() => {
    const fetchVideo = async () => {
      setVideoFeed(VIDEO_FEED);
    };

    fetchVideo();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <FlatList
        data={videoFeed}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReach}
        onEndReachedThreshold={3}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <VideoComponent video={item} activeVideo={videoIndex} />
        )}
      />
    </View>
  );
}
