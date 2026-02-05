import { RouteRecordRaw } from 'vite-ssg'
import { lazy } from 'react'

// Lazy load pages for code splitting
const Index = lazy(() => import('./pages/Index').then(m => ({ default: m.Index })))
const SEM = lazy(() => import('./pages/SEM'))
const SocialMediaAds = lazy(() => import('./pages/SocialMediaAds'))
const CustomerSoftware = lazy(() => import('./pages/CustomerSoftware'))
const OrderManagement = lazy(() => import('./pages/OrderManagement'))
const Contact = lazy(() => import('./pages/Contact'))
const CorporateProfile = lazy(() => import('./pages/CorporateProfile'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))
const NotFound = lazy(() => import('./pages/NotFound'))

export const routes: RouteRecordRaw[] = [
  { path: '/', component: Index },
  { path: '/sem', component: SEM },
  { path: '/social-media-ads', component: SocialMediaAds },
  { path: '/custom-software', component: CustomerSoftware },
  { path: '/customer-software-demo', component: CustomerSoftware },
  { path: '/order-management', component: OrderManagement },
  { path: '/contact', component: Contact },
  { path: '/corporate-profile', component: CorporateProfile },
  { path: '/blog', component: Blog },
  { path: '/blog/:id', component: BlogPost },
  { path: '/admin', component: AdminDashboard },
  { path: '/:pathMatch(.*)*', component: NotFound },
]