import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MoviesCardType } from "@/src/types";
import { router } from "expo-router";
import { useIsFocused } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import React, { memo, useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Carousel, {
  type ICarouselInstance,
} from "react-native-reanimated-carousel";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import RemoteImage from "./remote-image";
import { getImage } from "../utils/getImage";
import { Colors } from "../theme";
import { prefetchMovieDetail } from "../hooks/useGetMovieDetail";

const HERO_HEIGHT = 240;

const PLACEHOLDER = require("@/assets/images/placeholder.jpg");

const PARALLAX_CONFIG = {
  parallaxScrollingScale: 1,
  parallaxAdjacentItemScale: 0.85,
  parallaxScrollingOffset: 40,
};

interface MoviesCarouselProps {
  moviePosters: MoviesCardType[];
}

const resolveTitle = (item: MoviesCardType) =>
  item?.title || item?.name || item?.original_title || item?.original_name || "";

const resolveYear = (item: MoviesCardType) =>
  item?.release_date ? item.release_date.slice(0, 4) : "";

const HeroCard = memo(
  ({
    item,
    animationValue,
    onPress,
  }: {
    item: MoviesCardType;
    animationValue: SharedValue<number>;
    onPress: (item: MoviesCardType) => void;
  }) => {
    const liftStyle = useAnimatedStyle(() => {
      const progress = animationValue.value;
      return {
        transform: [
          {
            translateY: interpolate(
              progress,
              [-1, 0, 1],
              [4, -10, 4],
              Extrapolation.CLAMP,
            ),
          },
        ],
      };
    });

    const imageStyle = useAnimatedStyle(() => {
      const progress = animationValue.value;
      return {
        transform: [
          {
            scale: interpolate(
              progress,
              [-1, 0, 1],
              [1.06, 1.1, 1.06],
              Extrapolation.CLAMP,
            ),
          },
        ],
      };
    });

    const metaStyle = useAnimatedStyle(() => {
      const progress = animationValue.value;
      return {
        opacity: interpolate(
          progress,
          [-1, 0, 1],
          [0.15, 1, 0.15],
          Extrapolation.CLAMP,
        ),
      };
    });

    const badgeStyle = useAnimatedStyle(() => {
      const progress = animationValue.value;
      return {
        opacity: interpolate(
          progress,
          [-1, 0, 1],
          [0.25, 1, 0.25],
          Extrapolation.CLAMP,
        ),
      };
    });

    const title = resolveTitle(item);
    const year = resolveYear(item);
    const rating = item?.vote_average ? item.vote_average.toFixed(1) : null;

    return (
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() => onPress(item)}
        style={styles.item}
      >
        <Animated.View style={[styles.card, liftStyle]}>
          <Animated.View style={[StyleSheet.absoluteFillObject, imageStyle]}>
            <RemoteImage
              source={
                item?.poster_path
                  ? { uri: getImage(item.poster_path, "w780") }
                  : PLACEHOLDER
              }
              placeholder={PLACEHOLDER}
              contentFit="cover"
              recyclingKey={item?.id?.toString()}
              style={StyleSheet.absoluteFillObject}
            />
          </Animated.View>

          <LinearGradient
            colors={["rgba(11,15,20,0)", "rgba(11,15,20,0.85)"]}
            locations={[0.45, 1]}
            style={styles.scrim}
          />

          <Animated.View style={[styles.badge, badgeStyle]}>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeText}>TRENDING</Text>
          </Animated.View>

          <Animated.View style={[styles.meta, metaStyle]}>
            <Text style={styles.caption} numberOfLines={1}>
              {title}
            </Text>
            <View style={styles.row}>
              {rating ? (
                <View style={styles.rating}>
                  <Ionicons name="star" size={12} color={Colors.primary} />
                  <Text style={styles.ratingText}>{rating}</Text>
                </View>
              ) : null}
              {year ? <Text style={styles.year}>{year}</Text> : null}
            </View>
          </Animated.View>
        </Animated.View>
      </TouchableOpacity>
    );
  },
);

HeroCard.displayName = "HeroCard";

const PaginationDots = memo(function PaginationDots({
  total,
  active,
}: {
  total: number;
  active: number;
}) {
  return (
    <View style={styles.dots}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={[styles.dot, index === active && styles.dotActive]}
        />
      ))}
    </View>
  );
});

PaginationDots.displayName = "PaginationDots";

const MoviesCarousel = ({ moviePosters }: MoviesCarouselProps) => {
  const { width } = useWindowDimensions();
  const isFocused = useIsFocused();
  const [activeIndex, setActiveIndex] = useState(0);
  const queryClient = useQueryClient();
  const carouselRef = React.useRef<ICarouselInstance>(null);

  const handleNavigation = useCallback(
    (item: MoviesCardType) => {
      if (!item?.id) return;
      prefetchMovieDetail(queryClient, item.id, "movie");
      router.push({
        pathname: "/media-details/[id]",
        params: { id: item.id, typeOfList: "movie" },
      });
    },
    [queryClient],
  );

  const itemWidth = width - 32;

  const renderItem = useCallback(
    (
      row: {
        item: MoviesCardType;
        animationValue: SharedValue<number>;
      },
    ) => (
      <HeroCard
        item={row.item}
        animationValue={row.animationValue}
        onPress={handleNavigation}
      />
    ),
    [handleNavigation],
  );

  return (
    <View style={styles.container}>
      {!moviePosters?.length ? (
        <View style={[styles.item, styles.empty]}>
          <RemoteImage
            source={PLACEHOLDER}
            contentFit="cover"
            style={styles.poster}
          />
        </View>
      ) : (
        <Carousel
          ref={carouselRef}
          loop
          mode="parallax"
          modeConfig={PARALLAX_CONFIG}
          width={itemWidth}
          height={HERO_HEIGHT}
          autoPlay={isFocused && !!moviePosters?.length}
          autoPlayInterval={4200}
          data={moviePosters}
          pagingEnabled
          scrollAnimationDuration={900}
          windowSize={5}
          onSnapToItem={setActiveIndex}
          renderItem={renderItem}
          style={styles.carousel}
        />
      )}

      {!!moviePosters?.length ? (
        <View style={styles.footer}>
          <PaginationDots
            total={moviePosters.length}
            active={activeIndex % moviePosters.length}
          />

          <Text style={styles.counter}>
            {String(activeIndex % moviePosters.length + 1).padStart(2, "0")}
            <Text style={styles.counterDim}>
              {" "}
              / {String(moviePosters.length).padStart(2, "0")}
            </Text>
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default memo(MoviesCarousel);

const styles = StyleSheet.create({
  container: {
    marginTop: 14,
    alignItems: "center",
  },
  carousel: {
    alignItems: "center",
  },
  item: {
    width: "100%",
    height: HERO_HEIGHT,
    paddingVertical: 12,
  },
  empty: {
    height: HERO_HEIGHT,
    width: "100%",
  },
  poster: {
    width: "100%",
    height: "100%",
    borderRadius: 18,
  },
  card: {
    flex: 1,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 9,
    backfaceVisibility: "hidden",
  },
  scrim: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 130,
  },
  badge: {
    position: "absolute",
    top: 14,
    left: 14,
    backgroundColor: "rgba(11,15,20,0.55)",
    borderWidth: 1,
    borderColor: "rgba(215,237,47,0.35)",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginRight: 6,
  },
  badgeText: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  meta: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
  },
  caption: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    color: Colors.text,
    fontSize: 13,
    fontWeight: "700",
  },
  year: {
    color: Colors.secondaryText,
    fontSize: 13,
    fontWeight: "600",
  },
  footer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 12,
  },
  dots: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.22)",
  },
  dotActive: {
    width: 22,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  counter: {
    color: Colors.text,
    fontSize: 12,
    fontWeight: "700",
    fontVariant: ["tabular-nums"],
    letterSpacing: 1,
  },
  counterDim: {
    color: Colors.secondaryText,
    fontWeight: "600",
  },
});