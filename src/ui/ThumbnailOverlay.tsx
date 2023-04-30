import React, { PropsWithChildren, useCallback } from "react";
import unescape from "lodash/unescape";
import styled from "styled-components";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import IconButton from "./library/IconButton";
import { VscLinkExternal } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { FavoritesSelectors } from "../state/favorites/favoritesSelectors";
import { AppState, useAppDispatch } from "../state/state";
import { toggleFavorite } from "../state/favorites/favoritesSlice";

const StyledThumbnailOverlay = styled.div`
  position: absolute;
  z-index: 9;
  bottom: 0;
  color: white;
  transition: opacity 0.2s ease 0s, max-height 0.2s ease 0s;
  background-image: linear-gradient(to bottom, 
    rgba(0, 0, 0, 0.8),  
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.1), 
    rgba(0, 0, 0, 0.0), 
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.8));
  width: 100%;
  height: 100%;

  .top{
    position: absolute;
    top: 0;
    right: 0; 
    padding: 8px;
  }
  
  .bottom{
    position: absolute;
    bottom: 0;    
    padding: 8px;
  }

  .icons {
    display: flex;
    flex-direction: row;
  }
`;

export interface ThumbnailOverlayProps {
  postId: string,
  title: string,
  sourceHeight: number,
  sourceWidth: number,
  permalink: string;
  url: string
}

/**
 * This is a React functional component that renders a thumbnail overlay with information about a post,
 * including its dimensions, title, and options to favorite or view externally.
 * @param props - The props object that contains the properties passed to the ThumbnailOverlay
 * component.
 * @returns A React functional component that renders a thumbnail overlay with information about a
 * post, including its dimensions, title, and icons for favoriting and opening the post in a new tab.
 * The component also uses Redux to determine if the post is favorited and to toggle its favorite
 * status when the user clicks the favorite icon.
 */
const ThumbnailOverlay: React.FC<PropsWithChildren<ThumbnailOverlayProps>> = (props) => {

  const { postId, sourceWidth, sourceHeight, title, permalink } = props;
  const isFavorite = useSelector((state: AppState) => FavoritesSelectors.isFavorite(state, postId));
  
  const dispatch = useAppDispatch();

  const handleFavClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(toggleFavorite(postId));
    e.stopPropagation();
    e.preventDefault();
  }, [postId]);

  return (<StyledThumbnailOverlay >
      <div className="top">{sourceWidth}x{sourceHeight}</div>
      <div className="bottom">{unescape(title)}
        <div className="icons">
          <IconButton name="favorite" onClick={handleFavClick}>
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </IconButton>
          <Link rel="noopener noreferrer" to={`https://reddit.com/${permalink}`} target="_blank">
            <IconButton name="external">
              <VscLinkExternal />
            </IconButton>
          </Link>
        </div>
      </div>
    </StyledThumbnailOverlay>);
}

export default ThumbnailOverlay;