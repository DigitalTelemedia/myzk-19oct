'use client'
import React, { useState } from 'react'
import { Box, Container, Typography, Button, TextField } from '@mui/material'
import Heading from './Heading'

const NewsLetterfooter = () => {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e:any) => {
    e.preventDefault()
    setEmail('') // Clear input after subscribing


  //   await sendEmail({
  //     to: userEmail, // User's email address (dynamically passed)
  //     subject: 'Welcome to Myzk Newsletter!', // Email subject
  //     text: `Hello ${userName}, Thank you for signing up for our newsletter!`, // Fallback plain-text email content
  //     html: `
  //     <html>
  //       <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
  //         <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; padding: 20px;">
  //           <tr>
  //             <td style="text-align: center; padding: 20px;">
  //               <h1 style="color: #333333;">Welcome to Myzk Newsletter!</h1>
  //               <p style="font-size: 16px; color: #555555;">We're excited to have you on board.</p>
  //             </td>
  //           </tr>
  //           <tr>
  //             <td style="padding: 20px; font-size: 16px; color: #333333;">
  //               <p>Hi ${userName},</p>
  //               <p>Thank you for subscribing to our newsletter. Stay tuned for the latest updates, offers, and news from Myzk!</p>
  //               <p style="font-size: 14px; color: #888888;">If you have any questions, feel free to <a href="mailto:support@myzk.in" style="color: #4CAF50; text-decoration: none;">contact us</a>.</p>
  //             </td>
  //           </tr>
  //           <tr>
  //             <td style="padding: 20px; text-align: center;">
  //               <a href="https://myzk.in" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #4CAF50; border-radius: 5px; text-decoration: none;">Visit Myzk Website</a>
  //             </td>
  //           </tr>
  //           <tr>
  //             <td style="padding: 20px; text-align: center; font-size: 12px; color: #888888;">
  //               <p>You are receiving this email because you signed up for the Myzk newsletter.</p>
  //               <p>If you wish to unsubscribe, <a href="https://myzk.in/unsubscribe" style="color: #4CAF50; text-decoration: none;">click here</a>.</p>
  //             </td>
  //           </tr>
  //         </table>
  //       </body>
  //     </html>`
  // });
  
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
