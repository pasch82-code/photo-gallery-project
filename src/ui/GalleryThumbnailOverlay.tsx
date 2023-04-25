import React, { PropsWithChildren, useCallback } from "react";
import unescape from "lodash/unescape";
import { AppState, useAppDispatch } from "../state";
import styled from "styled-components";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { PostSelectors } from "../selectors";
import IconButton from "./library/IconButton";
import { VscLinkExternal } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { toggleFavorite } from "../slice";

const StyledGalleryThumbnailOverlay = styled.div`
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

interface GalleryThumbnailOverlayProps {
  postId: string,
  title: string,
  sourceHeight: number,
  sourceWidth: number,
  permalink: string;
  url: string
}

/**
 * This is a React functional component that renders a gallery thumbnail overlay with title,
 * dimensions, and icons for favorite and external link.
 * @param props - The props object that contains the properties passed down to the
 * GalleryThumbnailOverlay component. It is of type PropsWithChildren<GalleryThumbnailOverlayProps>.
 * @returns A React functional component that renders a gallery thumbnail overlay with information
 * about the post, including its dimensions, title, and icons for favoriting and opening the post in a
 * new tab. The component also uses Redux to check if the post is favorited and to dispatch an action
 * to toggle its favorite status.
 */
const GalleryThumbnailOverlay: React.FC<PropsWithChildren<GalleryThumbnailOverlayProps>> = (props) => {

  const { postId, sourceWidth, sourceHeight, title, permalink } = props;
  const isFavorite = useSelector((state: AppState) => PostSelectors.isFavorite(state, postId));
  
  const dispatch = useAppDispatch();

  const handleFavClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    dispatch(toggleFavorite(postId));
    e.stopPropagation();
    e.preventDefault();
  }, [postId]);

  return (<StyledGalleryThumbnailOverlay >
      <div className="top">{sourceWidth}x{sourceHeight}</div>
      <div className="bottom">{unescape(title)}
        <div className="icons">
          <IconButton onClick={handleFavClick}>
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </IconButton>
          <Link rel="noopener noreferrer" to={`https://reddit.com/${permalink}`} target="_blank">
            <IconButton>
              <VscLinkExternal />
            </IconButton>
          </Link>
        </div>
      </div>
    </StyledGalleryThumbnailOverlay>);
}

export default GalleryThumbnailOverlay;