import { CastOverView } from "@/src/components";
import { useLocalSearchParams } from "expo-router";
import React from "react";

const CastDetailsContainer = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const castId = Number(id);
  return <CastOverView castId={castId} />;
};

export default CastDetailsContainer;
