// "use client"
// import { useState } from 'react';
// import axios from 'axios';
// import { TextField, Button, Snackbar } from '@mui/material';
// import ENDPOINT from "../config/appConfig"
// const WarrantyRegistration = () => {
//   const [email, setEmail] = useState('');
//   const [orderNumber, setOrderNumber] = useState('');
//   const [open, setOpen] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${ENDPOINT.BASE_URL}/api/warranties`, {
//         email,
//         orderNumber,
//       });
//       setMessage('Warranty issued successfully!');
//       setOpen(true);
//       setEmail('');
//       setOrderNumber('');
//     } catch (error: any) {
//       setMessage(error.response?.data?.message || 'An error occurred.');
//       setOpen(true);
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Email"
//           type="email"
//           value={email}
//           required
//           onChange={(e) => setEmail(e.target.value)}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Order Number"
//           type="text"
//           value={orderNumber}
//           required
//           onChange={(e) => setOrderNumber(e.target.value)}
//           fullWidth
//           margin="normal"
//         />
//         <Button type="submit" variant="contained" color="primary">
//           Submit Warranty
//         </Button>
//       </form>
//       <Snackbar
//         open={open}
//         autoHideDuration={6000}
//         onClose={() => setOpen(false)}
//         message={message}
//       />
//     </>
//   );
// };

// export default WarrantyRegistration;

'use client'
import { useState } from 'react'
import axios from 'axios'
import { Box, Typography, TextField, Button, Snackbar } from '@mui/material'
// import ENDPOINT from "../config/appConfig";
import ENDPOINT from '@/config/appConfig'

import toast from 'react-hot-toast'

const WarrantyRegistration = () => {
  const [formData, setFormData] = useState({
    email: '',
    orderNumber: ''
  })
  const [message, setMessage] = useState('') // For both success and error messages
  const [openSnackbar, setOpenSnackbar] = useState(false) // Snackbar visibility

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/warranties`,
        // `${ENDPOINT.BASE_URL}/api/warranties`,
        formData
      )
      toast.success('Warranty issued successfully!')
      // setMessage('Warranty issued successfully!');
      setFormData({ email: '', orderNumber: '' }) // Reset form
    } catch (error: any) {
      toast.error(error?.response?.data?.error)

      setMessage(error?.response?.data?.error || 'An error occurred.')
    }
    setOpenSnackbar(true) // Show message after submission
  }

  return (
    <>
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 600,
          margin: '0 auto',
          padding: '50px',
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
          Register Warranty
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', border: 'none' }}>
          <TextField
            label='Email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
            variant='outlined'
            sx={{ marginBottom: '1rem' }}
            fullWidth
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
            fullWidth
          />
        </Box>

        <Box
          sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}
        >
          <Button
            type='submit'
            variant='contained'
            sx={{
              padding: '0.5rem 0.8rem',
              backgroundColor: '#f37321 !important',
              color: 'black',
              fontWeight: 'bold',
              '&:hover': {
                color: 'white'
              }
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={message}
      />
    </>
  )
}

export default WarrantyRegistration
