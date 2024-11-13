# Nodepress

**⚠️ This version of Nodepress is not production-ready. Use at your own risk in development environments only.**

Nodepress is a content management system (CMS) that enables you to create and manage web applications easily and flexibly. Designed for developers and content creators, Nodepress offers an extensible architecture that allows you to customize the platform according to the specific needs of each project.

---

## Features

-   **Headless CMS**: Nodepress functions as a headless CMS, meaning you can use it as an independent backend and connect it to any frontend or mobile application.
-   **REST and GraphQL APIs**: Interact with your application data via a fully documented REST API and a GraphQL interface.
-   **Content Management**: Manage your data with a customizable system of models and entity relationships.
-   **Roles and Permissions**: Control user access to data and platform operations.
-   **Customization and Extensibility**: Add new functionalities through a modular architecture and plugins.
-   **Multi-Database Support**: Configure Nodepress to work with databases like SQLite, MySQL, or PostgreSQL based on your requirements.

---

## Installation

To install Nodepress in your project, simply run the following command:

```bash
npm install nodepress
```

## Configuration

Nodepress offers configuration options through a config.json file or environment variables.

```env
DATABASE_TYPE=mysql
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=user
DATABASE_PASSWORD=password
DATABASE_NAME=nodepress_db
SERVER_PORT=3000
JWT_SECRET=your_secret_key
```

## Usage

Start the Server

To start the Nodepress server, you can run:

```bash
npx nodepress start
```

## Mit License

Nodepress is open-source software licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

Thank you for using Nodepress! We hope you find it useful for your projects. If you have any questions or feedback, please feel free to reach out to us.
