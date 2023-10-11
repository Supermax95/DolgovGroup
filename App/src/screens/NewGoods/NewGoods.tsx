import { View } from 'react-native';
import React from 'react';
import CardProduct from 'ui/PromotionalCardProduct';

export const NewGoods = () => {
  function calculateDiscountPercentageWithCents(
    originalPrice: number,
    discountedPrice: number
  ) {
    if (originalPrice <= 0 || discountedPrice <= 0) {
      return 0; // Защита от деления на ноль или отрицательных значений
    }

    // Вычисляем скидку в копейках
    const originalCents = originalPrice * 100;
    const discountedCents = discountedPrice * 100;
    const discountAmountCents = originalCents - discountedCents;

    // Вычисляем процент скидки
    const discountPercentage = (discountAmountCents / originalCents) * 100;

    return Number(discountPercentage.toFixed(0)); // Округляем до двух знаков после запятой
  }

  // Пример использования функции
  const originalPrice = 122.73; // Исходная цена, включая копейки
  const discountedPrice = 116.36; // Цена со скидкой, включая копейки

  const discountPercentage = calculateDiscountPercentageWithCents(
    originalPrice,
    discountedPrice
  );

  //console.log(`Скидка составляет ${discountPercentage}%`);

  return (
    <View className="flex-row flex-wrap justify-between">
      <CardProduct
        productName="Название продуктаbvhdn dbkdnkn lbnskl"
        promoStartDate="2023-10-10"
        promoEndDate="2023-10-20"
        originalPrice={10.99}
        discountedPrice={8.99}
        discountPercentage={discountPercentage}
        imageProduct={require('../../assets/ChocoMilka.png')}
      />
      <CardProduct
        productName="Название продуктаbvhdn dbkdnkn lbnskl"
        promoStartDate="2023-10-10"
        promoEndDate="2023-10-20"
        originalPrice={10.99}
        discountedPrice={8.99}
        discountPercentage={discountPercentage}
        imageProduct={require('../../assets/ChocoMilka.png')}
      />
      <CardProduct
        productName="Название продуктаbvhdn dbkdnkn lbnskl"
        promoStartDate="2023-10-10"
        promoEndDate="2023-10-20"
        originalPrice={10.99}
        discountedPrice={8.99}
        discountPercentage={discountPercentage}
        imageProduct={require('../../assets/ChocoMilka.png')}
      />
    </View>
  );
};

export default NewGoods;
