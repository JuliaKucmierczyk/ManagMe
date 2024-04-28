import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import 'dotenv/config'
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 5000;


const mySecret = process.env.JWT_SECRET || 'default_secret'; // Not recommended for production

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const token = jwt.sign({ userId: 1 }, mySecret, { expiresIn: '1h' });
// Database or user authentication logic here (replace with your implementation)
const users = [
  { id: 1, login: 'admin', password: '$2y10$7/7z1313z3/z3/z3/z3/z3/z3/z3/z3/z3/z3/z3/z3/z3/z3/z3/z3/z3/z3/z3/z3/z3/z3/z3/z3/z3/z3/z3/z3/z3/z3/z3/z3' }, 
];

app.post('/api/login', async (req, res) => {
  const { login, password } = req.body;

  const user = users.find((user) => user.login === login);

  if (!user) {
    return res.status(401).json({ error: 'Invalid login or password' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid login or password' });
  }

  const accessToken = jwt.sign({ userId: user.id },mySecret, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ userId: user.id }, mySecret, { expiresIn: '7d' });

  res.json({ accessToken, refreshToken });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.post('/api/refresh-token', async (req, res) => {
    const refreshToken = req.headers['refresh-token'];
  
    if (!refreshToken) {
      return res.status(401).json({ error: 'Missing refresh token' });
    }
  
    try {
      const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_SECRET);
  
      const userId = decodedRefreshToken.userId;
  
      const user = users.find((user) => user.id === userId); // Replace with your user lookup logic
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid refresh token' });
      }
  
      const newAccessToken = jwt.sign({ userId: user.id }, mySecret, { expiresIn: '1h' });
  
      res.json({ accessToken: newAccessToken });
    } catch (error) {
      console.error('Error refreshing token:', error);
      res.status(401).json({ error: 'Invalid refresh token' });
    }
  });
  const tokenSecret = process.env.TOKEN_SECRET as string
let refreshToken: string

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World - simple api with JWT!')
})

app.post(
  "/token",
  function (req, res) {
    const expTime = req.body.exp || 60
    const token = generateToken(+expTime)
    refreshToken = generateToken(60 * 60)
    res.status(200).send({ token, refreshToken })
  }
)
app.post(
  "/refreshToken",
  function (req, res) {
    const refreshTokenFromPost = req.body.refreshToken
    if (refreshToken !== refreshTokenFromPost) {
      res.status(400).send('Bad refresh token!')
    }
    const expTime = req.headers.exp || 60
    const token = generateToken(+expTime)
    refreshToken = generateToken(60 * 60)
    setTimeout(() => {
      res.status(200).send({ token, refreshToken })
    }, 3000)
  }
)
app.get(
  "/protected/:id/:delay?",
  verifyToken,
  (req, res) => {
    const id = req.params.id
    const delay = req.params.delay ? +req.params.delay : 1000
    setTimeout(() => {
      res.status(200).send(`{"message": "protected endpoint ${id}"}`)
    }, delay)
  }
)
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

function generateToken(expirationInSeconds: number) {
  const exp = Math.floor(Date.now() / 1000) + expirationInSeconds
  const token = jwt.sign({ exp, foo: 'bar' }, tokenSecret, { algorithm: 'HS256' })
  return token
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function verifyToken(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization']
  const token = authHeader?.split(' ')[1]

  if (!token) return res.sendStatus(403)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jwt.verify(token, tokenSecret, (err: any, user: any) => {
    if (err) {
      console.log(err)
      return res.status(401).send(err.message)
    }
    req.user = user
    next()
  })
}