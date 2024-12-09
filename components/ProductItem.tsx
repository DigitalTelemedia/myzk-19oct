import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import ProductItemRating from './ProductItemRating'

// MUI Components
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  IconButton,
  CardMedia
} from '@mui/material'
import { Favorite, ShoppingCart, Visibility } from '@mui/icons-material'
import AddToWishlistBtn from './AddToWishlistBtn'
import AddToWishlistIcon from './AddToWishlistIcon'
import AddToCartIcon from './AddToCartIcon'

const ProductItem = ({
  product,
  color
}: {
  product: Product
  color: string
}) => {
  return (
    <>
      <Box
        sx={{
          marginTop: 5,
          borderRadius: 3,
          marginLeft: 1,
          marginRight: 1,
          boxShadow: 2
        }}
      >
          <Card sx={{ maxWidth: '100%', position: 'relative' }}>
        {/* <Link href={`/support`} passHref> */}
        <Link href={`/product/${product.slug}`} passHref>
            {/* Primary product image */}
            <Box sx={{ position: 'relative' }}>
              <CardMedia
                component='img'
                height='300'
                // image="/WATER TANK ALARM/1.webp"
                image={
                  product.mainImage
                    ? `/${product.mainImage}`
                    : '/product_placeholder.jpg'
                }
                alt='not found'
                sx={{ objectFit: 'cover' }}
              />
              {/* Hover image */}
              <CardMedia
                component='img'
                height='300'
                image={
                  product.alternateImage1
                    ? `/${product.alternateImage1}`
                    : '/product_placeholder.jpg'
                }
                alt='Secondary Image 1'
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  '&:hover': {
                    opacity: 1
                  }
                }}
              />
            </Box>
            </Link>

            {/* Icons overlay */}

            <CardContent
              sx={{
                backgroundColor: '#eee7f2'
              }}
            >
              <Link href={`/product/${product.slug}`} passHref>
                <Typography
                  variant='body1'
                  component='a'
                  sx={{
                    textDecoration: 'none',
                    color: 'black',
                    textAlign: 'center',
                    fontWeight: 'bold'
                  }}
                >
                  {product.title}
                </Typography>
              </Link>

              {/* Flex container for price and icons */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between', // Space between price and icons
                  alignItems: 'center' // Vertically align them
                }}
              >
                {/* Price Section */}
                <Box>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    component='del'
                    sx={{ marginRight: 2 }}
                  >
                    ₹{product.price}
                  </Typography>
                  <Typography
                    variant='body1'
                    color='textPrimary'
                    component='span'
                    >
                    ₹{product.salePrice}
                  </Typography>
                </Box>

                {/* Icons Section */}
                <Box>
                  {/* add here wish */}
                  <IconButton
                    aria-label='add to wishlist'
                    sx={{
                      backgroundColor: '#f37321',
                      color: 'black',
                      borderRadius: '50%',
                      '&:hover': {
                        color: 'white',
                        backgroundColor: 'black'
                      },
                      mr: 1 // Margin-right for spacing between icons
                    }}
                  >
                    {/* <Favorite    /> */}
                    <AddToWishlistIcon product={product} slug={product.slug} />
                  </IconButton>

                  <IconButton
                    aria-label='add to cart'
                    sx={{
                      backgroundColor: '#f37321',
                      color: 'black',
                      borderRadius: '50%',
                      '&:hover': {
                        color: 'white',
                        backgroundColor: 'black'
                      }
                    }}
                  >
                    <AddToCartIcon    quantityCount={1}
            product={product}/>
                    {/* <ShoppingCart /> */}
                  </IconButton>
                </Box>
              </Box>
            </CardContent>

            {/* Product details */}
          </Card>
      </Box>
    </>
  )
}

export default ProductItem
