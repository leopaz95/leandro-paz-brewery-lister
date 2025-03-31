import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth='md' sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant='h1' color='primary' sx={{ fontWeight: 'bold' }}>
        404
      </Typography>
      <Typography variant='h5' sx={{ mb: 2 }}>
        Oops! The page you're looking for doesn't exist.
      </Typography>

      <Button variant='contained' color='primary' onClick={() => navigate('/')}>
        Go Back Home
      </Button>
    </Container>
  );
}
