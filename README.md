# Residential Rentals

A full-stack real estate listing and management application built with **Next.js**, **React**, **Tailwind CSS**, **Redux Toolkit**, **Express**, and **Prisma**. Users are able to search and filter residential properties. Users are able to sign up as a manager or tenant with a valid username, email, and password. Managers are able to create, update, and delete properties with detailed information, photo uploads, and location support. They can also manage the tenants of their current properties, manage tenant applications, and access the lease information. Tenants are able to add properties to their favorites list, apply for a property, manage their current residences, and view their lease information.

<br>

## Features

- Authentication with **AWS Amplify** and **AWS Cognito**
- Address geolocation via **Nominatim (OpenStreetMap)**
- View properties interactively on a **Mapbox GL** map with pins representing property locations
- Property image upload via **AWS S3**
- Manager dashboard to manage listings, applications, leases, and current tenants
- Tenant dashboard to manage favorite properties, applications, leases, and current residences
- Filter properties (pets allowed, parking included, price, baths, beds, location, etc.)
- Fully responsive UI design
- CRUD operations on properties
- Server-side filtering for data

<br>

## Tech Stack

### Frontend

- **React 19** + **Next.js 15**
- **Tailwind CSS 4**
- **Redux Toolkit** + RTK Query
- **Radix UI**, **Lucide Icons**
- **React Hook Form** + **Zod** (validation)
- **Mapbox GL** (map & geolocation)
- **AWS Amplify** (authentication)

### Backend

- **Node.js** + **Express 5**
- **Prisma ORM** (PostgreSQL)
- **AWS S3** SDK for image upload
- **JWT** for auth validation
- **Helmet**, **CORS**, **Morgan** for security/logging
- **Multer** for multipart file handling