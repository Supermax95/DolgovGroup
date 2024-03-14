import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  Modal,
  Switch,
  Platform,
  PanResponder,
  StyleSheet,
} from 'react-native';
import Slider from '@react-native-community/slider';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

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
    <>
      {isVisible && <View style={styles.overlay} />}

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
          style={[
            styles.container,
            { transform: [{ translateY: modalOffset }] },
          ]}
        >
          <View style={styles.modalWrapper}>
            <View style={styles.modalContent}>
              <Pressable
                onPress={() => {
                  onApply();
                  onClose(false);
                }}
                style={styles.closeButton}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={Platform.OS === 'android' ? 20 : 23}
                  color="#71716F"
                />
              </Pressable>

              <View style={styles.switchContainer}>
                <Text style={styles.label}>Новые продукты</Text>
                <Switch
                  trackColor={{ false: '#d6d3d1', true: '#a7f3d0' }}
                  thumbColor={showNew ? '#22c55e' : '#f5f5f4'}
                  ios_backgroundColor="#d6d3d1"
                  onValueChange={() => setShowNew(!showNew)}
                  value={showNew}
                />
              </View>

              <View style={styles.switchContainer}>
                <Text style={styles.label}>Только со скидками</Text>
                <Switch
                  trackColor={{ false: '#d6d3d1', true: '#a7f3d0' }}
                  thumbColor={showDiscounted ? '#22c55e' : '#f5f5f4'}
                  ios_backgroundColor="#d6d3d1"
                  onValueChange={() => setShowDiscounted(!showDiscounted)}
                  value={showDiscounted}
                />
              </View>

              <View style={styles.priceContainer}>
                <View style={styles.priceLabelContainer}>
                  <Text style={styles.label}>Цена:</Text>
                  <Text style={styles.price}>
                    {minPrice}&#8381; - {maxPrice}&#8381;
                  </Text>
                </View>

                <Slider
                  style={styles.slider}
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
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.0)',
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    height: '40%',
    width: '100%',
    margin: 0,
    paddingTop: 35,
    paddingHorizontal: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 21,
  },
  closeButton: {
    position: 'absolute',
    left: 20,
    top: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    // paddingVertical: Platform.OS === 'android' ? 8 : 8,
    // marginBottom: Platform.OS === 'android' ? 0 : 4,
    marginBottom: 4,
  },
  label: {
    flex: 1,
    color: '#3f3f46',
    fontSize: Platform.OS === 'android' ? 16 : 14,
    fontWeight: '600',
  },
  priceContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  priceLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    color: '#333',
    fontSize: Platform.OS === 'android' ? 16 : 14,
    fontWeight: '600',
  },
  slider: {
    width: '100%',
    height: 40,
  },
});

export default FilterModal;
