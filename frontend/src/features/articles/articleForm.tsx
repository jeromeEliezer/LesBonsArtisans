import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, TextField, Box, Paper, MenuItem } from '@mui/material/';
import { Stack } from '@mui/system';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { ArticleFormType } from '../../interfaces/article';
import { createArticle, editArticle, setSingleArticle } from './articleSlice';

export const ArticleForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ArticleFormType>({
  });

  let navigate = useNavigate();
  const { singleArticle } = useAppSelector(state => state.article);
  const dispatch = useAppDispatch();

  const validation = {
    name: {
      required: 'Please enter a name',
      maxLength: { value: 45, message: 'this name is too trop long' },
    },
    type: {
      required: 'Please enter a type',
      maxLength: { value: 45, message: 'this type is too trop long' },
    },
    price: {
      required: 'Please enter a price',
      pattern: { value: /[+]?([0-9]+([.][0-9]*)?|[.][0-9]+)/, message: 'only number' },
    },
    rating: {
      required: 'Please enter a rating',
      pattern: { value: /[+]?([0-9]+([.][0-9]*)?|[.][0-9]+)/, message: 'only number' },
    },
    warranty_years: {
      required: 'Please enter the number of years',

    },
    available: {
      required: 'Please indicate availability',
    },
  }

  const onSubmit: SubmitHandler<ArticleFormType> = (data) => {
    if (singleArticle) {
      dispatch(setSingleArticle({
        _id: singleArticle._id,
        name: data.name,
        type: data.type,
        price: Number(data.price),
        rating: Number(data.price),
        warranty_years: Number(data.price),
      }));
      dispatch(editArticle(singleArticle));
    } else {
      let newArticle = {
        name: data.name,
        type: data.type,
        price: Number(data.price),
        rating: Number(data.price),
        warranty_years: Number(data.price),
        available: Boolean(data.available)
      };
      dispatch(createArticle(newArticle))
    }
    navigate('/')
  }
  const availability = [
    {
      value: "No",
      label: 'No',
    },
    {
      value: "Yes",
      label: 'Yes',
    },
  ];
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: 'center'
      }}>
      <Box
        sx={{
          borderRadius: "1rem",
          m: 1,
          p: 3,
          width: '30ch',
          backgroundColor: "#1976d2",
        }}>
        <h3 className={"title"}>Article settings</h3>
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="outlined-helperText"
            label="Name"

            // defaultValue={singleArticle?.name}

            error={errors.name ? true : false}
            {...register('name', validation.name)}
            helperText={errors.name ? `${errors.name.message}` : "Name of article"}
          />
          <TextField
            id="outlined-helperText"
            label="Type"

            // defaultValue={singleArticle?.type}

            error={errors.type ? true : false}
            helperText={errors.type ? `${errors.type.message}` : "Type of article"}
            {...register('type', validation.type)}
          />
          <TextField
            id="outlined-helperText"
            label="Price"
            // defaultValue={singleArticle?.price}

            error={errors.price ? true : false}
            helperText={errors.price ? `${errors.price.message}` : "Price of article"}
            {...register('price', validation.price)}
          />
          <TextField
            id="outlined-helperText"
            label="Rating"
            
            // defaultValue={singleArticle?.rating}
            error={errors.rating ? true : false}
            helperText={errors.rating ? `${errors.rating.message}` : "Rating of article"}
            {...register('rating', validation.rating)}
          />
          <TextField
            type="number"
            id="outlined-helperText"
            label="Warranty_years"
            // defaultValue={"singleArticle?.warranty_years"}
            error={errors.warranty_years ? true : false}
            helperText={errors.warranty_years ? `${errors.warranty_years.message}` : "Number of years"}
            {...register('warranty_years', validation.warranty_years)}
          />
          <TextField
            id="outlined-select-currency"
            select
            required
            // label={singleArticle?.available ? "Yes" : "Select availability"}
            error={errors.available ? true : false}
            helperText={errors.available ? `${errors.available.message}` : "Availability of article"}
            {...register('available', validation.available)}
          >
            {availability.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Stack direction="row" spacing={8}>
            <Button color='info' onClick={() => navigate('/')}>Back</Button>
            <Button color='success' type="submit">Submit</Button>
          </Stack>
        </form>
      </Box>
    </Paper>
  )
}
