import Fuse from 'fuse.js';
import { promises as fs } from 'fs';
import path from 'path';
import { NextRequest } from 'next/server';
export async function GET(request: NextRequest) {
  const filePath = path.join(process.cwd(), 'public', 'pokemon.json');
  const name = request.nextUrl.searchParams.get('name') ?? '';

  try {
    const fileContents = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContents);

    if (name === '') {
      return new Response(JSON.stringify({ data: data.data }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const fuse = new Fuse(data.data, { keys: ['name'], findAllMatches: true, includeScore: true, includeMatches: true });
    const results = fuse.search(name).map((result) => result.item);

    return new Response(JSON.stringify({ data: results }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error reading file:', error);
    return new Response(JSON.stringify({ error: 'Failed to read file' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
