import { MediaDetailsContainer } from "@/src/screens";
import { useLocalSearchParams } from "expo-router";
import React from "react";

const MediaDetails = () => {
  const { id, typeOfList } = useLocalSearchParams();

  const mediaId = Number(id);

  return (
    <MediaDetailsContainer id={mediaId} typeOfList={typeOfList as string} />
  );
};

export default MediaDetails;
