import React, { FC, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { StackNavigationProp } from 'navigation/types';

import CategoryDetail from 'components/Catalog/CategoryDetail/CategoryDetail';
import SubcagoryDetail from 'components/Catalog/SubcagoryDetail/SubcagoryDetail';

const Catalog: FC = () => {
  const navigation = useNavigation<StackNavigationProp>();
  const dispatch = useAppDispatch();

  return (
    <>
      <SubcagoryDetail />
      {/* <CategoryDetail /> */}
    </>
  );
};

export default Catalog;
