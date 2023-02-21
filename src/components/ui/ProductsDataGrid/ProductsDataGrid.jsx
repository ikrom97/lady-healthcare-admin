import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AdminRoute, APIRoute, dataGridLocalText } from '../../../const';
import { removeTags } from '../../../util';
import parse from 'html-react-parser';
import { Button } from '@mui/material';
import { generatePath } from 'react-router-dom';
import { Stack } from '@mui/system';
import { toast } from 'react-toastify';

function ProductsDataGrid() {
  const [rows, setRows] = useState([]);
  const [selection, setSelection] = useState([]);

  const handleDeleteSelectedButtonClick = () => {
    const isConfirmed = window.confirm(
      `Вы уверены что хотите безвозвратно удалить выбранные препараты? \nВыбрано ${selection.length}`
    );

    isConfirmed && axios.post(APIRoute.PRODUCTS, { IDs: selection })
      .then(({ data }) => toast.success(data.message))
      .catch(({ response }) => toast.error(response.data.message));
  };

  const handleDeleteButtonClick = (id, title) => () => {
    const isConfirmed = window.confirm(
      `Вы уверены что хотите безвозвратно удалить ${title}?`
    );

    isConfirmed && axios.post(APIRoute.PRODUCTS, { IDs: id })
      .then(({ data }) => toast.success(data.message))
      .catch(({ response }) => toast.error(response.data.message));
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'title',
      headerName: 'Название',
      width: 200,
    },
    {
      field: 'description',
      headerName: 'Описание',
      width: 460,
    },
    {
      field: 'category',
      headerName: 'Направления',
      width: 200,
    },
    {
      field: 'prescription',
      headerName: 'Рецептурность',
      width: 120,
    },
    {
      field: 'views',
      headerName: 'Посещаемость',
      type: 'number',
      width: 120,
      align: 'left',
    },
    {
      field: 'actions',
      headerName: 'Действия',
      width: 250,
      renderCell: (params) => (
        <Stack spacing={1} direction="row" alignItems="center">
          <Button
            href={generatePath(AdminRoute.PRODUCTS_SELECTED, { id: params.row.id })}
            variant="contained"
            color="warning"
            size="small"
          >
            Редактировать
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={handleDeleteButtonClick(params.row.id, params.row.title)}
          >
            Удалить
          </Button>
        </Stack>
      ),
    },
  ];

  useEffect(() => {
    axios.get(APIRoute.PRODUCTS)
      .then(({ data }) => {
        setRows(data.map(({ id, title, description, category, prescription, views }) => (
          {
            id,
            title,
            description: parse(removeTags(description)),
            category: category.title,
            prescription: prescription.title,
            views,
          }
        )));
      })
      .catch(({response}) => toast.error(response.data.message));
  }, []);

  return (
    <Box sx={{ height: 631, width: '100%', mt: 2 }}>
      <Stack spacing={1} direction="row" justifyContent="flex-end" sx={{ mb: 1 }}>
        <Button
          variant="contained"
          color="success"
          href={AdminRoute.PRODUCTS_CREATE}
        >
          Добавить новый препарат
        </Button>

        {selection.length > 0 &&
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteSelectedButtonClick}
          >
            Удалить выбранные препараты ({selection.length})
          </Button>
        }
      </Stack>

      <DataGrid
        sx={{ backgroundColor: 'white' }}
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        onSelectionModelChange={(newSelectionModel) => setSelection(newSelectionModel)}
        localeText={dataGridLocalText}
      />
    </Box>
  );
}

export default ProductsDataGrid;
