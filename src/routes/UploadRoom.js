import React from 'react';
import ProtectedPage from '../components/ProtectedPage';
import HostOnlyPage from '../components/HostOnlyPage';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { FaBed, FaMoneyBill, FaToilet } from 'react-icons/fa';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getAmenities, getCategories, uploadRoom } from '../api';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const UploadRoom = () => {
  const { register, handleSubmit } = useForm();
  const toast = useToast();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: uploadRoom,
    onSuccess: data => {
      toast({
        status: 'success',
        title: 'Room created',
        position: 'bottom-right',
      });
      navigate(`/rooms/${data.id}`);
    },
    onError: () => {},
  });
  const { data: amenities } = useQuery({
    queryKey: ['amenities'],
    queryFn: getAmenities,
  });
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
  const onSubmit = data => {
    mutation.mutate(data);
  };
  return (
    //  자동으로 children 으로 들어감
    <ProtectedPage>
      <HostOnlyPage>
        <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
          <Container>
            <Heading textAlign={'center'}>Upload Room</Heading>
            <VStack
              spacing={10}
              as={'form'}
              mt={5}
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  {...register('name', { required: true })}
                  required
                  type="text"
                />
                <FormHelperText>방의 이름을 작성하세요</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Country</FormLabel>
                <Input
                  {...register('country', { required: true })}
                  required
                  type="text"
                />
              </FormControl>
              <FormControl>
                <FormLabel>City</FormLabel>
                <Input
                  {...register('city', { required: true })}
                  required
                  type="text"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input
                  {...register('address', { required: true })}
                  required
                  type="text"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaMoneyBill />} />
                  <Input
                    {...register('price', { required: true })}
                    type="number"
                    min={0}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Rooms</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaBed />} />
                  <Input
                    {...register('rooms', { required: true })}
                    type="number"
                    min={0}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Toilets</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaToilet />} />
                  <Input
                    {...register('toilets', { required: true })}
                    type="number"
                    min={0}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea {...register('description', { required: true })} />
              </FormControl>
              <FormControl>
                <Checkbox {...register('pet_friendly', { required: true })}>
                  Pet friendly
                </Checkbox>
              </FormControl>
              <FormControl>
                <FormLabel>Kind</FormLabel>
                <Select
                  {...register('kind', { required: true })}
                  placeholder="Choose a kind"
                >
                  <option value={'entire_place'}>Entire Place</option>
                  <option value={'private_room'}>Private Room</option>
                  <option value={'shared_room'}>Shared Room</option>
                </Select>
                <FormHelperText>What kind of your rooms?</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select
                  {...register('category', { required: true })}
                  placeholder="Choose a kind"
                >
                  {categories?.map(category => (
                    <option key={category.pk} value={category.pk}>
                      {category.name}
                    </option>
                  ))}
                  {/* <option value={'entire_place'}>Entire Place</option>
                  <option value={'private_room'}>Private Room</option>
                  <option value={'shared_room'}>Shared Room</option> */}
                </Select>
                <FormHelperText>
                  What category describes your room?
                </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Amenities</FormLabel>
                <Grid templateColumns={'1fr 1fr'} gap={5}>
                  {amenities?.map(amenity => (
                    <Box key={amenity.pk}>
                      <Checkbox
                        value={amenity.pk}
                        {...register('amenities', { required: true })}
                        key={amenity.pk}
                      >
                        {amenity.name}
                      </Checkbox>
                      <FormHelperText>{amenity.description}</FormHelperText>
                    </Box>
                  ))}
                </Grid>
              </FormControl>
              {mutation.isError ? (
                <Text color={'red.500'}>Something went wrong</Text>
              ) : null}
              <Button
                type="submit"
                isLoading={mutation.isLoading}
                colorScheme="red"
                size={'lg'}
                w={'100%'}
              >
                Upload Room
              </Button>
            </VStack>
          </Container>
        </Box>
      </HostOnlyPage>
    </ProtectedPage>
  );
};

export default UploadRoom;

/*
name
country
*/
