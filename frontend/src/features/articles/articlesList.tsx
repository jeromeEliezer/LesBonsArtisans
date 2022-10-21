import { useAppSelector } from '../../store/store'
import { Container, Grid } from '@mui/material/'

export const ArticlesList = () => {
  const { articles } = useAppSelector(state => state.article)
  return (
    <Container >
      <Grid>
        <Grid container spacing={5}>
          {articles && articles.map(article => (
            <Grid item key={article._id} sx={{
              borderRadius:2,
              padding: 3,
              margin: 2,
              backgroundImage: 'linear-gradient(90deg, blue, green)',
              minHeight:50,
              minWidth:50
              }} xs={3}>
              <h4>{article.name}</h4>
              <h4>{article.price}</h4>
              <h4>{article.rating}</h4>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  )
}

