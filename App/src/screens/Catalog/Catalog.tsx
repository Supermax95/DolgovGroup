import React, { FC, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { StackNavigationProp } from 'navigation/types';

import CategoryDetail from 'components/Catalog/CategoryDetail/CategoryDetail';

const Catalog: FC = () => {
  return (
    <>
      <CategoryDetail />
    </>
  );
};

export default Catalog;
