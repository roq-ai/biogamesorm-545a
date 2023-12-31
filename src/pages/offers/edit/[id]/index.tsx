import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getOfferById, updateOfferById } from 'apiSdk/offers';
import { offerValidationSchema } from 'validationSchema/offers';
import { OfferInterface } from 'interfaces/offer';
import { InventoryInterface } from 'interfaces/inventory';
import { UserInterface } from 'interfaces/user';
import { getInventories } from 'apiSdk/inventories';
import { getUsers } from 'apiSdk/users';

function OfferEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<OfferInterface>(
    () => (id ? `/offers/${id}` : null),
    () => getOfferById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: OfferInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateOfferById(id, values);
      mutate(updated);
      resetForm();
      router.push('/offers');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<OfferInterface>({
    initialValues: data,
    validationSchema: offerValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Offers',
              link: '/offers',
            },
            {
              label: 'Update Offer',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Offer
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="offer_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Offer Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.offer_date ? new Date(formik.values?.offer_date) : null}
              onChange={(value: Date) => formik.setFieldValue('offer_date', value)}
            />
          </FormControl>
          <FormControl id="expiry_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Expiry Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.expiry_date ? new Date(formik.values?.expiry_date) : null}
              onChange={(value: Date) => formik.setFieldValue('expiry_date', value)}
            />
          </FormControl>

          <NumberInput
            label="Discount Percentage"
            formControlProps={{
              id: 'discount_percentage',
              isInvalid: !!formik.errors?.discount_percentage,
            }}
            name="discount_percentage"
            error={formik.errors?.discount_percentage}
            value={formik.values?.discount_percentage}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('discount_percentage', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.description}
            label={'Description'}
            props={{
              name: 'description',
              placeholder: 'Description',
              value: formik.values?.description,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<InventoryInterface>
            formik={formik}
            name={'inventory_id'}
            label={'Select Inventory'}
            placeholder={'Select Inventory'}
            fetcher={getInventories}
            labelField={'product_name'}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'sales_manager_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/offers')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'offer',
    operation: AccessOperationEnum.UPDATE,
  }),
)(OfferEditPage);
