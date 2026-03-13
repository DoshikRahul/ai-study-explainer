# AI Study Topic Explainer

An AI-powered web application that helps students understand any study topic by providing clear, simple explanations. Built with **Next.js**, **Tailwind CSS**, and **Google Gemini AI**.

## Features

- **Topic Input**: Enter any study topic you want to learn about
- **AI Explanations**: Get clear, student-friendly explanations powered by Google Gemini
- **Loading States**: Visual feedback while the AI generates a response
- **Error Handling**: Graceful error messages for invalid input or API issues
- **Responsive Design**: Works on desktop and mobile devices

## How the AI API is Used

This project uses the **Google Gemini API** (`gemini-2.0-flash` model) to generate topic explanations:

1. The user enters a study topic in the input field
2. The topic is sent to a Next.js API route (`/api/explain`)
3. The API route calls the Gemini API with a prompt designed to explain the topic simply
4. The AI response is returned and displayed in a formatted card

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- A Google Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd ai-study-explainer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
ai-study-explainer/
├── src/
│   ├── app/
│   │   ├── api/explain/route.ts  # API endpoint for explanations
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout with metadata
│   │   └── page.tsx              # Main page
│   ├── components/
│   │   ├── TopicInput.tsx        # Topic input form component
│   │   └── ExplanationCard.tsx   # Explanation display component
│   └── lib/
│       └── aiClient.ts           # Gemini API client library
├── .env.local                    # API key (not committed)
├── package.json
└── README.md
```

## Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Google Gemini AI API**
