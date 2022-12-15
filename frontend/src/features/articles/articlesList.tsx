import React from "react";
import { useNavigate } from "react-router-dom";
import { tableCellClasses } from '@mui/material/TableCell';
import {
  Button, Container, Grid,
  TableBody, Table, TableRow,
  TableCell, TableContainer,
  Paper, styled, TableHead,
} from '@mui/material/';
import AddIcon from '@mui/icons-material/Add';

import { useAppDispatch, useAppSelector } from '../../store/store'
import { deleteArticle, setSingleArticle } from './articleSlice';
import { Article } from '../../interfaces/article';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,

  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const ArticlesList = () => {
  const { singleArticle, articles } = useAppSelector(state => state.article);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAdd = () => {
    console.log(singleArticle);
    dispatch(setSingleArticle(null));
    navigate("/article");
  };

  const handleUpdate = (data: Article) => {
    dispatch(setSingleArticle(data));
    navigate("/article");
  };

  const handleDelete = (article: Article) => {
    if (window.confirm('Are you sure you want to remove this article ?')) {
      dispatch(deleteArticle(article));
    }
  };

  return (
    <Container>
      <h3 style={{ textAlign: "center" }}>List of articles</h3>
      <Button
        onClick={() => {handleAdd()}}
        startIcon={<AddIcon />}>
        Add article
      </Button>
      <Grid>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 150 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">name</StyledTableCell>
                <StyledTableCell align="center">type</StyledTableCell>
                <StyledTableCell align="center">price</StyledTableCell>
                <StyledTableCell align="center">rating</StyledTableCell>
                <StyledTableCell align="center">warranty_years</StyledTableCell>
                <StyledTableCell align="center">available</StyledTableCell>
                <StyledTableCell align="center">Actions (update, delete)</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {articles && articles.map((article: Article) => (
                <StyledTableRow key={article._id}>
                  <StyledTableCell component="th" scope="row">
                    {article.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{article.type}</StyledTableCell>
                  <StyledTableCell align="center">{article.price}</StyledTableCell>
                  <StyledTableCell align="center">{article.rating}</StyledTableCell>
                  <StyledTableCell align="center">{article.warranty_years}</StyledTableCell>
                  <StyledTableCell align="center">{article.available ? "Yes" : "No"}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Button color="error" onClick={() => handleDelete(article)}>Delete</Button>
                    <Button onClick={() => handleUpdate(article)}>Update</Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Container >
  )
}

