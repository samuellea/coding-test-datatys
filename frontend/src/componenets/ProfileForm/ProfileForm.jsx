import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import styles from './index.module.css';

function ProfileForm({ onSubmit, handleCancel, defaultValues }) {
  console.log(defaultValues);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues });

  React.useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles['form-container']}
    >
      <div>
        <label htmlFor="firstname">First Name</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          className={errors.firstname ? styles.error : ''}
          {...register('firstname', { required: 'First name is required' })}
        />
        {errors.firstname && (
          <p className={styles['error-message']}>{errors.firstname.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="lastname">Last Name</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          className={errors.lastname ? styles.error : ''}
          {...register('lastname', { required: 'Last name is required' })}
        />
        {errors.lastname && (
          <p className={styles['error-message']}>{errors.lastname.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          name="country"
          className={errors.country ? styles.error : ''}
          {...register('country', { required: 'Country is required' })}
        />
        {errors.country && (
          <p className={styles['error-message']}>{errors.country.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          className={errors.city ? styles.error : ''}
          {...register('city', { required: 'City is required' })}
        />
        {errors.city && (
          <p className={styles['error-message']}>{errors.city.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className={errors.email ? styles.error : ''}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && (
          <p className={styles['error-message']}>{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phonenumber">Phone Number</label>
        <input
          type="tel"
          id="phonenumber"
          name="phonenumber"
          className={errors.phonenumber ? styles.error : ''}
          {...register('phonenumber', {
            required: 'Phone number is required',
            pattern: {
              value: /^\+?[1-9]\d{1,14}$/,
              message:
                'Invalid format (use international format, e.g., +123456789)',
            },
          })}
        />
        {errors.phonenumber && (
          <p className={styles['error-message']}>
            {errors.phonenumber.message}
          </p>
        )}
      </div>
      <button type="button" onClick={handleCancel} className={styles.cancel}>
        Cancel
      </button>

      <button type="submit" className={styles.submit}>
        Submit
      </button>
    </form>
  );
}

ProfileForm.defaultProps = {
  defaultValues: {
    firstname: '',
    lastname: '',
    country: '',
    city: '',
    email: '',
    phonenumber: '',
  },
  handleCancel: () => {},
};

ProfileForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  defaultValues: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    country: PropTypes.string,
    city: PropTypes.string,
    email: PropTypes.string,
    phonenumber: PropTypes.string,
  }),
  handleCancel: PropTypes.func,
};

export default ProfileForm;
