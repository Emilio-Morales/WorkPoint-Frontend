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

Experience the application [live](https://dotnet-frontend.vercel.app/) using the following credentials:

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
   git clone https://github.com/Emilio-Morales/dotnet-frontend.git
   ```

2. **Install frontend dependencies**  
   Navigate to the frontend directory and install the required packages:

   ```bash
   cd frontend
   npm install
   ```

3. **Create environment variables**  
   - Create a `.env` file in the frontend directory.  
   - Add the following line to set the backend URL:  
   ```bash
   NEXT_BACKEND_URL=http://localhost:5000
   
4. **Start the development servers**  

   - Start the frontend development server:

     ```bash
     npm run dev
     ```

5. **Access the application**  
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Backend Setup

The backend for this project is hosted in a separate [repository](https://github.com/Emilio-Morales/WorkPoint-Backend.git). Follow the steps below to set up the backend:

1. Clone the backend repository:
   ```bash
   git clone https://github.com/Emilio-Morales/WorkPoint-Backend.git
   cd workpoint-backend
   ```

2. Install dependencies:
   ```bash
   dotnet restore
   ```

3. Create an `appsettings.json` file:  
   If the file is not included in the repository, create it in the root directory of the backend project. Use the following structure as an example, updating the connection string with your SQL Express instance details:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=YOUR_SERVER_NAME;Database=YOUR_DATABASE_NAME;Trusted_Connection=True;"
     },
     "Logging": {
       "LogLevel": {
         "Default": "Information",
         "Microsoft": "Warning",
         "Microsoft.Hosting.Lifetime": "Information"
       }
     },
     "AllowedHosts": "*"
   }
   ```

4. Update the database connection string in the `appsettings.json` file to match your local SQL Express instance.

5. Start the backend server:
   ```bash
   dotnet run
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
