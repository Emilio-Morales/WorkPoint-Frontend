# WorkPoint - Streamlined Enterprise Management and Insights

**Your Organization, Simplified**  
WorkPoint brings clarity to enterprise management. Track budgets, monitor employee activity, and analyze key metrics—all in one intuitive platform. From company-wide overviews to department-specific insights, WorkPoint empowers you to make informed decisions with ease.

## Features

- **Comprehensive Dashboards**  
  Visualize key metrics with interactive charts, graphs, and tables using Material UI.

- **Budget Tracking**  
  Monitor and manage budgets with ease, ensuring financial clarity at all levels.

- **Employee Monitoring**  
  Gain insights into employee activity and individual performance metrics.

- **Department-Level Analysis**  
  Dive deep into department-specific data for targeted decision-making.

- **Authentication & Authorization**  
  Secure user accounts with robust authentication mechanisms.

- **Full CRUD Operations**  
  Seamlessly create, read, update, and delete data throughout the application.

## Technology Stack

### Frontend
- **Next.js**: Fast, server-side rendered React framework for optimized performance.  
- **TailwindCSS**: Utility-first CSS framework for designing responsive and modern user interfaces.  
- **Material UI**: Advanced UI components for charts, tables, and graphs.

### Backend
- **.NET**: Backend logic for handling API requests and application functionality.  
- **SQL Express**: Relational database for managing and storing enterprise data.

### Deployment
- **Frontend**: Deployed to **Vercel** for fast, scalable hosting.  
- **Backend**: Deployed to **Azure** for reliable and secure cloud services.

## Demo Credentials

Experience the application live using the following credentials:

```bash
Username: johnsmith@example.com
Password: test
```

## Installation & Setup

To run the application locally, follow these steps:

### Prerequisites
- **Node.js**: Ensure Node.js is installed on your system.
- **SQL Express**: Set up and configure SQL Express.

### Steps

1. **Clone the repository**  
   Clone the repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/workpoint.git
   cd workpoint
   ```

2. **Install frontend dependencies**  
   Navigate to the frontend directory and install the required packages:

   ```bash
   cd frontend
   npm install
   ```

3. **Set up the database**  
   - Configure your **SQL Express** instance and create the necessary database.  
   - Update the connection string in the backend configuration file (available in the backend repository) to point to your SQL Express database.

4. **Start the development servers**  

   - Start the frontend development server:

     ```bash
     npm run dev
     ```

5. **Access the application**  
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Backend Setup

The backend for this project is hosted in a separate repository. Follow the steps below to set up the backend:

1. Clone the backend repository:
   ```bash
   git clone https://github.com/yourusername/workpoint-backend.git
   cd workpoint-backend
   ```

2. Install dependencies:
   ```bash
   dotnet restore
   ```

3. Update the database connection string in the backend configuration file.

4. Start the backend server:
   ```bash
   dotnet run
   ```

## Contact

For any inquiries or support, reach out to [emiliomoralesdev@gmail.com](mailto:emiliomoralesdev@gmail.com).
