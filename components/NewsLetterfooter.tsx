'use client'
import React, { useState } from 'react'
import { Box, Container, Typography, Button, TextField } from '@mui/material'
import Heading from './Heading'

const NewsLetterfooter = () => {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e:any) => {
    e.preventDefault()
    setEmail('') // Clear input after subscribing
  }

  return (
    <Box component='section' sx={{ p: 3 }}>
      <Container maxWidth='sm' sx={{ pb: 5 }}>
        <Box textAlign='center' mb={3}>
          <div className='mx-auto'>
            <h2
              className='
        text-3xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold
        bg-gradient-to-r from-black via-[#ea580c] to-[#ea580c]
        bg-clip-text text-transparent
      '
            >
              Newsletter Sign Up
            </h2>
          </div>
        </Box>

        <Box
          component='form'
          onSubmit={handleSubscribe}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' }, // Responsive layout for smaller screens
            gap: 0, // Remove space between input and button
            borderRadius: 2,
            p: 1
          }}
        >
          {/* Email Input Field */}
          <TextField
            label='Your email address'
            name='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder='email@example.com'
            sx={{
              flex: 1, // Take remaining space
              borderRadius: '20px 0 0 20px', // Rounded border on left side only
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px 0 0 20px', // Rounded border on left side only
                '& fieldset': {
                  borderColor: '#e0e0e0'
                },
                '&:hover fieldset': {
                  borderColor: '#f37321'
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#f37321'
                }
              }
            }}
          />

          {/* Subscribe Button */}
          <Button
            type='submit'
            variant='contained'
            color='warning'
            sx={{
              backgroundColor: '#f37321 !important',
              color: 'white',
              padding: '8px 20px',
              borderRadius: '0 20px 20px 0', // Rounded border on right side only
              '&:hover': {
                color: 'black',
                backgroundColor: '#d8611f'
                
              }
            }}
          >
            Subscribe
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default NewsLetterfooter
