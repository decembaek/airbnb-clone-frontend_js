import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import ProtectedPage from '../components/ProtectedPage';
import HostOnlyPage from '../components/HostOnlyPage';
import { useMutation } from '@tanstack/react-query';
import { createPhoto, getUploadURL, uploadImage } from '../api';

const UploadPhotos = () => {
  const { register, handleSubmit, watch, reset } = useForm();
  const { roomPk } = useParams();
  const toast = useToast();
  const createPhotoMutaion = useMutation({
    mutationFn: createPhoto,
    onSuccess: () => {
      toast({
        status: 'success',
        title: 'Image uploaded!',
        description: 'Feel free to upload more image',
      });
      reset();
    },
  });
  const uploadImageMutaion = useMutation({
    mutationFn: uploadImage,
    onSuccess: ({ result }) => {
      // console.log(data);
      // console.log(result);
      if (roomPk) {
        createPhotoMutaion.mutate({
          description: 'I love React',
          file: `https://imagedelivery.net/XQCgjO9eBv5XEmR7VN84hQ/${result.id}/public`,
          roomPk,
        });
      }
    },
  });
  const uploadURLMutaion = useMutation({
    mutationFn: getUploadURL,
    onSuccess: data => {
      uploadImageMutaion.mutate({
        uploadURL: data.uploadURL,
        file: watch('file'),
      });
    },
  });
  const onSubmit = data => {
    uploadURLMutaion.mutate();
  };
  return (
    <ProtectedPage>
      <HostOnlyPage>
        <Box
          pb={40}
          mt={10}
          px={{
            base: 10,
            lg: 40,
          }}
        >
          <Container>
            <Heading textAlign={'center'}>Upload a Photo</Heading>
            <VStack
              spacing={5}
              mt={10}
              as={'form'}
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl>
                <Input {...register('file')} type="file" accept="image/*" />
              </FormControl>
              <Button
                isLoading={
                  createPhotoMutaion.isLoading ||
                  uploadImageMutaion.isLoading ||
                  uploadURLMutaion.isLoading
                }
                type="submit"
                w="full"
                colorScheme={'red'}
              >
                Upload photos
              </Button>
            </VStack>
          </Container>
        </Box>
      </HostOnlyPage>
    </ProtectedPage>
  );
};

export default UploadPhotos;
