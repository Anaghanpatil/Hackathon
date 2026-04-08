# TriageAI - Progressive Web Application

TriageAI is a modern, modular React/Vite Progressive Web Application built for AI-driven medical symptom checking, teleconsultation bookings, and pharmacy deliveries.

## Tech Stack
- **Core**: React 18 & Vite
- **Styling**: Vanilla CSS with Design Tokens (CSS modules approach) & Lucide React Icons
- **PWA**: `vite-plugin-pwa` for offline capability and manifest generation
- **Mobile Native**: Fully compatible with [Capacitor](https://capacitorjs.com/) for generating iOS & Android builds

## Features
- **Responsive Design**: Premium mobile-first layout with smooth micro-interactions.
- **Dark Mode**: Toggleable light/dark themes utilizing CSS variables.
- **Symptom Checker**: Step-by-step triage questionnaire logic.
- **Teleconsult & Pharmacy**: Dynamic flows for viewing doctors and ordering medicines.
- **Dr Aiva Chatbot**: Simulated conversational interface for medical triage.

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables (if integrating a real backend):
   ```bash
   cp .env.example .env
   ```

3. Start the Vite dev server:
   ```bash
   npm run dev
   ```

### Building for Production
```bash
npm run build
```
This command compiles React and outputs the static files into the `dist/` directory, generating the Service Worker for the PWA.

## Deployment Instructions

### Vercel / Netlify
1. Connect your repository to Vercel/Netlify.
2. Set the **Framework Preset** to Vite.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add any required Environment Variables in the platform dashboard.

### Native Mobile Apps (Capacitor)
If you wish to wrap this web project into a native Android/iOS application:
1. Install Capacitor CLI and core: `npm i @capacitor/core` and `npm i -D @capacitor/cli`
2. Initialize Capacitor: `npx cap init triage-ai com.triage.ai --web-dir dist`
3. Install platform packages: `npm i @capacitor/android @capacitor/ios`
4. Add platforms: `npx cap add android` and `npx cap add ios`
5. Sync project: `npx cap sync`
6. Open Android Studio / XCode to compile the apps: `npx cap open android` / `npx cap open ios`

## Connecting the AI Backend
Currently, the Symptom Checker and Chatbot (`src/screens/Chat.jsx`) screens use mocked responses.
To connect to your AI backend:
```javascript
// Replace the mock setTimeout in Chat.jsx with a real fetch call
const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/chat`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: text })
});
const data = await response.json();
```
*(Remember to ensure CORS is enabled on your backend server).*

## Security & Privacy Considerations
- **API Keys**: Never hardcode secret keys in this frontend. The React frontend should query your internal backend API, which securely stores the third-party AI keys.
- **HIPAA/Data Privacy**: If handling actual patient data, ensure backend storage uses encryption at rest. Transport should strictly occur over HTTPS (enforced via HSTS).
- **Session Tokens**: Use secure HttpOnly cookies for authentication instead of LocalStorage when possible.
