# TennisSite - Tennis Analytics & Prediction Platform

A comprehensive tennis analytics platform that combines web scraping, machine learning, and web applications to provide tennis match predictions, player statistics, and head-to-head comparisons.

## Project Overview

This project consists of multiple components:
- **Web Scraping Module** - Collects player data and statistics from tennis.com
- **Machine Learning Model** - Predicts match winners using Random Forest classifier
- **Node.js Web Applications** - Two Express.js applications for user interface and API services
- **Database Integration** - MySQL database for storing player and match data

## Project Structure

```
.
├── webscrapping.py          # Web scraper for tennis.com player data
├── csvloader.py             # MySQL database loader for match data
├── TESTINGSCRAPER.py        # Twitter sentiment scraper (commented out)
├── project_test.csv         # Sample scraped player data
├── atp_players.csv          # ATP player database (53K+ players)
├── wta_players.csv          # WTA player database
├── atp_rankings_current.csv # Current ATP rankings
├── wta_rankings_current.csv # Current WTA rankings
├── winner_predicitions.csv  # Match winner predictions output
├── loser_predicitions.csv   # Match loser predictions output
├── model/
│   └── buildModel.py        # Random Forest model training script
├── NodeApp/                 # Main web application (Express.js)
│   ├── app.js               # Main application entry point (port 8081)
│   ├── routes/
│   │   └── index.js         # Route handlers with MySQL integration
│   ├── views/               # HTML view templates
│   │   ├── headtohead.html  # Head-to-head comparison page
│   │   ├── playerpage.html  # Player statistics page
│   │   ├── tournament.html  # Tournament bracket page
│   │   ├── twittersentiment.html  # Twitter sentiment analysis page
│   │   ├── dashboard.html   # Main dashboard
│   │   ├── login.html       # User login page
│   │   └── ...
│   └── public/              # Static assets (CSS, JS, images)
├── serviceapp/              # Backend API service (Express.js)
│   ├── app.js               # API service entry point
│   ├── routes/
│   │   ├── index.js         # Index routes
│   │   ├── player.js        # Player API endpoints
│   │   ├── versus.js        # Versus comparison endpoints
│   │   ├── h2h.js           # Head-to-head endpoints
│   │   ├── bracket.js       # Tournament bracket endpoints
│   │   └── twitter.js       # Twitter integration endpoints
│   └── views/
└── pyNotebook/
    ├── Images.ipynb         # Jupyter notebook with data analysis
    └── Images.pdf           # PDF export of analysis
```

## Features

### Data Collection
- **Player Scraping**: Automatically scrapes player profiles from tennis.com including:
  - First name, last name
  - Birthdate
  - Year-to-date performance (YTP)
- **Twitter Sentiment**: Collects tweets about tennis players for sentiment analysis

### Machine Learning
- **Model**: Random Forest Classifier
- **Features**: Surface type, player statistics, historical performance
- **Output**: Match winner/loser predictions
- **Model Files**: `tempmodel.joblib`, `col.joblib` (saved model artifacts)

### Web Applications

#### NodeApp (Port 8081)
Main user-facing web application with:
- Head-to-head player comparisons
- Player statistics pages
- Tournament brackets
- Twitter sentiment analysis
- User authentication

#### serviceapp
Backend API service providing RESTful endpoints:
- `/player` - Player information and statistics
- `/versus` - Player versus player comparisons
- `/h2h` - Head-to-head match history
- `/bracket` - Tournament bracket data
- `/twitter` - Twitter sentiment data

### Database
- **MySQL Database** hosted on AWS RDS
- **Tables**:
  - `Versus` - Match results (Winner, Loser, TournamentID, Round, Date, Gender)
- **Data Sources**: ATP and WTA match history

## Installation & Setup

### Prerequisites
- Python 3.x
- Node.js & npm
- MySQL database
- Required Python packages: `pandas`, `scikit-learn`, `beautifulsoup4`, `requests`, `mysql-connector`

### Python Dependencies
```bash
pip install pandas scikit-learn joblib beautifulsoup4 requests mysql-connector-python
```

### Node.js Dependencies

#### NodeApp
```bash
cd NodeApp
npm install
```

#### serviceapp
```bash
cd serviceapp
npm install
```

### Database Configuration

**Important:** This project uses placeholder credentials for security. Before running the application, you must update all configuration files with your actual database credentials and API endpoints.

#### Files Requiring Configuration:

**1. csvloader.py** (Python database loader)
```python
mydb = mysql.connector.connect(
    host='your-host',           # Your MySQL host (e.g., localhost or RDS endpoint)
    user='your-username',       # Your MySQL username
    password='your-password',   # Your MySQL password
    database='your-database'    # Your database name
)
```

**2. NodeApp/routes/index.js** (NodeApp MySQL connection)
```javascript
var connection = mysql.createConnection({
  host: 'your-host',
  user: 'your-username',
  password: 'your-password',
  database: 'your-database'
});
```

**3. serviceapp/public/javascripts/sqlconnection.js** (serviceapp database pool)
```javascript
var connection = mysql.createPool({
  connectionLimit: 10,
  host     : 'your-host',
  user     : 'your-username',
  password : 'your-password',
  database : 'your-database'
});
```

**4. NodeApp/public/javascripts/app.js** (Frontend API endpoints)
Replace all instances of `http://your-api-endpoint` with your actual API server URL:
```javascript
url: 'http://your-api-endpoint/player/...',  // Replace with actual endpoint
url: 'http://your-api-endpoint/versus/...',  // Replace with actual endpoint
url: 'http://your-api-endpoint/h2h/...',     // Replace with actual endpoint
url: 'http://your-api-endpoint/bracket/...', // Replace with actual endpoint
url: 'http://your-api-endpoint/twitter/...'  // Replace with actual endpoint
```

**5. serviceapp/routes/versus.js** (AWS instance configuration)
```javascript
var aws_instance = {"protocol":"http","host":"your-aws-instance"};
```

**6. pyNotebook/Images.ipynb** (Jupyter notebook database connections)
Update all database connection strings in the notebook cells:
```python
db_connection = sql.connect(
    host='your-host',
    database='your-database',
    user='your-username',
    password='your-password'
)
```

#### Database Schema Setup

Create the required tables in your MySQL database:

```sql
CREATE TABLE Versus (
    Winner VARCHAR(255),
    Loser VARCHAR(255),
    TournamentID VARCHAR(255),
    Round VARCHAR(50),
    Date VARCHAR(50),
    Gender VARCHAR(20)
);

CREATE TABLE Player (
    ID VARCHAR(50) PRIMARY KEY,
    First VARCHAR(100),
    Last VARCHAR(100),
    Gender VARCHAR(20)
);

CREATE TABLE Ranking (
    PlayerID VARCHAR(50),
    Gender VARCHAR(20),
    Position INT
);

CREATE TABLE PlayerImages (
    ID VARCHAR(50),
    Gender VARCHAR(20),
    images TEXT
);
```

## Usage

### Running the Web Scraper
```bash
python webscrapping.py
```
Outputs: `project_test2.csv` with player data

### Training the ML Model
```bash
cd model
python buildModel.py
```
Outputs: `tempmodel.joblib`, `col.joblib`

### Starting NodeApp
```bash
cd NodeApp
npm start
```
Access at: `http://localhost:8081`

### Starting serviceapp
```bash
cd serviceapp
npm start
```

## Data Files

| File | Description |
|------|-------------|
| `atp_players.csv` | ATP player database with IDs, names, handedness, birthdate, country |
| `wta_players.csv` | WTA player database |
| `atp_rankings_current.csv` | Current ATP player rankings |
| `wta_rankings_current.csv` | Current WTA player rankings |
| `winner_predicitions.csv` | ML model winner predictions |
| `loser_predicitions.csv` | ML model loser predictions |

## Technologies Used

- **Backend**: Python, Node.js, Express.js
- **Database**: MySQL (AWS RDS)
- **Machine Learning**: scikit-learn (Random Forest)
- **Web Scraping**: BeautifulSoup, requests
- **Data Analysis**: pandas, NumPy
- **Visualization**: matplotlib, seaborn (in Jupyter notebook)
- **Frontend**: HTML, Jade/Pug templates

## Notes
- The Twitter scraper functionality is currently commented out in `TESTINGSCRAPER.py`
- Database connection strings contain placeholder credentials that need to be updated
- The project includes historical tennis data spanning multiple years
