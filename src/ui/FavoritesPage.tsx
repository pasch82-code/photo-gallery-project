import React from "react";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../state";
import { PostSelectors } from "../selectors";
import { useEffect } from "react";
import { clearFavorites, getFavoritesFetch, getLoadMoreFavoritesFetch, setFavoritesFromStore } from "../slice";
import useBreakpoint from "use-breakpoint";
import { BREAKPOINTS } from "../theme";
import PageLayout from "./layout/PageLayout";
import Button from "./library/Button";
import ImagesContainer from "./ImagesContainer";

/**
 * This is React component that displays a page of favorite images, with the ability to
 * clear the favorites and load more images. It also uses Redux hooks to retrieve and
 * update state related to favorites. It renders a gallery of images with an infinite scroll feature.  
 * It uses various hooks from the `react-redux` library to retrieve and update data from the Redux store. 
 * It also uses the `useBreakpoint` hook from the `use-breakpoint` library to determine the current breakpoint of the
 * screen and select the smallest images in the store to display accordingly. 
 * The `handleLoadMore` function is called when the user scrolls to the bottom of the page, triggering a fetch for more images.
 */
function FavoritesPage() {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const favoriteImages = useSelector((state: AppState) => PostSelectors.selectFavoriteImages(state, breakpoint));
  const cachedFavoriteIds = useSelector((state: AppState) => PostSelectors.getFavoritesStoredIds(state));
  const isLoading = useSelector((state: AppState) => PostSelectors.isFavoritesLoading(state));
  const hasMoreRecords = useSelector((state: AppState) => PostSelectors.favoritesHasMoreRecords(state));

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setFavoritesFromStore());
    dispatch(getFavoritesFetch());
  }, []);

  const handleLoadMore = () => {
    dispatch(getLoadMoreFavoritesFetch());
  };

  const handleButtonClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(clearFavorites());
  };

  return (<>
    <PageLayout headerContent={<Button disabled={cachedFavoriteIds.length == 0} onClick={handleButtonClick}>Clear Favorites</Button>}>
      <ImagesContainer
        hasRecords={hasMoreRecords}
        handleLoadMore={handleLoadMore}
        images={favoriteImages}
        isLoading={isLoading}
      />
    </PageLayout>
  </>);
}

export default FavoritesPage;