import {
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
  Grid,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useBreweries, useBreweriesMetadata } from '../api/queries';
import { Brewery } from '../types/brewery';

export default function BreweriesPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState<'name' | 'city'>('name');
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc');
  const [searchNameTerm, setSearchNameTerm] = useState('');
  const [searchStateTerm, setSearchStateTerm] = useState('');
  const [debouncedFilterName, setDebouncedFilterName] = useState<string>('');
  const [debouncedFilterState, setDebouncedFilterState] = useState<string>('');

  const { data: metadata, isLoading: isLoadingMetadata } =
    useBreweriesMetadata();
  const {
    data: breweries,
    isLoading: isLoadingBreweries,
    error,
  } = useBreweries({
    page: page + 1,
    rowsPerPage,
    sort: `${orderBy}:${orderDirection}`,
    searchByName: debouncedFilterName,
    searchByState: debouncedFilterState,
  });

  const isLoading = isLoadingBreweries || isLoadingMetadata;

  useEffect(() => {
    const handlerName = setTimeout(() => {
      setDebouncedFilterName(searchNameTerm);
      setPage(0);
    }, 900);

    return () => {
      clearTimeout(handlerName);
    };
  }, [searchNameTerm]);

  useEffect(() => {
    const handlerState = setTimeout(() => {
      setDebouncedFilterState(searchStateTerm);
      setPage(0);
    }, 900);

    return () => {
      clearTimeout(handlerState);
    };
  }, [searchStateTerm]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (property: 'name' | 'city') => {
    const isAsc = orderBy === property && orderDirection === 'asc';
    setOrderBy(property);
    setOrderDirection(isAsc ? 'desc' : 'asc');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <Typography variant='h4' my={2}>
        List of Breweries
      </Typography>
      {error ? (
        <Typography variant='h4' textAlign='center' my={4} color='error'>
          {error.message || ' Error geting breweries.'}
        </Typography>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ maxWidth: 900, mt: 4, paddingTop: 1 }}
        >
          <Grid container spacing={{ xs: 1, md: 2 }} mb={2}>
            <Grid size={{ md: 6, xs: 12 }}>
              <TextField
                label='Search by Name'
                fullWidth
                value={searchNameTerm}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchNameTerm(event.target.value)
                }
                sx={{ mb: 2, border: 'none' }}
              />
            </Grid>
            <Grid size={{ md: 6, xs: 12 }}>
              <TextField
                label='Search by State'
                fullWidth
                value={searchStateTerm}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchStateTerm(event.target.value)
                }
                sx={{ mb: 2, border: 'none' }}
              />
            </Grid>
          </Grid>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? orderDirection : 'asc'}
                    onClick={() => handleSort('name')}
                  >
                    <strong>Name</strong>
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'city'}
                    direction={orderBy === 'city' ? orderDirection : 'asc'}
                    onClick={() => handleSort('city')}
                  >
                    <strong>City</strong>
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <strong>State</strong>
                </TableCell>
                <TableCell>
                  <strong>Website</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading
                ? Array.from({ length: 4 }).map((_, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {Array.from({ length: 4 }).map((_, colIndex) => (
                        <TableCell key={colIndex} align='center'>
                          <Skeleton
                            variant='rectangular'
                            width={180}
                            height={15}
                            sx={{ backgroundColor: 'lightgray' }}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : breweries?.map((brewery: Brewery) => (
                    <TableRow key={brewery.id}>
                      <TableCell>{brewery.name}</TableCell>
                      <TableCell>{brewery.city}</TableCell>
                      <TableCell>{brewery.state}</TableCell>
                      <TableCell>
                        {brewery.website_url ? (
                          <a
                            href={brewery.website_url}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            {brewery.website_url}
                          </a>
                        ) : (
                          'N/A'
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={metadata?.by_type.micro || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
    </Box>
  );
}
