//import path from 'path';
//import { promises as fs } from 'fs';
//const jsonDirectory = path.join(process.cwd(), 'json');

import { fetchTest, setupCourses, setupVenues } from "@/utils/serverApi";

const courses = require('../../../public/courses.json')
const venues = require('../../../public/venues.json')

export async function GET(request: Request) {
  const res = await setupCourses(courses)
  //const res = await setupVenues(venues)
  //const res = await fetchTest()
  return new Response(JSON.stringify({ res }), { status: 200 });
}



export async function POST(request: Request) {
  const body = request.body;
  return new Response(JSON.stringify({ body }), { status: 200 });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  return new Response(JSON.stringify({ id }), { status: 200 });
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const body = request.body;
  return new Response(JSON.stringify({ id, body }), { status: 200 });
}


