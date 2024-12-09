"use client"
// import ENDPOINT from '@/config/appConfig';
import ENDPOINT from '@/config/appConfig';

import { Container, Grid, Typography, TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

// Move the Contact definition here
const Contact = () => (
  <>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 3,
        p:2,
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        '&:hover': {
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <i className="ti-home" style={{ fontSize: '2rem', color: 'hsl(23.43deg 89.74% 54.12%)', marginRight: '15px' }} />
      <div>
        <Typography variant="h6" sx={{ color: 'hsl(23.43deg 89.74% 54.12%)' }}>Address</Typography>
        <Typography variant="body1">E-169, E Block, Sector 63, Noida, Uttar Pradesh 201301</Typography>
      </div>
    </Box>

    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 3,
        p: 2,
        borderRadius: 2,
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        '&:hover': {
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <i className="ti-tablet" style={{ fontSize: '2rem', color: 'hsl(23.43deg 89.74% 54.12%)', marginRight: '15px' }} />
      <div>
        <Typography variant="h6" sx={{ color: 'hsl(23.43deg 89.74% 54.12%)' }}>Telephone</Typography>
        <Typography variant="body1">
          <a href="tel:+919958039775">+91 9958039775</a>, <a href="tel:+919650745556">+91 9650745556</a>
        </Typography>
      </div>
    </Box>

    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 3,
        p: 2,
        borderRadius: 2,
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        '&:hover': {
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <i className="ti-email" style={{ fontSize: '2rem', color: 'hsl(23.43deg 89.74% 54.12%)', marginRight: '15px' }} />
      <div>
        <Typography variant="h6" sx={{ color: 'hsl(23.43deg 89.74% 54.12%)' }}>Email Us</Typography>
        <Typography variant="body1">
          <a href="mailto:operations@myzk.in">operations@myzk.in</a>
        </Typography>
      </div>
    </Box>
  </>
);

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  
// {name: 'dsfd', email: 'fdsfsdfsdf@fsf.fdsf', subject: 'sdffdsfsdf', message: 'hgjh'}
  // const handleSubmit = async (e:any) => {
  //   e.preventDefault();
  //   console.log(formData);
  //   const url = `${ENDPOINT.BASE_URL}/api/contact`;
  //   const data = formData
  //   const response = await axios.post(url,data);
  //   toast.success(response.data.message);


  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    try {
  
      // Construct the URL for the contact form submission API
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/contact`;
      // const url = `${ENDPOINT.BASE_URL}/api/contact`;
      // Data to be sent in the request body
      const data = formData;
      // Make a POST request to the server
      const response = await axios.post(url, data);
      // Display a success message using a toast notification
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      toast.success(response.data.message);      
    } catch (error: any) {
      // Handle error and display a toast notification for failure
      toast.error(error.response?.data?.message || "Error...");
    }
  };
  

  return (
    <Container sx={{ py: 5 }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          fontWeight: 600,
          color: 'hsl(23.43deg 89.74% 54.12%)',
          mb: 3,
          textAlign: 'center',
        }}
      >
        Get in Touch
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              backgroundColor: '#fff',
              p: 3,
              borderRadius: 2,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              transition: 'box-shadow 0.3s ease',
              '&:hover': {
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Enter email address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Enter subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Enter your message"
                  name="message"
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} textAlign="center">
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    backgroundColor: '#f37321 !important',
                    color: 'white',
                    '&:hover': {
                      color: 'Black',
                    },
                  }}
                >
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Contact Information */}
        <Grid item xs={12} md={4}>
          <Contact />
        </Grid>
      </Grid>

      <Box mt={4}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m19!1m8!1m3!1d7004.450094540938!2d77.3867099!3d28.6230165!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x390ce5539e0d42b7%3A0x682b86960f5749cc!2sDigital%20Telemedia%20Technology%20Pvt.%20Ltd.%20E-169%20E%20Block%2C%20Sector%2063%20Noida%2C%20Hazratpur%20Wajidpur%2C%20Uttar%20Pradesh%20201301!3m2!1d28.623015199999998!2d77.3867281!5e0!3m2!1sen!2sin!4v1723628516193!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0, borderRadius: '8px' }}
        //   allowFullScreen="true"
          loading="lazy"
        ></iframe>
      </Box>
    </Container>
  );
}
export default  ContactUs