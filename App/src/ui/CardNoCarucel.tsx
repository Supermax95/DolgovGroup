import React, { FC } from 'react';
import {
  Image,
  View,
  Text,
  Pressable,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_API_URL } from '@env';

interface ICardNoCarusel {
  onPress: () => void;
  promotionTitle: string;
  promotionImage: string;
  isNew?: boolean;
  isPromotion?: boolean;
  oldPrice?: number | null;
  newPrice?: number | null;
}

const CardNoCarusel: FC<ICardNoCarusel> = ({
  onPress,
  promotionTitle,
  promotionImage,
  isNew = false,
  isPromotion = true,
  oldPrice = null,
  newPrice = null,
}) => {
  const screenWidth = Math.round(Dimensions.get('window').width);
  const cardSize = (screenWidth - 48) / 2; // Размер для сетки 2x2 с отступами

  // Вычисляем процент скидки если есть обе цены
  const discountPercent = oldPrice && newPrice && oldPrice > newPrice
    ? Math.round(((oldPrice - newPrice) / oldPrice) * 100)
    : null;

  return (
    <Pressable
      onPress={onPress}
      style={{ 
        flexDirection: 'column', 
        width: cardSize,
        marginBottom: 12,
      }}
    >
      {/* Квадратная карточка с изображением */}
      <View style={[styles.squareContainer, { width: cardSize, height: cardSize }]}>
        <Image
          source={{
            uri: `${EXPO_PUBLIC_API_URL}:${EXPO_PUBLIC_PORT}${promotionImage}`,
          }}
          resizeMode="cover"
          style={[styles.squareImage, { width: cardSize, height: cardSize }]}
        />
        
        {/* Лейбл НОВИНКА! или АКЦИЯ! или процент скидки */}
        {discountPercent ? (
          <View style={styles.discountBadge}>
            <Text style={styles.labelText}>-{discountPercent}%</Text>
          </View>
        ) : (isNew || isPromotion) && (
          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>
              {isNew ? 'НОВИНКА!' : 'АКЦИЯ!'}
            </Text>
          </View>
        )}
      </View>

      {/* Название и цены под карточкой */}
      <View style={{ marginTop: 8 }}>
        <Text
          style={{ 
            fontSize: 13,
            fontWeight: '500',
            color: '#374151',
            textAlign: 'left'
          }}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {promotionTitle}
        </Text>

        {/* Цены если они есть */}
        {(oldPrice || newPrice) && (
          <View style={{ marginTop: 6 }}>
            {oldPrice && newPrice && oldPrice > newPrice ? (
              // Есть скидка - показываем обе цены
              <>
                <Text style={styles.oldPrice}>{oldPrice.toFixed(2)} ₽</Text>
                <Text style={styles.newPrice}>{newPrice.toFixed(2)} ₽</Text>
              </>
            ) : newPrice ? (
              // Только одна цена
              <Text style={styles.singlePrice}>{newPrice.toFixed(2)} ₽</Text>
            ) : oldPrice ? (
              <Text style={styles.singlePrice}>{oldPrice.toFixed(2)} ₽</Text>
            ) : null}
          </View>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  squareContainer: {
    position: 'relative',
    borderRadius: 16, // Мягкое скругление углов
    overflow: 'hidden',
    backgroundColor: '#F3F4F6', // Светло-серый фон для мягкого вида без контура
  },
  squareImage: {
    borderRadius: 16,
  },
  labelContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#DC2626', // Красный цвет
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  labelText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#DC2626',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  oldPrice: {
    fontSize: 11,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    marginBottom: 2,
  },
  newPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#DC2626',
  },
  singlePrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
});

export default CardNoCarusel;
