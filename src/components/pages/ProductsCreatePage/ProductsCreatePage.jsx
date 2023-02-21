import {
  Breadcrumbs,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import Link from '@mui/material/Link';
import { Box, Container } from '@mui/system';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AdminRoute, APIRoute } from '../../../const';

function ProductsCreatePage() {
  const [tags, setTags] = useState([]);
  const [tagIDs, setTagIDs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryID, setCategoryID] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);
  const [prescriptionID, setPrescriptionID] = useState("");

  useEffect(() => {
    axios.get(APIRoute.TAGS)
      .then(({ data }) => setTags(data))
      .catch(({ response }) => console.log(response.data.error));

    axios.get(APIRoute.CATEGORIES)
      .then(({ data }) => {
        setCategories(data);
        setCategoryID(data[0].id)
      })
      .catch(({ response }) => console.log(response.data.error));

    axios.get(APIRoute.PRESCRIPTIONS)
      .then(({ data }) => {
        setPrescriptions(data);
        setPrescriptionID(data[0].id);
      })
      .catch(({ response }) => console.log(response.data.error));
  }, []);

  return (
    <>
      <Typography component="h1" variant="h4">Все препараты</Typography>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">Сайт</Link>

        <Link underline="hover" color="inherit">Админ панель</Link>

        <Link underline="hover" color="inherit" href={AdminRoute.PRODUCTS}>Препараты</Link>

        <Typography color="text.primary">Добавление</Typography>
      </Breadcrumbs>

      <Container maxWidth="lg" sx={{ ml: 0 }}>
        <Box
          component="form"
          sx={{
            mt: 4,
            p: 4,
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                id="title"
                fullWidth
                label="Название препарата"
                name="title"
                required
              />
            </Grid>

            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="tag">Теги*</InputLabel>
                <Select
                  labelId="tag"
                  id="tags"
                  value={tagIDs}
                  label="Теги*"
                  name="tag_id"
                  onChange={({ target }) => setTagIDs(target.value)}
                  multiple
                  required
                >
                  {tags.map(({ id, title }) => (
                    <MenuItem key={id} value={id}>{title}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="category">Направление*</InputLabel>
                <Select
                  labelId="category"
                  id="categories"
                  value={categoryID}
                  label="Направление*"
                  name="category_id"
                  onChange={({ target }) => setCategoryID(target.value)}
                  required
                >
                  {categories.map(({ id, title }) => (
                    <MenuItem key={id} value={id}>{title}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={2}>
              <FormControl fullWidth>
                <InputLabel id="prescription">Рецептурность*</InputLabel>
                <Select
                  labelId="prescription"
                  id="prescriptions"
                  value={prescriptionID}
                  label="Рецептурность*"
                  name="prescription_id"
                  onChange={({ target }) => setPrescriptionID(target.value)}
                  required
                >
                  {prescriptions.map(({ id, title }) => (
                    <MenuItem key={id} value={id}>{title}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default ProductsCreatePage;
