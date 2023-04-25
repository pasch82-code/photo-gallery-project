import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../state";
import { PostSelectors } from "../selectors";
import { useEffect } from "react";
import { changeSearchText, getLoadMorePostsFetch, getPostsFetch, setFavoritesFromStore } from "../slice";
import GalleryThumbnail from "./GalleryThumbnail";
import useBreakpoint from 'use-breakpoint';
import { BREAKPOINTS } from "../theme";
import InfiniteScrollContainer from "./library/InfiniteScrollContainer";
import PageLayout from "./layout/PageLayout";
import Spinner from "./library/Spinner";
import InputText from "./library/InputText";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";
import ImagesContainer from "./ImagesContainer";

const StyledHeaderInput = styled.div`
  justify-content: center;
`;

/**
 * This is a functional component that renders a search input field with an icon and placeholder text,
 * and updates the search text in the Redux store on user input.
 * @returns A React component that renders a search input field with an icon and placeholder text. The
 * component uses Redux hooks `useSelector` and `useAppDispatch` to retrieve and update the search text
 * value from the application state. The `handleChange` function is a callback that dispatches an
 * action to update the search text value in the state when the input field value changes.
 */
function GalleryHeaderContent() {
  const inputText = useSelector((state: AppState) => PostSelectors.getEditingSearchText(state));
  const dispatch = useAppDispatch();

  const handleChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSearchText(evt.target.value))
  }, [])

  return (<StyledHeaderInput>
    <InputText icon={<FaSearch />} value={inputText} onChange={handleChange} placeholder={"channel"} />
  </StyledHeaderInput>);
}

/**
 * This is a React component that displays a gallery of images and fetches new posts from the server
 * based on user search text input. The gallery is updated with new posts whenever the user changes the search text.
 * It uses various hooks from the `react-redux` library to retrieve and update data from the Redux store. 
 * It also uses the `useBreakpoint` hook from the `use-breakpoint` library to determine the current breakpoint of the
 * screen and select the smallest images in the store to display accordingly. 
 * The `handleLoadMore` function is called when the user scrolls to the bottom of the page, triggering a fetch for more images.
 */
function GalleryPage() {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const images = useSelector((state: AppState) => PostSelectors.selectImages(state, breakpoint));
  const isLoading = useSelector((state: AppState) => PostSelectors.isGalleryLoading(state));
  const editingSearchText = useSelector((state: AppState) => PostSelectors.getEditingSearchText(state));
  const lastSearchText = useSelector((state: AppState) => PostSelectors.getLastSearchText(state));
  const hasMoreRecords = useSelector((state: AppState) => PostSelectors.galleryHasMoreRecords(state));

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (editingSearchText != lastSearchText)
      dispatch(getPostsFetch());
  }, [editingSearchText, lastSearchText]);

  useEffect(() => {
    dispatch(setFavoritesFromStore());
  }, [])

  const handleLoadMore = () => {
    dispatch(getLoadMorePostsFetch());
  };

  return (<>
    <PageLayout headerContent={<GalleryHeaderContent />} >
      <ImagesContainer
        hasRecords={hasMoreRecords}
        handleLoadMore={handleLoadMore}
        images={images}
        isLoading={isLoading}
      />
    </PageLayout>
  </>);
}

export default GalleryPage;