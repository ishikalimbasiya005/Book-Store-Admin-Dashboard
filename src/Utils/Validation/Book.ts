import * as Yup from 'yup';

export const bookValidationSchema = Yup.object().shape({
  title: Yup.string().trim().required('Title is required'),
  author: Yup.string().trim().required('Author is required'),
  price: Yup.number().typeError('Enter a valid price').min(0, 'Price must be 0 or greater').required('Price is required'),
  stock: Yup.number().typeError('Enter a valid stock').integer('Stock must be an integer').min(0, 'Stock must be 0 or greater').required('Stock is required'),
  category: Yup.string().required('Category is required'),
  languages: Yup.array().of(Yup.string()).min(1, 'Select at least one language').required('Select at least one language'),
});
