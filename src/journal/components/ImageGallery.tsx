import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { FC } from 'react';
import { NoteImage } from '../../store/journal';

interface ImageGalleryProps {
  images: NoteImage[];
}

export const ImageGallery: FC<ImageGalleryProps> = ({ images }) => {
  return (
    <ImageList sx={{ width: '100%', overflow: 'unset' }} cols={4}>
      {images.map((image) => (
        <ImageListItem key={image.id}>
          <img
            src={`${image.url}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${image.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt='Uploaded for the note'
            loading='lazy'
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
