import express, { Request, Response, NextFunction } from 'express';
import { generateJwtDilithium, verifyJwtDilithium } from './token';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Dummy user
const dummyUser = {
  username: 'admin',
  password: 'password123',
};

// Login route
app.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username === dummyUser.username && password === dummyUser.password) {
    const token = await generateJwtDilithium(username);
    return res.json({ token });
  }

  res.status(401).json({ message: 'Invalid credentials' });
});

// Middleware to validate JWT
async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.sendStatus(401);

  const user = (req as any).user;

  try {
    const decodedToken = await verifyJwtDilithium(token);
    (req as any).user = decodedToken.sub;
  } catch (e: any) {
    console.log('Error during verification: ', e);
    return res.sendStatus(403);
  }
  next();
}

// Protected route
app.get('/protected', authenticateToken, (req: Request, res: Response) => {
  const user = (req as any).user;
  res.json({
    message: `Hello, user: ${user}. You accessed a protected route.`,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
