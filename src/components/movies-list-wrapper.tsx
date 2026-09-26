import React, { memo, useCallback } from "react";
import { FlatList, ListRenderItem } from "react-native";
import { MoviesCardType } from "../types";

const CARD_ITEM_WIDTH = 124;

interface MoviesListWrapperProps {
  data: MoviesCardType[];
  renderItem: ListRenderItem<MoviesCardType>;
}

const MoviesListWrapper = ({
  data,
  renderItem,
}: MoviesListWrapperProps) => {
  const keyExtractor = useCallback(
    (item: MoviesCardType, index: number) =>
      (item?.id ?? index).toString(),
    [],
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      horizontal
      getItemLayout={(_, index) => ({
        length: CARD_ITEM_WIDTH,
        offset: CARD_ITEM_WIDTH * index,
        index,
      })}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      windowSize={5}
      removeClippedSubviews
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default memo(MoviesListWrapper);
