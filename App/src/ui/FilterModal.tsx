import {
  View,
  Text,
  Pressable,
  Animated,
  Modal,
  Switch,
  Platform,
  PanResponder,
} from 'react-native';
import Slider from '@react-native-community/slider';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';

interface FilterModalProps {
  isVisible: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  onApply: () => void;
  showNew: boolean;
  setShowNew: (value: boolean) => void;
  showDiscounted: boolean;
  setShowDiscounted: (value: boolean) => void;
  minPrice: number;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
  maxProductOriginalPrice: number;
}

const FilterModal: FC<FilterModalProps> = ({
  isVisible,
  onClose,
  onApply,
  showNew,
  setShowNew,
  showDiscounted,
  setShowDiscounted,
  minPrice,
  maxPrice,
  setMaxPrice,
  maxProductOriginalPrice,
}) => {
  const [modalOffset, setModalOffset] = useState(new Animated.Value(0));

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 10,
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy > 0) {
        Animated.event([null, { dy: modalOffset }], {
          useNativeDriver: false,
        })(_, gestureState);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > 50) {
        Animated.timing(modalOffset, {
          toValue: 400, // Изменено на 400, но может потребоваться другое значение
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          onApply();
          onClose(false);
          setModalOffset(new Animated.Value(0)); // Сброс смещения
        });
      } else {
        Animated.timing(modalOffset, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        onApply();
        onClose(false);
      }}
    >
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.0)',
          transform: [{ translateY: modalOffset }],
        }}
      >
        <View className="absolute h-[40%] bottom-0 left-0 right-0">
          <View
            style={{
              backgroundColor: 'white',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
              width: '100%',
              height: '100%',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: -2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Pressable
              onPress={() => {
                onApply();
                onClose(false);
              }}
            >
              <MaterialCommunityIcons
                name="close"
                size={Platform.OS === 'android' ? 20 : 23}
                color="#71716F"
              />
            </Pressable>
            <View
              className={`flex-row border-b-[1px] border-zinc-200 items-center justify-between
          ${Platform.OS === 'android' ? 'py-0' : 'py-2'}`}
            >
              <Text
                className={`text-zinc-700 font-medium ${
                  Platform.OS === 'android' ? 'text-base' : 'text-md'
                }`}
              >
                Новые продукты
              </Text>
              <Switch
                trackColor={{ false: '#d6d3d1', true: '#a7f3d0' }}
                thumbColor={showNew ? '#22c55e' : '#f5f5f4'}
                ios_backgroundColor="#d6d3d1"
                onValueChange={() => setShowNew(!showNew)}
                value={showNew}
              />
            </View>
            <View
              className={`flex-row border-b-[1px] border-zinc-200 items-center justify-between
          ${Platform.OS === 'android' ? 'py-0' : 'py-2'}`}
            >
              <Text
                className={`text-zinc-700 font-medium ${
                  Platform.OS === 'android' ? 'text-base' : 'text-md'
                }`}
              >
                Только со скидками
              </Text>
              <Switch
                trackColor={{ false: '#d6d3d1', true: '#a7f3d0' }}
                thumbColor={showDiscounted ? '#22c55e' : '#f5f5f4'}
                ios_backgroundColor="#d6d3d1"
                onValueChange={() => setShowDiscounted(!showDiscounted)}
                value={showDiscounted}
              />
            </View>

            <View
              className={`flex-col  justify-between
          ${Platform.OS === 'android' ? 'py-0' : 'py-2'}`}
            >
              <View className="flex-row justify-between items-center my-4">
                <Text
                  className={`text-zinc-700 font-medium ${
                    Platform.OS === 'android' ? 'text-base' : 'text-md'
                  }`}
                >
                  Цена:
                </Text>

                <Text
                  className={`text-zinc-700 font-medium ${
                    Platform.OS === 'android' ? 'text-base' : 'text-md'
                  }`}
                >
                  {minPrice}&#8381; - {maxPrice}&#8381;
                </Text>
              </View>

              <Slider
                style={{ width: '100%', height: 40 }}
                minimumValue={0}
                maximumValue={maxProductOriginalPrice}
                step={10}
                value={maxPrice}
                minimumTrackTintColor="#a7f3d0"
                onValueChange={(value) => setMaxPrice(value)}
              />
            </View>
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default FilterModal;
