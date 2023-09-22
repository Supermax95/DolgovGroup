import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

const LogoImage = styled.Image`
  padding: 150px;
  height: 240px;
  width: 240px;
  resizeMode: contain;
`;
const PostView = styled.View`
  flex: 1;
  alignItems: center;
  justifyContent: center; 
`;


const LogoHello = () => {
  return (
    <PostView>
      <Text>Добро пожаловать</Text>
      <LogoImage
        source={{
          uri: "https://poisk-firm.ru/storage/employer/logo/70/ba/a9/abb46e24b581abb40de2b12ed1.jpg",
        }}
      />
    </PostView>
  );
};

export default LogoHello;
