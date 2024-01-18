import { View } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import CardProduct from 'ui/PromotionalCardProduct';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import getProducts from 'Redux/thunks/Catalog/productGet.api';
import getCategory from 'Redux/thunks/Catalog/categoryGet.api';
import getSubcategory from 'Redux/thunks/Catalog/subcategoryGet.api';
import { PORT, IP } from '@env';


export interface IProduct {
  id: number;
  article: string;
  productName: string;
  promoStartDate: string;
  promoEndDate: string;
  originalPrice: number;
  customerPrice: number;
  employeePrice: number;
  isNew: boolean;
  isDiscounted: boolean;
  description: string;
  photo: string;
  subcategoryId: number;
  invisible: boolean;
}

export interface ICategory {
  id: number;
  categoryName: string;
}

export interface ISubcategory {
  id: number;
  subcategoryName: string;
  categoryId: number;
}


export const NewGoods: FC = () => {
  const dispatch = useAppDispatch();
  
  const products = useAppSelector<IProduct[]>(
    (state) => state.productSlice.data
  );
  // console.log('products',products);
  const categories = useAppSelector<ICategory[]>(
    (state) => state.categorySlice.data
  );
  // console.log(categories);
  
  const subcategories = useAppSelector<ISubcategory[]>(
    (state) => state.subcategorySlice.data
  );


  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSubcategory());
  }, [dispatch]);
  
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
  <View className="flex-row flex-wrap justify-between mb-2">
  {products.map((product) => (
    <CardProduct
      key={product.id}
      productName={product.productName}
      promoStartDate={product.promoStartDate}
      promoEndDate={product.promoEndDate}
      originalPrice={product.originalPrice}
      discountedPrice={product.employeePrice}
      discountPercentage={calculateDiscountPercentageWithCents(
        product.originalPrice,
        product.employeePrice
        )}
        imageProduct={`http://${IP}:${PORT}${product.photo}`}
      />
    ))}
    </View>
  );
};

export default NewGoods;


