import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name of task is required')
    .min(3, 'Name must be at least 3 characters')
    .max(20, 'Name must not exceed 20 characters'),
  info: Yup.string()
    .required('Description of task is required')
    .min(3, 'Description must be at least 3 characters')
    .max(40, 'Description must not exceed 40 characters'),
});
