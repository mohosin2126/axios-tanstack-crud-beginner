# React Query Hooks for Data Management

This project contains custom hooks built using `react-query` (TanStack Query) to handle data fetching, posting, updating, and deleting from a REST API. These hooks are generic and can be reused across different parts of your React application.

## Features

- Data Fetching: Fetch data from a specified endpoint with optional query parameters.
- Data Posting: Post new data to a specified endpoint.
- Data Updating: Update existing data using an ID and update parameters.
- Data Deletion: Delete data by passing an ID and the relevant endpoint.
- Automatic Caching & Refetching: `react-query` automatically caches the data and provides refetching and invalidation mechanisms.
- Error Handling: SweetAlert2 (`Swal`) is used for user-friendly error and success messages.

## Installation

## Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   
```

## Navigate to the project directory:

```bash
cd your-repo-name
```

## Install dependencies:

```bash
npm install
```

## Install additional dependencies:
- react-query (TanStack Query)
- axios
- sweetalert2

```bash
npm install @tanstack/react-query axios sweetalert2
```

## Usage
1. Fetch Data
Use useGetData to fetch data from an API endpoint with optional query parameters.

```js
import { useGetData } from './path-to-hooks';

const MyComponent = () => {
  const { data, refetch } = useGetData('/api/endpoint', { param1: 'value1' });

  return (
    <div>
      {/* Display data here */}
    </div>
  );
};
```

2. Post Data
Use usePostData to post new data to an API endpoint.

```js
import { usePostData } from './path-to-hooks';
const MyComponent = () => {
  const postData = usePostData();

  const handleSubmit = () => {
    postData.mutate({
      endpoint: '/api/endpoint',
      postData: { key: 'value' }
    });
  };

  return (
    <button onClick={handleSubmit}>Submit</button>
  );
};
```

3. Update Data
Use useUpdateData to update an existing resource by ID.
```js
import { useUpdateData } from './path-to-hooks';

const MyComponent = () => {
  const updateData = useUpdateData();

  const handleUpdate = () => {
    updateData.mutate({
      endpoint: '/api/endpoint',
      id: '123',
      updateData: { key: 'newValue' }
    });
  };

  return (
    <button onClick={handleUpdate}>Update</button>
  );
};

```

4. Delete Data
Use useDeleteData to delete an existing resource by ID.

```js
import { useDeleteData } from './path-to-hooks';

const MyComponent = () => {
  const deleteData = useDeleteData();

  const handleDelete = () => {
    deleteData.mutate({
      endpoint: '/api/endpoint',
      id: '123'
    });
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};
```

## API

`useGetData(endpoint, queryParams = {})`
- endpoint: The API endpoint to fetch data from (e.g., /users).
- queryParams: Optional query parameters to filter or modify the request (e.g.,` { email: 'user@example.com' }`).

Returns:
- data: The fetched data.
- refetch: Function to manually refetch the data.
- queryClient: The react-query client instance for more advanced usage.

` usePostData()`
Returns a mutation function that posts new data.
- endpoint: The API endpoint to post data to.
- postData: The data to be posted.


`useUpdateData()`
Returns a mutation function that updates existing data.

- endpoint: The API endpoint to update data (e.g., /users).
- id: The ID of the resource to be updated.
- updateData: The data to update the resource with.

`useDeleteData()`
Returns a mutation function that deletes a resource.

- endpoint: The API endpoint to delete data from.
- id: The ID of the resource to be deleted.
