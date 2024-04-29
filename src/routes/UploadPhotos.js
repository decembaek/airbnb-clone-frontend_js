import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import ProtectedPage from '../components/ProtectedPage';
import HostOnlyPage from '../components/HostOnlyPage';
import { useMutation } from '@tanstack/react-query';
import { getUploadURL, uploadImage } from '../api';

const UploadPhotos = () => {
  const { register, handleSubmit, watch } = useForm();
  const uploadImageMutaion = useMutation({
    mutationFn: uploadImage,
    onSuccess: data => {
      console.log(data);
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
  const { roomPk } = useParams();
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
              <Button type="submit" w="full" colorScheme={'red'}>
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
