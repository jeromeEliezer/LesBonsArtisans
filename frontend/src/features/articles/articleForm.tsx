import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { Button } from '@mui/material/';

import { useAppSelector } from '../../store/store';
import { Article } from '../../interfaces/article';
import { Stack } from '@mui/system';
import { useNavigate } from 'react-router-dom';


export const ArticleForm = () => {
  let navigate = useNavigate();
  const { singleArticle } = useAppSelector(state => state.article);
  const [value, setValue] = React.useState<Article>();
  const onValueChange = (e: any) => setValue(e.target.value);
  const handleSubmit = () => console.log(value);
  const handleReset = () => {
    navigate('/')
  };
  return (
    <Box
      component="form"
      sx={{
        border: "solid black 1px",
        backgroundColor: "#1976d2",
        display: "flex",
        justifyContent: "center",
        alignItems:'center'
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl sx={{
        m: 1,
        width: '30ch',
        
      }} variant="outlined">
        <h3 className={"title"}>Article settings</h3>
        <form className={"form"} onChange={onValueChange} onSubmit={handleSubmit}>
          <TextField
            id="outlined-helperText"
            label="Name"
            defaultValue={singleArticle?.name}
            value={value?.name}
            helperText="Name of article"
          />
          <TextField
            id="outlined-helperText"
            label="Type"
            defaultValue={singleArticle?.type}
            helperText="Type of article"
            value={value?.type}
          />
          <TextField
            id="outlined-helperText"
            label="Price"
            defaultValue={singleArticle?.price}
            helperText="Only numbers"
            value={value?.price}
          />
          <TextField
            id="outlined-helperText"
            label="Rating"
            defaultValue={singleArticle?.rating}
            helperText="Number of rating"
            value={value?.rating}
          />
          <TextField
            id="outlined-helperText"
            label="Warranty_years"
            defaultValue={singleArticle?.warranty_years}
            helperText="Number of years"
            value={value?.warranty_years}
          />
          <TextField
            id="outlined-helperText"
            label="Name"
            defaultValue={singleArticle?.available}
            helperText="Some important text"
            value={value?.available}
          />
        <Stack direction="row" spacing={8}>
          <Button color='info' onClick={handleReset}>Back</Button>
          <Button color='success' type="submit" onClick={handleSubmit}>Submit</Button>
        </Stack>
        </form>
      </FormControl>
    </Box>
  )
}
