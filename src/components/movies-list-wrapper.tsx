import React, { memo } from "react";
import { ScrollView } from "react-native";

const MoviesListWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
};

export default memo(MoviesListWrapper);
