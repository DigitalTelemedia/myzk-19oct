'use client'
import { useState } from 'react'
// import ENDPOINT from "../config/appConfig";
import ENDPOINT from '@/config/appConfig'

import { Box, Typography, TextField, Button } from '@mui/material'

function SupportTicket () {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderNumber: '',
    description: ''
  })

  const [errorMessage, setErrorMessage] = useState('') // State for error messages
  const [successMessage, setSuccessMessage] = useState('') // State for success messages

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setErrorMessage('') // Reset error message on new submission
    setSuccessMessage('') // Reset success message on new submission

    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/support-ticket', {
    // const res = await fetch(ENDPOINT.BASE_URL + '/api/support-ticket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if (res.ok) {
      setSuccessMessage('Ticket submitted successfully!')
      setFormData({
        name: '',
        email: '',
        orderNumber: '',
        description: ''
      })
    } else {
      const errorData = await res.json()
      setErrorMessage(errorData.message || 'Error submitting the ticket') // Display server error if available
    }
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        margin: '0 auto',
        padding: '2rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        backgroundColor: '#ffffff',
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: '0 6px 25px rgba(0, 0, 0, 0.2)'
        }
      }}
    >
      <Typography
        variant='h5'
        align='center'
        sx={{ marginBottom: '1.5rem', fontWeight: 'bold', color: '#f37321' }}
      >
        Submit a Support Ticket
      </Typography>
      {successMessage && (
        <Typography variant='body1' color='green' align='center'>
          {successMessage}
        </Typography>
      )}
      {errorMessage && (
        <Typography variant='body1' color='red' align='center'>
          {errorMessage}
        </Typography>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', border: 'none' }}>
        <TextField
          label='Name'
          id='name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          required
          variant='outlined'
          sx={{ marginBottom: '1rem' }}
        />
        <TextField
          label='Email'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required
          variant='outlined'
          sx={{ marginBottom: '1rem' }}
        />
        <TextField
          label='Order Number'
          id='orderNumber'
          name='orderNumber'
          value={formData.orderNumber}
          onChange={handleChange}
          required
          variant='outlined'
          sx={{ marginBottom: '1rem' }}
        />
        <TextField
        placeholder='Describe your issue in ateast 20 word.'
          label='Description'
          id='description'
          name='description'
          value={formData.description}
          onChange={handleChange}
          required
          multiline
          minRows={4}
          variant='outlined'
          sx={{ marginBottom: '1rem' }}
        />
      </Box>
      
      <Box
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}
      >
        <Button
          type='submit'
          variant='contained'
          sx={{
            padding: '0.8rem',
            backgroundColor: '#f37321 !important',
            color: 'black',
            fontWeight: 'bold',
            '&:hover': {
              color: 'white'
            }
          }}
        >
          Submit Ticket
        </Button>
      </Box>
    </Box>
  )
}

export default SupportTicket
