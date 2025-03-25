# Project High Level Documentation

## 000476083  
**Author:** Diya


---

## Section 1 - Project Description

### 1.1 Project  
**Project Name:**  
Photo Gallery and Blog App

### 1.2 Description  
This project aims to develop a **full-stack web application** where users can upload photos, write blog posts, manage their profiles, and view other users' content. The application will be integrated with AWS services such as **Cognito** for authentication, **S3** for photo storage, **DynamoDB** for storing blog metadata, and **SNS** for notifications. The app will provide both public and private features, such as a home page displaying all blog posts and photos, and an "Add" page for users to upload their content.

### 1.3 Revision History

| Date       | Comment                                           | Author |
|------------|---------------------------------------------------|--------|
| 2025-03-15 | Initial project description and setup            | Diya   |
| 2025-03-22 | Added user authentication, image upload, and blog features | Diya   |

---

## Section 2 - Overview

### 2.1 Purpose  
The purpose of this module is to implement and describe the core features of the **Photo Gallery and Blog App**. It will serve as a platform where users can interact by posting blogs, uploading images, and subscribing to other users' content. The intended audience is users who are looking to share photos and written content with others.

### 2.2 Scope  
This module covers user authentication, profile management, photo upload, blog creation, public viewing of content, and image storage. It integrates AWS Cognito for user management, S3 for image storage, and DynamoDB for saving blog metadata.

### 2.3 Requirements

#### 2.3.1 Functional Requirements
- **Requirement 1 (R1):** The system shall allow users to sign up and log in using email and password.
- **Requirement 2 (R2):** The system shall allow users to upload images to AWS S3.
- **Requirement 3 (R3):** The system shall allow users to create and edit blogs.
- **Requirement 4 (R4):** The system shall display uploaded photos and blogs on the home page.
- **Requirement 5 (R5):** The system shall allow users to subscribe to other users' blogs.
- **Requirement 6 (R6):** The system shall send notifications to users when a subscribed user posts a new blog.

#### 2.3.2 Non-Functional Requirements
- **Scalability:** The system should scale automatically using AWS Elastic Load Balancing and Auto Scaling.

#### 2.3.3 Technical Requirements
- **Hardware:** The system shall run on AWS EC2 instances with at least 16GB RAM and 4 CPUs.
- **Software:** The frontend will be built using **React**, and the backend will use **Node.js** with **Express**. All services will integrate with **AWS SDK**.

#### 2.3.4 Security Requirements
- **Authentication:** The system shall use **AWS Cognito** to manage user authentication and require email verification during sign-up.

#### 2.3.5 Estimates

| #  | Description                                             | Hrs. Est. |
|----|---------------------------------------------------------|-----------|
| 1  | Set up **AWS Cognito** for user authentication              | 4         |
| 2  | Set up **S3** for image upload and storage                  | 5         |
| 3  | Implement **blog creation** and editing features            | 6         |
| 4  | Create **frontend** for displaying images and blogs         | 8         |
| 5  | Implement **subscription** and **notification** system          | 6         |
| **TOTAL** | **Overall estimated hours**                            | **29**    |

#### 2.3.6 Traceability Matrix

| SRS Requirement | SDD Module |
|-----------------|------------|
| R1              | 5.1.1 (User Authentication) |
| R2              | 5.2.1 (Image Upload and Storage) |
| R3              | 5.3.1 (Blog Creation and Management) |

---

## Section 3 - System Architecture

### 3.1 Overview  
The system will consist of several key components:
- **Frontend (React):** The user-facing part of the application that handles authentication, displaying blogs and images, and allowing users to upload photos and write blogs.
- **Backend (Node.js & Express):** Provides APIs to handle user authentication, image uploads, and blog data management.
- **AWS Services:** Includes **Cognito** for authentication, **S3** for image storage, **DynamoDB** for blog data, and **SNS** for notifications.

The system architecture is designed to be scalable and secure, using cloud services to manage the load and ensure high availability.

### 3.2 Architectural Diagrams
- **Component Diagram:** Shows the interaction between the front-end, back-end, and AWS services.
- **Sequence Diagram:** Illustrates the flow of user interactions such as login, image upload, and blog creation.
- **Data Flow Diagram (DFD):** Demonstrates how data flows from the user interface to the backend and into AWS services.
- **Deployment Diagram:** Visualizes the physical deployment of the system components in the cloud.

---

## Section 4 - Data Dictionary

### 4.1 Data Dictionary  
The data dictionary includes descriptions of each element used within the system:

| Table        | Field           | Notes                           | Type     |
|--------------|-----------------|---------------------------------|----------|
| Users        | UserID          | Unique identifier for each user | DECIMAL  |
|              | Email           | User email                      | VARCHAR  |
|              | Password        | Encrypted password              | VARCHAR  |
| Images       | ImageID         | Unique image identifier         | DECIMAL  |
|              | UserID          | Associated user ID              | DECIMAL  |
|              | ImageURL        | URL of the uploaded image       | VARCHAR  |
|              | Timestamp       | Date and time of upload         | DATETIME |
| Blogs        | BlogID          | Unique blog identifier          | DECIMAL  |
|              | Title           | Title of the blog               | VARCHAR  |
|              | Content         | Content of the blog             | TEXT     |

---

## Section 5 – Data Design

### 5.1 Persistent/Static Data  
The following tables are used to persist data in **DynamoDB**:

#### 5.1.1 Dataset  
The data is structured in **three main datasets**:
1. **Users** - Stores user information, including authentication details.
2. **Images** - Stores information about the images uploaded to **S3**, including the image URL and associated user.
3. **Blogs** - Stores metadata for each blog post, including title, content, and timestamp.

---

## Section 6 - User Interface Design

### 6.1 User Interface Design Overview  
The user interface will have a **dark theme**, designed for a smooth, modern experience:
- **Login Page:** Simple form for users to sign in with email and password.
- **Home Page:** Displays a feed of all uploaded images and blog posts.
- **Add Page:** Allows users to upload new images and create blog posts.

### 6.2 User Interface Navigation Flow
- **Login Page → Home Page (if logged in)**
- **Home Page → Add Page (for image upload and blog creation)**

### 6.3 Use Cases / User Function Description
- **Sign Up Use Case:** The user fills in email and password fields, clicks "Sign Up", and receives a confirmation email.
- **Login Use Case:** After confirming their email, the user logs in with email and password, and is redirected to the home page.
- **Add Image/Blog Use Case:** The user uploads an image, writes a blog post, and submits it. The image is uploaded to **S3** and metadata is saved to **DynamoDB**.
![image](https://github.com/user-attachments/assets/2c18cdd2-a72c-42b2-b899-01943dd6c78a)

---


