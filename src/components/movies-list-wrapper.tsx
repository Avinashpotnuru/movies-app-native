import React, { memo } from "react";
import { FlatList, ListRenderItem } from "react-native";

interface MoviesListWrapperProps<T> {
  data: T[];
  renderItem: ListRenderItem<T>;
}

const MoviesListWrapper = <T,>({
  data,
  renderItem,
}: MoviesListWrapperProps<T>) => {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default memo(MoviesListWrapper);
