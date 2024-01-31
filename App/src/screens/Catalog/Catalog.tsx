import React, { FC, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { StackNavigationProp } from 'navigation/types';

import CategoryDetail from 'components/Catalog/CategoryDetail/CategoryDetail';
import SubcategoryDetail from 'components/Catalog/SubcategoryDetail/SubcategoryDetail';
import ProductsCards from 'components/Catalog/ProductsCards/ProductsCards';
import SingleProduct from 'components/Catalog/ProductsCards/SingleProduct/SingleProduct';

const Catalog: FC = () => {
  const navigation = useNavigation<StackNavigationProp>();
  const dispatch = useAppDispatch();

  return (
    <>
      <CategoryDetail />
    </>
  );
};

export default Catalog;
