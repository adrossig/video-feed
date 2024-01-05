import { Dimensions, StyleSheet, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";

type VideoComponentProps = {
  video: {
    id: number;
    video: any;
  };
  activeVideo: number;
};

const VideoComponent = ({ video, activeVideo }: VideoComponentProps) => {
  const videoRef = useRef<Video>(null);
  const [status, setStatus] = React.useState<AVPlaybackStatus>();
  const isPlaying = status?.isLoaded && status.isPlaying;
  const { height } = Dimensions.get("window");
  const dynamicVideoSource = video.video;

  const onPress = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pauseAsync();
    } else {
      videoRef.current.playAsync();
    }
  };

  useEffect(() => {
    if (!videoRef.current) return;
    if (activeVideo !== video.id) {
      videoRef.current.pauseAsync();
    }
    if (activeVideo === video.id) {
      videoRef.current.playAsync();
    }
  }, [activeVideo, videoRef.current]);

  return (
    <View style={{ flex: 1, height }}>
      <Video
        ref={videoRef}
        source={dynamicVideoSource}
        style={StyleSheet.absoluteFill}
        resizeMode={ResizeMode.COVER}
        useNativeControls
        onPlaybackStatusUpdate={setStatus}
        isLooping
      />
    </View>
  );
};

export default VideoComponent;
