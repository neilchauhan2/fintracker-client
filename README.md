# FinTracker Client

This is the frontend of the FinTracker application, a personal finance tracker that helps users manage their income, expenses, and visualize financial data. Built with React and Material-UI, the client interfaces with the backend API to store and retrieve user financial data.

![screely-1731442821829](https://github.com/user-attachments/assets/e7cfee0d-131f-4a16-8be9-59af339adb40)

## Getting Started

To set up and run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/fintracker-client.git
   cd fintracker-client
   ```
2. **Install the depencies**:

   ```bash
   npm install
   ```

3. **Setup Environment Variables**:
   Create a .env file in the project root, and add the following variables:

   ```bash
   VITE_API_BASE_URL=<url_to_your_backend>

   example: VITE_API_BASE_URL=http://localhost:5000
   ```

4. **Run your local client app**:
   Use the following command to start the client app locally:
   ```bash
   npm run dev
   ```

## Project Structure

- `src/api/`: This folder contains all the API methods for communicating with the backend.
- `src/components/CreateSpaceSection`: This folder contains all the components related to creating a new space.
- `src/components/SpacesPage`: This folder contains all the components related to the dashboard, i.e. the section all the visualizations and transactions are displayed.
- `src/components/Visualization/`: This folder contains all the Rechart based Visualization components used in the SpacesPage.
- `src/utils/`: Utility functions for data transformation, including data formatting and chart preparation.
- `src/types/`: This folder contains Type definitions for the common data types used in the project.
- `src/providers/`: This folder contains Provider for the REact Query Client, which is used for data fetching.

## Technologies Used

- **React** with **TypeScript**
- **Material UI (MUI)** for UI components
- **MUI Data Grid** for data table
- **React Query** for API data fetching and caching
- **Recharts** for data visualization
- **Axios** for API requests
- **Day.js** for date manipulation

