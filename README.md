# ✨ LuminaLearn

LuminaLearn (formerly AI Study Explainer) is a modern, dynamic, and engaging AI-powered study companion chat application. Built with Next.js and the Google Gemini API, LuminaLearn offers a beautifully designed multi-turn chat interface to explore complex topics like Black Holes, the Butterfly Effect, history, or anything else you're curious about!

## 🚀 Features
- **Multi-Turn Chat Interface:** Engage in continuous conversations with context-aware AI.
- **Model Selection:** Effortlessly switch between cutting-edge Gemini models (e.g., `gemini-3-flash`, `gemini-2.5-pro`).
- **Engaging UI:** A premium, vibrant design featuring glassmorphism, smooth animations, and tailored color gradients.
- **Auto-Scrolling & Responsive Design:** Fully optimized for both desktop and mobile viewing with intelligent scrolling.
- **Local History:** Saves your chat sessions locally so you can seamlessly revisit your discussions.

## 🛠️ Tech Stack
- **Framework:** [Next.js](https://nextjs.org/) (App Directory)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **AI Integration:** [Google Gemini API](https://aistudio.google.com/)

---

## 💻 Getting Started Locally

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd ai-study-explainer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add your Google Gemini API key:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🌍 How to Deploy on Vercel

Vercel is the optimal platform for deploying Next.js applications, providing an automatic and seamless CI/CD pipeline directly from your GitHub repository.

### Prerequisites
- A GitHub, GitLab, or Bitbucket account.
- A free [Vercel account](https://vercel.com/signup).

### Deployment Steps
1. **Push your code to a Git repository:**
   Ensure all your project files, excluding `node_modules` and `.env.local`, are pushed to your GitHub/GitLab repository.

2. **Import Project to Vercel:**
   - Log in to your Vercel Dashboard.
   - Click the **"Add New Project"** button.
   - Import the Git repository where you pushed the `ai-study-explainer` code.

3. **Configure the Project:**
   - **Framework Preset:** Vercel will automatically detect **Next.js**. Keep this default.
   - **Root Directory:** If your Next.js app is inside the `ai-study-explainer` folder within the repo, select that folder. If it's already the root, leave it as is.
   - **Environment Variables:** This is **CRITICAL**. You must provide your Gemini API Key for the app to work in production.
     - **Key:** `GEMINI_API_KEY`
     - **Value:** Paste your actual Google Gemini API key here.

4. **Deploy:**
   - Click the **"Deploy"** button.
   - Vercel will build your application and immediately assign it a live URL. 

5. **Success! 🎉**
   Once the build completes, Vercel will provide you with the production URL of your app. Share it with the world!
