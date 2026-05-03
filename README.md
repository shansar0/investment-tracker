# 💰 Investment Tracker App

A complete full-stack investment portfolio tracking application with analytics, ROI calculations, and comprehensive dashboard.

## 🚀 Features

✅ **User Authentication**
- Secure registration and login with JWT tokens
- Password hashing with bcrypt
- Token-based API authorization

✅ **Investment Management**
- Create, read, update, delete investments
- Track investment metrics:
  - Company information
  - Investment amount and current value
  - Market size and revenue model
  - Team quality and growth potential
  - Traction and competition analysis
  - Risk level assessment
  - Scalability ratings
  - Long-term vision and exit strategy

✅ **Analytics & Reporting**
- Portfolio summary with ROI calculations
- Individual investment ROI breakdown
- Growth timeline visualization
- Investment status tracking
- Gain/Loss calculations

✅ **Dashboard**
- Real-time portfolio overview
- Visual charts and statistics
- Status-based filtering
- Quick investment management

✅ **Responsive UI**
- Beautiful gradient design
- Mobile-friendly interface
- Interactive data visualizations
- Smooth animations and transitions

## 🛠 Tech Stack

**Backend:**
- Node.js + Express.js
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt for password hashing

**Frontend:**
- React 18
- React Router
- Recharts for visualizations
- TypeScript
- CSS3 with Grid/Flexbox

**DevOps:**
- Docker & Docker Compose
- MongoDB containerization

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB (local or Atlas)
- Docker (optional)

## 🚀 Quick Start

### Backend Setup

```bash
cd backend
npm install
```

**Create `.env` file:**
```
MONGODB_URI=mongodb://localhost:27017/investment-tracker
JWT_SECRET=your-super-secret-key-change-this
PORT=5000
NODE_ENV=development
```

**Run backend:**
```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

### Docker Setup

```bash
docker-compose up --build
```

Access:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: mongodb://localhost:27017

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Investments
- `GET /api/investments` - Get all user investments
- `POST /api/investments` - Create new investment
- `GET /api/investments/:id` - Get investment details
- `PUT /api/investments/:id` - Update investment
- `DELETE /api/investments/:id` - Delete investment

### Analytics
- `GET /api/analytics/portfolio/summary` - Portfolio overview
- `GET /api/analytics/returns/roi` - ROI analysis
- `GET /api/analytics/growth/timeline` - Growth timeline

## 🧪 Testing

```bash
npm test
```

## 📦 Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Investment Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  companyName: String,
  investmentAmount: Number,
  currentValue: Number,
  investmentDate: Date,
  category: String,
  marketSize: String,
  revenueModel: String,
  teamQuality: Number (1-10),
  growthPotential: Number (1-10),
  traction: String,
  competition: String,
  riskLevel: String (Low/Medium/High),
  scalability: Number (1-10),
  vision: String,
  exitStrategy: String,
  status: String (Active/Exited/Loss/Pending),
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcrypt (salt: 10)
- Protected API routes with middleware
- CORS enabled for frontend communication
- Input validation on backend
- User data isolation (users can only access their own data)

## 📊 Dashboard Features

- **Summary Cards:**
  - Total Invested
  - Current Portfolio Value
  - Total Gains/Loss
  - ROI Percentage

- **Charts:**
  - Investment status pie chart
  - Portfolio statistics
  - Growth timeline line chart

- **Filters:**
  - Filter by status (Active/Exited/Loss/Pending)
  - Sort investments by date

## 🎯 Investment Analysis Fields

1. **Basic Info:**
   - Company name
   - Investment amount
   - Investment date
   - Category

2. **Market Analysis:**
   - Market size (TAM)
   - Revenue model
   - Traction metrics
   - Competition landscape

3. **Ratings (1-10):**
   - Team quality
   - Growth potential
   - Scalability

4. **Risk Assessment:**
   - Risk level (Low/Medium/High)
   - Status tracking

5. **Strategic Planning:**
   - Long-term vision
   - Exit strategy
   - Investment notes

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints for tablets and desktops
- Touch-friendly buttons and inputs
- Responsive tables and charts

## 🚀 Deployment

### Docker Deployment

```bash
# Build image
docker build -t investment-tracker .

# Run container
docker run -p 5000:5000 investment-tracker
```

### Environment Variables for Production

```
MONGODB_URI=<production-mongodb-uri>
JWT_SECRET=<strong-random-secret>
PORT=5000
NODE_ENV=production
```

## 📝 License

MIT License - feel free to use this project for learning and personal use.

## 🤝 Contributing

Contributions are welcome! Feel free to fork and submit pull requests.

## 📧 Support

For issues or questions, please create a GitHub issue.

---

**Happy Investing! 🎯💼**