# 📝 AI-Powered Meeting Notes Summarizer & Sharer

## 📌 Overview
This project is a **full-stack application** that helps users quickly turn raw meeting or call transcripts into **AI-powered summaries**.  
Users can upload transcripts, provide custom instructions, generate summaries, **edit them**, and finally **share via email**.

The goal is to make meetings more productive by converting long discussions into **clear, structured, and shareable summaries**.

---

## 🚀 Features
- **Upload Transcript**: Upload raw meeting/call transcripts (text).  
- **Custom Instructions**: Input prompts such as:  
  - `"Summarize in bullet points for executives"`  
  - `"Highlight only action items"`  
- **AI-Powered Summarization**: Generate structured summaries using Groq API.  
- **Editable Summaries**: Refine and edit the AI-generated output.  
- **Email Sharing**: Share the final summary with multiple recipients via **Nodemailer**.  

---

## 🛠️ Tech Stack
- **Frontend**: React (minimal UI)  
- **Backend**: [Node.js & Express](https://github.com/Abhay212121/mangoDesk-backend)  
- **Database**: PostgreSQL (store transcripts & summaries)  
- **AI Service**: Groq API  
- **Email Service**: Nodemailer  

---

## 🎯 Usage
1. Upload a transcript file (or paste text).  
2. Enter a custom prompt (e.g., `"Summarize in action items"`).  
3. Click **Generate Summary** → AI creates a draft summary.  
4. Edit the summary (if needed).  
5. Enter email addresses → **Send summary**.  

---

## 📌 Future Improvements
- 📄 Support for PDF/DOCX uploads.  
- 📝 Multiple summary styles/templates.  
- 🔑 Authentication (user login & history tracking).  
- ✨ Rich-text editor for summary editing.  

---

## 🧑‍💻 Author
Developed by **Abhay Sharma** 🚀  

📂 Backend Repo: [actionNotes-backend](https://github.com/Abhay212121/actionNotes-backend)
