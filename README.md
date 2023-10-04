# PricePilot - For Educational Purposes Only

🚀 **PricePilot - Your Vehicle Pricing Navigator (Educational Purpose)**

Welcome to PricePilot, a project developed for educational purposes, showcasing the integration of web scraping, data management, and predictive analysis. This project demonstrates how to scrape data from [https://www.lacentrale.fr/](https://www.lacentrale.fr/) and store it in a database, with a focus on predicting car prices using advanced AI algorithms.

## Disclaimer

This project, PricePilot, is intended for educational use only. It serves as a learning tool to demonstrate the concepts of web scraping, data storage, and machine learning. The data scraped from [https://www.lacentrale.fr/](https://www.lacentrale.fr/) is used for educational and demonstrative purposes, and adherence to the website's terms of service and policies is maintained.

**Note**: If this project is accessible via a GitHub repository, please ensure that it is used strictly for educational purposes and in compliance with all applicable laws and regulations.

## Project Overview

PricePilot is a tool designed to predict car prices based on various factors like brand, mileage, and more. It provides a simulated environment for learning about data science and machine learning, particularly in the context of vehicle pricing predictions.

## Setup Instructions

To set up PricePilot for educational purposes, follow these steps:

### 1. Configuration

- Copy the `.env.example` file into a new file named `.env`:

  ```bash
  cp .env.example .env
  ```

  Fill in the necessary variables in the `.env` file. This file will hold important configuration information for your application.

### 2. Install Requirements

- Install the required dependencies listed in `requirements.txt` using pip:

  ```bash
  pip install -r requirements.txt
  ```

### 3. Database Configuration

- PricePilot uses MongoDB as the database. Make sure you have MongoDB installed and running or use [MongoAtlas](https://www.mongodb.com/atlas).

### 4. Run Migrations

- Run the database migrations to set up the initial database schema:

  ```bash
  python manage.py migrate
  ```

### 5. Run the Server

- Start the development server:

  ```bash
  python manage.py runserver
  ```

🛫 PricePilot is now ready for takeoff! Access the application at [http://localhost:8000](http://localhost:8000) and explore the world of predicted car prices for educational purposes.

## Key Features

- **Predict Car Prices**: Harness the power of our predictive models to estimate the price of various cars.
- **User-Friendly Interface**: A sleek React-powered frontend ensuring a seamless user experience.
- **Backend Magic with Django and MongoDB**: A robust backend built on Django, fueled by the flexibility of MongoDB.
- **Data-Driven Insights**: Gain insights into trends and patterns that affect used car prices.
- **Open-Source and Collaborative**: Join the community, contribute, and learn the art of predictive algorithms for accurate valuations.

🚗 **Join us on this PricePilot Educational Journey!**
