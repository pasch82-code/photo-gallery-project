import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import useBreakpoint from "use-breakpoint";
import { BREAKPOINTS } from "../../theme";
import PageLayout from "../layout/PageLayout";
import Button from "../library/Button";
import ImagesContainer from "../ImagesContainer";
import { useTranslation } from "react-i18next";
import { FavoritesSelectors } from "../../state/favorites/favoritesSelectors";
import { AppState, useAppDispatch } from "../../state/state";
import { clearFavorites, getFavoritesPostsStart, loadMoreFavoritesStart } from "../../state/favorites/favoritesSlice";

function FavoritesPage() {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const favoriteImages = useSelector((state: AppState) => FavoritesSelectors.selectImages(state, breakpoint));
  const favoriteIds = useSelector((state: AppState) => FavoritesSelectors.getLocalStorageIds(state));
  const isFetching = useSelector((state: AppState) => FavoritesSelectors.isFetching(state));
  const hasMoreRecords = useSelector((state: AppState) => FavoritesSelectors.hasMoreRecords(state));
  const { t } = useTranslation("translations");
  
  const dispatch = useAppDispatch();

   useEffect(() => {
     dispatch(getFavoritesPostsStart());
   }, [favoriteIds]);

  const handleLoadMore = () => {
    dispatch(loadMoreFavoritesStart());
  };

  const handleButtonClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(clearFavorites());
  };

  return (<>
    <PageLayout headerContent={<Button disabled={favoriteIds.length == 0} onClick={handleButtonClick}>{t("favorites.clear")}</Button>}>
      <ImagesContainer
        hasRecords={hasMoreRecords}
        handleLoadMore={handleLoadMore}
        images={favoriteImages}
        isLoading={isFetching}
      />
    </PageLayout>
  </>);
}

export default FavoritesPage;