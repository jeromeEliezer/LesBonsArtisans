import { useAppSelector } from '../../store/store'
import { Container, Grid } from '@mui/material/'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
  const { articles } = useAppSelector(state => state.article)
  return (
    <Container>
      <Grid>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
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
              {articles && articles.map((article) => (
                <StyledTableRow key={article._id}>
                  <StyledTableCell component="th" scope="row">
                    {article.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{article.type}</StyledTableCell>
                  <StyledTableCell align="center">{article.price}</StyledTableCell>
                  <StyledTableCell align="center">{article.rating}</StyledTableCell>
                  <StyledTableCell align="center">{article.warranty_years}</StyledTableCell>
                  <StyledTableCell align="center">{article.available ? "Yes" : "No"}</StyledTableCell>
                  <StyledTableCell align="center"><button>Delete</button> <button>Update</button></StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Container >
  )
}

