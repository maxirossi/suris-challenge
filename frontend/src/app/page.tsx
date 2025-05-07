'use client'

import { Container, Typography, Button, Box } from '@mui/material'

export default function Home() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome
        </Typography>
        <Button variant="contained" color="primary">
          Probar conexión
        </Button>
      </Box>
    </Container>
  )
}
