import React from 'react';
import { useSelector } from 'react-redux';

import DescriptionFindme from '../../sections/DescriptionFindme';
import SearchProvider from '../../sections/SearchProvider';

export default function Main() {
  const { signed } = useSelector(state => state.auth);
  return (
    <>
      {!signed && <DescriptionFindme />}
      <SearchProvider />
    </>
  );
}
