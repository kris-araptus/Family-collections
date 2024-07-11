# Family Collections: A Private Social Media App

Family Collections is a private, family-oriented social media application built with Astro.js and SQLite. It allows family members to share posts, create collections, and interact in a secure, closed environment.

## 🚀 Project Structure

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Card.astro
│   │   ├── CollectionGrid.astro
│   │   ├── CreatePostForm.astro
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── PostCard.astro
│   │   ├── PostFeed.astro
│   │   └── UserProfile.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── create-post.astro
│   │   ├── index.astro
│   │   ├── post/
│   │   │   └── [id].astro
│   │   └── profiles/
│   │       └── [username].astro
│   ├── services/
│   │   ├── authService.ts
│   │   ├── databaseService.ts
│   │   ├── postServices.ts
│   │   └── userServices.ts
│   └── styles/
│       └── global.css
├── package.json
└── tsconfig.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:4321`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🌟 Features

- User authentication and profiles
- Post creation with image uploads
- Collections for organizing posts
- Responsive design for various devices
- Local SQLite database for data storage

## 🛠️ Technologies Used

- [Astro.js](https://astro.build/) for fast, modern web development
- SQLite for local database storage
- TypeScript for type-safe code
- [Better-SQLite3](https://github.com/JoshuaWise/better-sqlite3) for database interactions

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Run the development server with `npm run dev`
4. Open `http://localhost:4321` in your browser

## 📝 Notes

- This app is designed for private use among family members.
- Ensure proper security measures are in place before deploying to production.
- The SQLite database file (`family_social.db`) is not included in version control.

## 👀 Want to learn more?

- [Astro documentation](https://docs.astro.build)
- [SQLite documentation](https://www.sqlite.org/docs.html)
- [TypeScript documentation](https://www.typescriptlang.org/docs/)