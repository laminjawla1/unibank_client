# 🏦 UnBank Client

A modern **banking web client** built with **Next.js** and TypeScript.  
This project serves as the frontend interface for the UniBank platform, supporting core banking UI, navigation, and interaction with backend APIs.

---

## 🚀 Features

- List and create operations for key entities (e.g., customers, accounts, transactions, users, roles)
- Built with **Next.js (App Router)** and **TypeScript**
- TailwindCSS for responsive UI
- Modular folder structure for scalable development
- State management with stores (e.g., Zustand or similar)

---

## 📁 Project Structure

```
├── app/                # Next.js app routes
├── components/         # Shared UI components
├── lib/                # Utilities and libs
├── public/             # Static assets
├── stores/             # State management stores
├── README.md           # This file
├── next.config.ts      # Next.js config
├── tailwind.config.js  # TailwindCSS config
└── tsconfig.json       # TypeScript config
```

---

## ⚡ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/laminjawla1/unibank_client.git
cd unibank_client
```

### 2. Install dependencies

Using npm:

```bash
npm install
```

Or with Yarn:

```bash
yarn
```

Or with pnpm:

```bash
pnpm install
```

### 3. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open your browser and navigate to:
➡️ `http://localhost:3000`

The app supports **fast refresh** — changes update automatically as you work.

---

## 🛠️ Tech Stack

| Technology           | Purpose                      |
| -------------------- | ---------------------------- |
| Next.js              | React framework for frontend |
| TypeScript           | Static typing for safer code |
| TailwindCSS          | Utility-first styling        |
| Zustand (optional)   | State management             |
| Vercel (recommended) | Easy deployment              |

---

## 📌 Development Notes

- This project was bootstrapped with **Create Next App** and uses Next.js routing and server/client components.
- You can edit pages under the `/app` directory — Next.js automatically handles routing.

---

## ✨ Deployment

You can deploy this client to **Vercel**, **Netlify**, or any platform that supports Next.js apps.

Example with Vercel:

```bash
vercel
```

Configure environment variables (if required) directly in Vercel dashboard.

---

## 🤝 Contributing

Contributions are welcome!
To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m "Add new feature"`)
4. Push to GitHub (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source — feel free to use, modify, and share!

---

## ❤️ Acknowledgments

Thank you to all contributors and reviewers.