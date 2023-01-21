import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { FC } from 'react';

interface ImageGalleryProps {
  images: string[];
}

export const ImageGallery: FC<ImageGalleryProps> = ({ images }) => {
  return (
    <ImageList sx={{ width: '100%', overflow: 'unset' }} cols={4}>
      {images.map((url) => (
        <ImageListItem key={url}>
          <img
            src={`${url}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt='Uploaded for the note'
            loading='lazy'
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
