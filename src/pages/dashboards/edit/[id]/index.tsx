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
import { getDashboardById, updateDashboardById } from 'apiSdk/dashboards';
import { dashboardValidationSchema } from 'validationSchema/dashboards';
import { DashboardInterface } from 'interfaces/dashboard';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function DashboardEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<DashboardInterface>(
    () => (id ? `/dashboards/${id}` : null),
    () => getDashboardById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: DashboardInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateDashboardById(id, values);
      mutate(updated);
      resetForm();
      router.push('/dashboards');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<DashboardInterface>({
    initialValues: data,
    validationSchema: dashboardValidationSchema,
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
              label: 'Dashboards',
              link: '/dashboards',
            },
            {
              label: 'Update Dashboard',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Dashboard
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Total Sales"
            formControlProps={{
              id: 'total_sales',
              isInvalid: !!formik.errors?.total_sales,
            }}
            name="total_sales"
            error={formik.errors?.total_sales}
            value={formik.values?.total_sales}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('total_sales', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Total Orders"
            formControlProps={{
              id: 'total_orders',
              isInvalid: !!formik.errors?.total_orders,
            }}
            name="total_orders"
            error={formik.errors?.total_orders}
            value={formik.values?.total_orders}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('total_orders', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Total Offers"
            formControlProps={{
              id: 'total_offers',
              isInvalid: !!formik.errors?.total_offers,
            }}
            name="total_offers"
            error={formik.errors?.total_offers}
            value={formik.values?.total_offers}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('total_offers', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Total Inventory"
            formControlProps={{
              id: 'total_inventory',
              isInvalid: !!formik.errors?.total_inventory,
            }}
            name="total_inventory"
            error={formik.errors?.total_inventory}
            value={formik.values?.total_inventory}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('total_inventory', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Total Customers"
            formControlProps={{
              id: 'total_customers',
              isInvalid: !!formik.errors?.total_customers,
            }}
            name="total_customers"
            error={formik.errors?.total_customers}
            value={formik.values?.total_customers}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('total_customers', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'business_owner_id'}
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
              onClick={() => router.push('/dashboards')}
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
    entity: 'dashboard',
    operation: AccessOperationEnum.UPDATE,
  }),
)(DashboardEditPage);
