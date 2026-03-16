# Family Table

**Family Table** is an AI-powered web application that generates a **personalized weekly dinner plan** for families, including ingredients, nutrition info, recipes, and AI-generated food images.

This project demonstrates **serverless architecture** with AWS Lambda + Bedrock/Nova models and a React frontend.

---

## Demo

![Family Table Screenshot](images/family_table.png)  

You can see AI-generated weekly menus, ingredients, nutrition info, and expandable recipes. Each dish also has a generated image.

---

## Features

- Input family info:
  - Number of adults & children
  - Preferred cuisines
  - Dietary restrictions
- Generate a full **weekly dinner plan** (Monday–Sunday)
- For each dish:
  - Name, cuisine, description
  - Ingredients with quantities
  - Nutrition info
  - Step-by-step recipe
  - AI-generated image
- Weekly shopping list (merged ingredients)
- Click to expand recipes in frontend

---

## Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: AWS Lambda (Python)
- **AI Models**: Amazon Bedrock
  - `Claude Haiku` for menu generation
  - `Nova Canvas` for food image generation
- **Storage**: AWS S3 for images
- **API Gateway**: Lambda HTTP API

---

## Architecture

```mermaid
graph TD
  User[User] -->|Submit household info| Frontend[React App]
  Frontend -->|HTTP POST| API[API Gateway]
  API --> Lambda[Lambda Function]
  Lambda --> BedrockMenu[Claude Haiku]
  Lambda --> BedrockImage[Nova Canvas]
  BedrockImage --> S3[S3 Bucket]
  Lambda -->|Return JSON + image URLs| Frontend
  Frontend -->|Render menu, nutrition, recipes, shopping list| User
