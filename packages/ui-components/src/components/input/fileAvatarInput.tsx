import React, {useCallback, useState} from 'react';
import styled from 'styled-components';

import {useDropzone} from 'react-dropzone';
import {IconAdd, IconClose} from '../icons/interface';
import {Spinner} from '../spinner';
import {ButtonIcon} from '../button';

export type FileAvatarInputProps = {
  onChange: (file: File) => void;
  onError: (error: {code: string; message: string}) => void;
  maxDimension?: number;
  minDimension?: number;
  maxFileSize: number;
};
/** Dropdown input with variable styling (depending on mode) */

export const FileAvatarInput: React.FC<FileAvatarInputProps> = ({
  onChange,
  maxDimension = 2400,
  minDimension = 256,
  maxFileSize = 5000000,
  onError,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const onDrop = useCallback(
    (acceptedFiles: Array<File>, onDropRejected) => {
      if (onDropRejected.length !== 0) {
        onError(onDropRejected[0].errors[0]);
      } else {
        const image = new Image();
        image.addEventListener('load', () => {
          if (
            image.width > maxDimension ||
            image.height > maxDimension ||
            image.width < minDimension ||
            image.height < minDimension ||
            image.height !== image.width
          ) {
            onError({
              code: 'wrong-dimension',
              message:
                'Please provide a squared image with size between 256px and 2400 px on each side',
            });
          } else {
            onChange(acceptedFiles[0]);
            setPreview(image.src);
          }
        });
        image.src = URL.createObjectURL(acceptedFiles[0]);
      }
    },
    [maxDimension, minDimension, onChange, onError]
  );

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    maxSize: maxFileSize,
    accept: 'image/jpg, image/jpeg, image/png, image/gif, image/svg',
  });
  return (
    <>
      {!loading ? (
        <>
          {preview ? (
            <ImageContainer>
              <Preview src={preview} />
              <StyledButton
                icon={<IconClose />}
                size="small"
                mode="secondary"
                onClick={() => setPreview(null)}
              />
            </ImageContainer>
          ) : (
            <DefaultContainer {...getRootProps()}>
              <IconAdd />
              <input {...getInputProps()} />
            </DefaultContainer>
          )}
        </>
      ) : (
        <LoadingContainer>
          <Spinner size="small" />
        </LoadingContainer>
      )}
    </>
  );
};

const DefaultContainer = styled.div.attrs({
  className: `flex items-center justify-center bg-ui-0 text-ui-600 
  h-8 w-8 border-dashed border-ui-100 border-2 rounded-xl cursor-pointer`,
})``;

const LoadingContainer = styled.div.attrs({
  className: `flex items-center justify-center bg-ui-0 
    h-8 w-8 border-dashed border-primary-500 border-2 rounded-xl`,
})``;

const ImageContainer = styled.div.attrs({
  className: 'relative h-8 w-8',
})``;

const Preview = styled.img.attrs({
  className: 'rounded-xl bg-ui-0 h-8 w-8',
})``;

const StyledButton = styled(ButtonIcon).attrs({
  className: 'absolute',
})`
  top: -10px;
  left: 54px;
  box-shadow: 0px 4px 8px rgba(31, 41, 51, 0.04),
    0px 0px 2px rgba(31, 41, 51, 0.06), 0px 0px 1px rgba(31, 41, 51, 0.04);
`;
