export interface ApiResponse {
  success: boolean;
  message: string;
  data: SecretCardProps[]; // Array of secrets
}

export interface User {
  _id: string; // Unique identifier
  username: string;
  email: string;
  role: 'user' | 'moderator' | 'admin'; // Role of the user
  createdAt: string;
  updatedAt: string;
}

export interface Secret {
  _id: string; // Unique identifier for the secret
  content: string; // Secret content
  createdAt: string; // Date when the secret was created
  updatedAt: string; // Date when the secret was last updated
  user: string;
}

export interface SecretCardProps {
  _id?: string; // Secret ID (optional, used for edit and delete)
  role?: string; // User role (optional, used for button visibility)
  onEdit?: () => void; // Function to handle edit action
  onDelete?: () => void; // Function to handle delete action
  content: string; // Secret content
  user?: {
    username: string; // Username of the user who posted the secret
  };
}
