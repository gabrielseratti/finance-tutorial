import authors from './authors'
import books from './books'
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { z } from 'zod';


export const runtime = 'edge';

const app = new Hono().basePath('/api')

app.route('/authors', authors)
app.route('/books', books)

export const GET = handle(app)
export const POST = handle(app)