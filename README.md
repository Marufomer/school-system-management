# School System Web Application

![School System Screenshot](./images/slide(home).png)

## Introduction

The School System Web Application is a comprehensive platform designed to manage the operations of a school. It includes dedicated dashboards for students, teachers, and administrators, allowing efficient management of classes, exams, scores, and more. This project was inspired by the need for streamlined communication and organization within educational institutions.

- **Author**: [Maruf Omer](https://linkedin.com/in/maruf-omer-b320392b3)

## Features

- **Student Management**: Manage student profiles, track progress, and view grades.
- **Teacher Dashboard**: Manage classes, upload resources, and grade students.
- **Admin Panel**: Oversee all school operations, manage users, and configure settings.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, React, Bootstrap
- **Backend**: Node.js, Express
- **Database**: MySQL

## Installation

Follow these steps to get the project up and running on your local machine.

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Marufomer/school-system-management.git
    cd school-system-management
    ```

2. **Install dependencies for backend**:
    ```bash
    cd school-backend
    npm install
    ```

3. **Install dependencies for frontend**:
    ```bash
    cd ../client
    npm install
    ```

4. **Set up your environment variables**:
   Create a `.env` file in the backend directory with the following:

    ```env
    SECRET=your-jwt-sercert
    USER=your-database-user
    DATABASE=your-database-name
    HOST=your-database-host
    PASSWORD=your-database-password
    ```

5. **Run the backend server**:
    ```bash
    cd school-backend
    nodemon app.js
    ```

6. **Run the frontend**:
    ```bash
    cd client
    npm run dev
    ```

## Usage

1. **Access the application**:
   Open your browser and go to `http://localhost:5000` to view the application.

2. **Explore the features**:
   - Use student, teacher, and admin credentials to explore the different functionalities available for each role.

## Contributing

We welcome contributions! To contribute to the project:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

**Contact**: For any inquiries, please reach out to [omermaruf07@gmail.com](omermaruf07@gmail.com).

