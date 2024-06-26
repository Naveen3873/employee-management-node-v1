# employee-management-node-v1

This project is a comprehensive user management system built with Node.js. It includes features for authentication, authorization, and profile management for two types of users: admins and regular users. The system handles user sign-ups, email confirmations, profile management, and financial detail calculations based on user salaries.

## Features

### Authentication & Authorization
- **User Registration**: Users can sign up with a form containing the following fields:
  - Name
  - Email
  - Phone Number
  - Password
  - Salary
- **Email Confirmation**: Upon successful registration, users receive a confirmation email.
- **User Roles**: Two types of users: Admin and User.

### User Portal
- **Login**: Users can log in after admin approval.
- **Profile View**: Users can view their profile details, including salary.
- **Profile Management**: Users can edit their profile information.

### Admin Panel
- **Admin Dashboard**: Admins have access to an admin dashboard.
- **User Submissions**: Admins can view a list of user submissions and approve or reject each submission.
- **Financial Details**: For each user, financial details are displayed based on their salary:
  - **Tax Calculation**:
    - 10% if salary is below 10 LPA (Lakh Per Annum)
    - 20% if salary is between 11 LPA and 20 LPA
    - 30% if salary is between 21 LPA and 30 LPA
  - **Basic Salary**:
    - 25% of salary if below 10 LPA
    - 50% of salary if between 11 LPA and 20 LPA
    - 75% of salary if between 21 LPA and 30 LPA
  - **PF Amount**: Calculated as 12% of the basic salary.