import React from 'react';
import { useFormik } from 'formik';
import { User } from '../../types/Users';

export interface EditProfileProps {
  initialValues: User;
  onSubmit: (values: User) => void;
}

export const EditProfile: React.FC<EditProfileProps> = ({
  initialValues,
  onSubmit
}) => {
  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      onSubmit(values);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <input
          type="text"
          id="name"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}
      </div>

      <div>
        <input
          type="text"
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
      </div>

      {/* <div>
        <label htmlFor="address">Endereço:</label>
        <input
          type="text"
          id="address"
          name="address"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address}
        />
        {formik.touched.address && formik.errors.address ? (
          <div>{formik.errors.address}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="public_place">Logradouro:</label>
        <input
          type="text"
          id="public_place"
          name="public_place"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.public_place}
        />
        {formik.touched.public_place && formik.errors.public_place ? (
          <div>{formik.errors.public_place}</div>
        ) : null}
      </div> */}

      {/* <div>
        <label htmlFor="number">Número:</label>
        <input
          type="text"
          id="number"
          name="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.number}
        />
        {formik.touched.number && formik.errors.number ? (
          <div>{formik.errors.number}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="zip_code">CEP:</label>
        <input
          type="text"
          id="zip_code"
          name="zip_code"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.zip_code}
        />
        {formik.touched.zip_code && formik.errors.zip_code ? (
          <div>{formik.errors.zip_code}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="telephone">Telefone:</label>
        <input
          type="text"
          id="telephone"
          name="telephone"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.telephone}
        />
        {formik.touched.telephone && formik.errors.telephone ? (
          <div>{formik.errors.telephone}</div>
        ) : null}
      </div> */}

      <button type="submit">Salvar</button>
    </form>
  );
};
