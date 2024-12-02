// import { Post } from "@/model/Post";

export interface ApiResponse {
  success: boolean;
  message: string;
  //   posts?: Array<Post>
}

export type TagsType = {
  type: string; // Type of the tag, e.g., "location", "authority", etc.
  value: string; // Value of the tag, e.g., "City Name", "Police Department", etc.
};

// export type PostUserType = {
//     userName: string; // Name of the user
//     userRole: string; // Role of the user
//     userProfilePic: string; // URL of the user's profile picture
// }

// export type PostType = {
//     content: string; // Content of the post
//     images: string[]; // Array of image URLs
//     tags: TagsType[]; // Array of tags
//     userInfo: PostUserType; // User information
// }
