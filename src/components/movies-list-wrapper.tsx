import React, { memo } from "react";
import { FlatList, ListRenderItem } from "react-native";
import { MoviesCardType } from "../types";

interface MoviesListWrapperProps {
  data: MoviesCardType[];
  renderItem: ListRenderItem<MoviesCardType>;
}

const MoviesListWrapper = ({
  data,
  renderItem,
}: MoviesListWrapperProps) => {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) =>
        (item?.id ?? index).toString()
      }
      horizontal
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      windowSize={5}
      removeClippedSubviews
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default memo(MoviesListWrapper);
