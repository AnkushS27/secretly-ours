export interface ApiResponse {
  success: boolean;
  message: string;
  data: SecretCardProps[]; // Array of secrets
}

export interface SecretCardProps {
  _id?: string; // Secret ID (optional, used for edit and delete)
  role?: string; // User role (optional, used for button visibility)
  onEdit?: () => void; // Function to handle edit action
  onDelete?: () => void; // Function to handle delete action
  content: string; // Secret content
  user: {
    username: string; // Username of the user who posted the secret
  };
}
