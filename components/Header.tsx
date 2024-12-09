'use client'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import HeaderTop from './HeaderTop'
import Image from 'next/image'
import Link from 'next/link'
import { FaBell, FaBars } from 'react-icons/fa6'

import CartElement from './CartElement'
import HeartElement from './HeartElement'
import { signOut, useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { useWishlistStore } from '@/app/_zustand/wishlistStore'
import ENDPOINT from '../config/appConfig'

// MUI Components
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Grid,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText
} from '@mui/material'

import CategoryMenu from './CategoryMenu'

type Category = {
  name: string;
};

type Product = {
  id: string;
  slug: string;
  title: string;
  mainImage: string;
  alternateImage1: string;
  alternateImage2: string;
  alternateImage3: string;
  alternateImage4: string;
  price: number;
  salePrice: number;
  rating: number;
  description: string;
  manufacturer: string;
  inStock: number;
  categoryId: string;
  testcol: string | null;
  warrantyDuration: string | null;
  category: Category;
};
const Header = () => {
  const { data: session } = useSession()
  const pathname = usePathname()
  const { setWishlist, wishQuantity } = useWishlistStore()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [showCategoryList, setShowCategoryList] = useState(false)
  const [categoryMenuList2, setCategoryMenuList2] = useState<Product[]>([])

  const handleLogout = () => {
    setTimeout(() => signOut({ callbackUrl: '/login' }), 1000)
    toast.success('Logout successful!')
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const getWishlistByUserId = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist/${id}`, {
      // const response = await fetch(`${ENDPOINT.BASE_URL}/api/wishlist/${id}`, {
        cache: 'no-store'
      })
      const wishlist = await response.json()
      const productArray = wishlist.map((item: any) => ({
        id: item?.product?.id,
        title: item?.product?.title,
        price: item?.product?.price,
        image: item?.product?.mainImage,
        slug: item?.product?.slug,
        stockAvailabillity: item?.product?.inStock
      }))
      setWishlist(productArray)
    } catch (error) {
      console.error('Error fetching wishlist:', error)
    }
  }

  const getUserByEmail = async () => {
    if (session?.user?.email) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/email/${session.user.email}`,
          // `${ENDPOINT.BASE_URL}/api/users/email/${session.user.email}`,
          { cache: 'no-store' }
        )
        const data = await response.json()
        getWishlistByUserId(data?.id)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }
  }

  useEffect(() => {
    getUserByEmail()
  }, [session?.user?.email])

  const handleMouseEnter = () => setShowCategoryList(true)
  const handleMouseLeave = () => setShowCategoryList(false)
  const handleProductSelection = () => setShowCategoryList(false)

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/categories/', { cache: 'no-store' })
    // fetch(ENDPOINT.BASE_URL + '/api/categories/', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => setCategoryMenuList2(data))
  }, [])

  const toggleDrawer = (open: boolean) => setDrawerOpen(open)

  const list = () => (
    <Box
      sx={{
        width: 250,
        backgroundColor: 'background.paper', // Optional, to make the background consistent
        zIndex: 1300 // Ensures it's above other elements (if needed)
      }}
      role='presentation'
      onClick={() => toggleDrawer(false)}
      onKeyDown={() => toggleDrawer(false)}
    >
      <List>
        <ListItem  component={Link} href='/'>
          <ListItemText primary='Home.' />
        </ListItem>
        <ListItem  component={Link} href='/shop/'>
          <ListItemText primary='Category' />
        </ListItem>
        <ListItem  component={Link} href='/shop/new-products'>
          <ListItemText primary='New Arrivals' />
        </ListItem>
        <ListItem  component={Link} href='/support'>
          <ListItemText primary='Support' />
        </ListItem>
       
      </List>
    </Box>
  )

  return (
    <AppBar position='static' color='default'>
      <HeaderTop />

      {!pathname.startsWith('/admin') ? (
        <>
          <Toolbar>
            <Grid
              container
              alignItems='center'
              justifyContent='space-between'
              padding={2}
            >
              <Grid
                item
                xs={12}
                md={2}
                sx={{
                  display: 'flex',
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}
              >
                <Link href='/' passHref>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <img
                      src='/myzk logo.png'
                      width={150}
                      height={50}
                      alt='Myzk logo'
                    />
                  </Box>
                </Link>
              </Grid>

              <Grid item display={{ xs: 'none', md: 'block' }}>
                <Box display='flex' alignItems='center'>
                  <Button
                    component={Link}
                    href='/'
                    color='inherit'
                    sx={{
                      fontSize: '14px',
                      padding: '5px 8px',
                      '&:hover': { borderBottom: '2px solid #ea580c' }
                    }}
                  >
                    Home
                  </Button>
                  <Box
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    sx={{
                      fontSize: '14px',
                      padding: '5px 8px'
                    }}
                  >
                    <Button color='inherit'>Category</Button>
                  </Box>
                  <Button
                    component={Link}
                    href='/shop/new-products'
                    color='inherit'
                    sx={{
                      fontSize: '14px',
                      padding: '5px 8px',
                      '&:hover': { borderBottom: '2px solid #ea580c' }
                    }}
                  >
                    New Arrivals
                  </Button>
                  <Button
                    component={Link}
                    href='/support'
                    color='inherit'
                    sx={{
                      fontSize: '14px',
                      padding: '5px 8px',
                      '&:hover': { borderBottom: '2px solid #ea580c' }
                    }}
                  >
                    Support
                  </Button>
                  <Button
                    component={Link}
                    href='/warranty'
                    color='inherit'
                    sx={{
                      fontSize: '14px',
                      padding: '5px 8px',
                      '&:hover': { borderBottom: '2px solid #ea580c' }
                    }}
                  >
                    Warranty
                  </Button>
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                md={3}
                display='flex'
                justifyContent='flex-end'
                gap={3}
                sx={{ marginTop: { xs: '-40px', sm: '0px' } }}
              >
                <HeartElement wishQuantity={wishQuantity} />
                <CartElement />
              </Grid>

              {/* <Grid item xs={2} display={{ xs: 'block', md: 'none' }}>
                <IconButton onClick={() => toggleDrawer(true)}>
                  <FaBars className='text-xl' />
                </IconButton>
              </Grid> */}
              <Grid
                item
                xs={2}
                display={{ xs: 'block', md: 'none' }}
                sx={{ position: 'relative' }}
              >
                <IconButton
                  onClick={() => toggleDrawer(true)}
                  sx={{
                    position: 'absolute', // Absolute positioning
                    top: -40, // 20px from the top
                    left: 0, // Aligns to the left
                    zIndex: 1000 // Ensures the icon stays on top of other elements
                  }}
                >
                  <FaBars className='text-xl' />
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>

          {showCategoryList && (
            <Box
              sx={{
                position: 'absolute',
                zIndex: 2,
                marginTop: '90px',
                width: '100%'
              }}
            >
              <CategoryMenu
                onProductSelect={handleProductSelection}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                categoryMenuList={categoryMenuList2 as Product[]}
              />
            </Box>
          )}

          <Drawer
            anchor='left'
            open={drawerOpen}
            onClose={() => toggleDrawer(false)}
          >
            {list()}
          </Drawer>
        </>
      ) : (
        <Toolbar>
          <Grid container alignItems='center' justifyContent='space-between'>
            <Grid item>
              <Link href='/' passHref>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Image
                    src='/myzk logo.png'
                    width={130}
                    height={130}
                    alt='logo'
                  />
                </Box>
              </Link>
            </Grid>

            <Grid item display='flex' alignItems='center'>
              <IconButton>
                <FaBell className='text-xl' />
              </IconButton>

              <IconButton onClick={handleMenuOpen}>
                <Avatar src='/randomuser.jpg' alt='random profile photo' />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem component={Link} href='/admin'>
                  Dashboard
                </MenuItem>
                <MenuItem component={Link} href='/profile'>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Toolbar>
      )}
    </AppBar>
  )
}

export default Header
