import React, { useState } from "react";
import { Image, View, Text } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const [fileName, setFileName] = useState(null);

  // 撮影ボタン押下時
  const handleCameraAction = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) {
        const uri = result.assets[0].uri;
        const fileSize = result.assets[0].fileSize;
        const fileName = result.assets[0].fileName;
        setImage(uri);
        setFileSize(fileSize);
        setFileName(fileName);
      }
    } catch (error) {
      console.error("Error while accessing the camera:", error);
    }
  };

  // カメラロールボタン押下時
  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [16, 9], // androidのみ対応
      });
      if (!result.canceled) {
        const uri = result.assets[0].uri;
        const fileSize = result.assets[0].fileSize;
        const fileName = result.assets[0].fileName;
        setImage(uri);
        setFileSize(fileSize);
        setFileName(fileName);
      }
    } catch (error) {
      console.error("Error while picking the image:", error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Button
        icon={<Icon name="photo" size={15} color="#333333" />}
        iconRight
        title="カメラロール  "
        onPress={handleImagePick}
        containerStyle={{ margin: 10 }}
        buttonStyle={{ backgroundColor: "#65BBE9" }}
        titleStyle={{ color: "#333333" }}
      />
      <Button
        icon={<Icon name="camera" size={15} color="#333333" />}
        iconRight
        title="撮影  "
        onPress={handleCameraAction}
        containerStyle={{ margin: 10 }}
        buttonStyle={{ backgroundColor: "#AFDFE4" }}
        titleStyle={{ color: "#333333" }}
      />
      {image && (
        <>
          <Image
            source={{ uri: image }}
            style={{
              width: "100%",
              height: 500,
              marginTop: 20,
              marginBottom: 20,
            }}
          />
          <Text>ファイルサイズ：{fileSize}KB</Text>
          <Text>ファイル名：{fileName}</Text>
        </>
      )}
    </View>
  );
}
