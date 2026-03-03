import { CastOverView } from "@/src/screens";
import { useLocalSearchParams } from "expo-router";
import React from "react";

const CastDetailsContainer = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const castId = Number(id);
  return <CastOverView castId={castId} />;
};

export default CastDetailsContainer;
