<img width="1920" height="684" alt="PITCH BANNER" src="https://github.com/user-attachments/assets/bff51c97-5b09-4d5f-83be-930abfca2679" />
<h4 align="center">An AI-powered research tool for bias analysis and critical thinking</h4>

---


<h1 align="center">THNK.</h1>
<h4 align="center">Frontend Repo • <a href="https://github.com/mwape-k/thnk-backend">Backend Repo</a></h4>
<details>
<summary>📑 <strong>Table of Contents</strong> (Click to expand)</summary>

1. [**About The Project**](#about-the-project)  
   ↳ 1.1 [Project Description](#11-project-description)  
   ↳ 1.2 [Built With](#12-built-with)  
2. [**Getting Started**](#getting-started)  
   ↳ 2.1 [Prerequisites](#21-prerequisites)  
   ↳ 2.2 [How to Install](#22-how-to-install)  
3. [**Features & Usage**](#features--usage)  
4. [**Demonstration**](#demonstration)  
5. [**Highlights & Challenges**](#highlights--challenges)  
6. [**Roadmap & Future Implementations**](#roadmap--future-implementations)  
7. [**Contributing & Licenses**](#contributing--licenses)  
8. [**Authors & Contact Info**](#authors--contact-info)  
9. [**Acknowledgements**](#acknowledgements)  
</details>

---

## About The Project   
Empowering critical thinking through AI-powered bias analysis

### 1.1 Project Description 
**THNK** is an interactive research tool that helps users analys.e information sources for bias, neutrality, and credibility. By leveraging AI-powered analysis, **THNK** provides comprehensive insights into the reliability of information and encourages deeper critical thinking about media consumption.

Built with a modern tech stack focusing on real-time analysis and intuitive visualisation, THNK enables users to:

- **AI-Powered Analysis:** Process URLs and research prompts to generate comprehensive bias assessments
- **Interactive Mind Maps:** Visualise sources and their relationships through dynamic node-based interfaces
- **Bias Scoring:** Evaluate content for neutrality, persuasion, and sentiment with detailed metrics
- **Source Credibility:** Assess the reliability of information sources with transparency
- **Educational Insights:** Provide critical thinking questions and research suggestions for deeper understanding

THNK transforms how users approach research by making bias analysis accessible, educational, and actionable.

### 1.2 Built With 

**Frontend**  
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)

**Backend & APIs**  
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) ![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)

**Authentication & Deployment**  
![Firebase Auth](https://img.shields.io/badge/Firebase_Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## Getting Started

### 2.1 Prerequisites

- ![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=nodedotjs&logoColor=white) Version 18 or higher  
- ![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-47A248?style=flat-square&logo=mongodb&logoColor=white) Local or Atlas instance
- ![Google Gemini API](https://img.shields.io/badge/Gemini_API-4285F4?style=flat-square&logo=google&logoColor=white) API key for AI analysis
- ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black) Project for authentication

### 2.2 How to Install 

**Backend Setup:**

[see backend repo here:](https://github.com/mwape-k/thnk-backend) for instalation instrutions

**Frontend Setup:**
1. Navigate to frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Environment configuration:
   ```bash
   # Create .env file with:
   REACT_APP_API_URL=http://localhost:5000/api
   ```
   *Ensure you have set up a firebase.js file with your own configuration for authentication*
   
5. Start the development server:
   ```bash
   npm start
   ```

---

## Features & Usage

### Core Features

- **Dual Search Modes:** Analyse content by URL or research prompt with comprehensive AI processing
- **Bias Analysis Engine:** Real-time scoring of neutrality, persuasion, and sentiment across multiple dimensions
- **Interactive Mind Maps:** Visual node-based representation of sources and their relationships
- **Source Credibility Assessment:** Domain-based credibility scoring and source type categorisation
- **Educational Insights:** Critical thinking questions and research suggestions for media literacy
- **Search History:** Persistent history of analyses with quick access to previous results
- **Real-time Visualisation:** Dynamic popover cards and detailed bias breakdowns

### Usage Flow

1. **Search Initiation:** Enter a URL or research question in the search interface
2. **AI Processing:** Backend analyses content using Gemini AI with specialised bias detection prompts
3. **Visualisation:** Results displayed as interactive mind map nodes with color-coded bias indicators
4. **Deep Analysis:** Click nodes for detailed popover cards with comprehensive metrics
5. **Educational Engagement:** Review bias analysis, critical questions, and research suggestions
6. **History Management:** Access previous analyses through the search history interface

---

## Demonstration

*Demo video and screenshots will be added here*

### Application Interface Preview
<img width="2340" height="1743" alt="Mock2" src="https://github.com/user-attachments/assets/376db37c-6b5a-4826-a2f7-420e04f6fcba" />
<img width="2340" height="1743" alt="Movk1" src="https://github.com/user-attachments/assets/abaa4995-d782-496e-9b39-22409079fd30" />

- Search interface with URL and prompt options
- Mind map visualisation with node interactions
- Popover cards with detailed bias analysis
- Search history management interface
- Bias analysis breakdown pages

---

## Highlights & Challenges

*Throughout the development of the THNK Research Tool*

### Highlights 
| Feature | Highlights |
|---------|------------|
| AI-Powered Bias Analysis | Advanced prompt engineering for comprehensive neutrality, persuasion, and sentiment scoring |
| Interactive Mind Maps | Dynamic node visualisation with collision detection and optimal positioning algorithms |
| Real-time Source Assessment | Domain-based credibility scoring and source categorisation for transparent analysis |
| Educational Framework | Critical thinking questions and research suggestions that promote media literacy |
| Seamless User Experience | Intuitive navigation between search, visualisation, and detailed analysis views |

### Challenges
| Feature | Challenges |
|---------|------------|
| AI Response Consistency | Ensuring reliable source attribution and minimising hallucinated URLs in AI responses |
| Complex State Management | Handling real-time data flow between mind map interactions, popovers, and analysis views |
| Edge Collision | Edge collision algorithms for nodes to ensure minimal to no overlap when nodes render |
| Performance Optimisation | Managing large-scale node rendering and real-time bias calculations efficiently |
| User Experience Design | Creating intuitive interfaces for complex bias analysis concepts and metrics |
| Backend-Frontend Integration | Seamless data synchronisation between AI processing and real-time frontend updates |

## Roadmap & Future Implementations

- **Enhanced Source Verification:** Integration with fact-checking APIs and real-time URL validation
- **Comparative Analysis:** Side-by-side comparison of multiple sources on the same topic
- **Advanced Visualisation:** Timeline-based bias tracking and source evolution over time
- **Collaborative Features:** Shared research projects and team-based analysis capabilities
- **Community Exploration:** Community sharing implementation that allows users to engage in and explore community searches
- **Mobile Application:** Dedicated mobile experience for on-the-go research analysis
- **Browser Extension:** Real-time bias analysis for web browsing and social media content
- **Educational Modules:** Structured learning paths for media literacy and critical thinking skills
- **API Access:** Developer-friendly API for integration with other research and educational platforms

---

## Contributing & Licenses
> This project was developed as an advanced research tool for media literacy and critical thinking education.  
> This codebase whilst remaining maintained, does not yet allow for contribution.

**License:** This project was built as part of a university brief

## Authors & Contact Info
Built with ❤️ by: [Mwape Kurete](https://github.com/mwape-k)

**Contact:** [kurete.mwape@gmail.com]

---

## 🎵 The Coding Vibes

*While building THNK, I listened to these playlists:*

[Focus & Productivity Playlist](https://open.spotify.com/playlist/your-playlist-link) — Deep work sessions  
[Creative Coding Mix](https://open.spotify.com/playlist/your-playlist-link) — UI/UX design and development

## Acknowledgements 
Special thanks to:
- **Google Gemini API** for powerful AI analysis capabilities
- **React & TypeScript** communities for excellent documentation and tools
- **MongoDB** for robust data storage solutions
- **Open-source contributors** whose libraries made this project possible
- **Media literacy advocates** who inspired the educational mission of this tool
