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

const UploadPhotos = () => {
  const { register, watch } = useForm();
  const { roomPk } = useParams();
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
            <VStack spacing={5} mt={10}>
              <FormControl>
                <Input {...register('file')} type="file" accept="image/*" />
              </FormControl>
              <Button w="full" colorScheme={'red'}>
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