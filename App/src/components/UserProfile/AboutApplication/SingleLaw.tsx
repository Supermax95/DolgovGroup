import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, Dimensions, Linking, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import currentProduct from 'Redux/thunks/Catalog/getcurrentProduct';
import RenderHtml from 'react-native-render-html';
import currentLaw from 'Redux/thunks/Law/getCurrentLaw.api';

export interface ILaw {
  id: number;
  title: string;
  description: string;
  documentLink: string;
  dateFrom: string;
  updatedAt: Date | string;
}

const SingleLaw = ({ route }: any) => {
  const { lawId } = route.params;
  const dispatch = useAppDispatch();
  const { width } = Dimensions.get('window');

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(currentLaw(lawId));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [dispatch, lawId]);

  const currentLawOpen = useAppSelector<ILaw>((state) => state.lawSlice.currentLaw) || ({} as ILaw);
  console.log(currentLawOpen);
  

  const desc = currentLawOpen.description ? (
    <RenderHtml
      source={{
        html: String(currentLawOpen.description),
      }}
      contentWidth={width}
      enableExperimentalMarginCollapsing={true}
    />
  ) : null;
  console.log(desc);
  

  const openDocumentLink = () => {
    if (currentLawOpen.documentLink) {
      Linking.openURL(currentLawOpen.documentLink);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#ffff' }}>
      <ScrollView style={{ flex: 1, width: '100%' }}>
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ marginTop: 16, fontSize: 20, fontWeight: 'bold' }}>{currentLawOpen.title}</Text>
          <View className={`flex items-start justify-start w-full`}>
            {desc}
          </View>
          {currentLawOpen.documentLink && (
            <TouchableOpacity onPress={openDocumentLink}>
              <Text style={{ color: 'blue', textDecorationLine: 'underline', marginTop: 8 }}>
                Открыть документ
              </Text>
            </TouchableOpacity>
          )}
          {desc}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingleLaw;
