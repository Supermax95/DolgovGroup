import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";

// const Post = styled.View`
//   padding: 15px;
//   background-color: black;
//   height: 80px;
//   width: 80px;
//   border-radius: 30px;
// `;
const PostImage = styled.Image`
padding: 15px;
height: 240px;
width: 240px;
resizeMode: contain;
`;


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Добро пожаловать</Text>
      < PostImage source={{uri:'https://poisk-firm.ru/storage/employer/logo/70/ba/a9/abb46e24b581abb40de2b12ed1.jpg'}}/>
      <StatusBar theme="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
