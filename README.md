# **PostPulse**

🚀 **Project for Supermind Hackathon**

PostPulse is a cutting-edge application designed for **social media performance analysis**. It leverages the power of **LangFlow** for workflow orchestration and **Datastax Astra DB** for scalable and efficient data storage. PostPulse provides actionable insights into the performance of social media posts, including metrics like likes, shares, and comments.

---

## **How It Works**

### **1. Data Ingestion:**

- Social media performance data (e.g., likes, comments, shares) is fetched and stored in **Datastax Astra DB**.
- Data is processed and analyzed using a LangFlow-based workflow.

### **2. LangFlow Workflow:**

PostPulse integrates LangFlow to orchestrate the data processing pipeline. Below snapshot of the workflow:

![LangFlow Workflow](https://github.com/ronak-pal1/PostPulse/blob/main/client/src/assets/workflow.png)

**Workflow Steps:**

1. **Take input** : Take input from the user
2. **Retrieve data** : Retrieve data from the Astra DB
3. **Extract UserId** : Extract the UserId from the given input text
4. **Filter data** : Filter the retrieved data using the userId
5. **Calculate averages** : Calculate the averages by post types
6. **Input to model** : Give the input to the model
7. **Retrieve output** : Retrieve output from the model

### **3. Data Storage with Astra DB:**

- **Datastax Astra DB** is used for storing social media data in a scalable, cloud-native database.
- The table schema is designed to include:
  - **user_id**: Unique identifier for the user.
  - **post_type**: Type of post (reel,carousel,static image).
  - **likes, comments, shares**: Metrics tracked for performance analysis.

---

## **Features**

1. **Real-Time Data Analysis:** Analyze social media metrics on the fly.
2. **Customizable Insights:** Generate insights tailored to your needs.
3. **Scalable Storage:** Handle millions of records with Datastax Astra DB.
4. **Workflow Automation:** Orchestrate data analysis with LangFlow.

---

## **Run Locally**

### Prerequisites:

- Install Node.js.
- Access to **Datastax Astra DB**.

### Steps:

1. Clone this repository:
   ```bash
   git clone https://github.com/your-repo/postpulse.git
   cd postpulse
   ```
2. Install dependencies:
   ```bash
   cd client/
   npm install
   ```
   ```bash
   cd server/
   npm install
   ```
3. Set up your environment variables:
   ```bash
   LANGFLOW_APPLICATION_TOKEN
   PORT
   ASTRA_TOKEN
   ASTRA_URL
   ```
4. Start the application:
   ```bash
   cd client/
   npm run dev
   ```
   ```bash
   cd server/
   npx tsc
   node dist/index.js
   ```

---

## **Demo video**

🎥 Watch the complete demo of PostPulse on YouTube: [Walkthough video](https://www.youtube.com/watch?v=8VICapn_imw)

---

## **Tech stack**

- **Frontend**: React, Tailwind
- **Backend**: Express + Typescript
- **Database**: Astra DB
- **Orchestration**: Langflow

Thank you for visiting ❤️
