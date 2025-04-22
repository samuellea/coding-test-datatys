import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import styles from './ProfileForm.module.css';

function ProfileForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles['form-container']}
    >
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          className={errors.firstName ? styles.error : ''}
          {...register('firstName', { required: 'First name is required' })}
        />
        {errors.firstName && (
          <p className={styles['error-message']}>{errors.firstName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          className={errors.lastName ? styles.error : ''}
          {...register('lastName', { required: 'Last name is required' })}
        />
        {errors.lastName && (
          <p className={styles['error-message']}>{errors.lastName.message}</p>
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
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          className={errors.phoneNumber ? styles.error : ''}
          {...register('phoneNumber', {
            required: 'Phone number is required',
            pattern: {
              value: /^\+?[1-9]\d{1,14}$/,
              message:
                'Invalid format (use international format, e.g., +123456789)',
            },
          })}
        />
        {errors.phoneNumber && (
          <p className={styles['error-message']}>
            {errors.phoneNumber.message}
          </p>
        )}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

ProfileForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ProfileForm;
