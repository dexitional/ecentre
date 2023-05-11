import { NextRequest, NextResponse } from 'next/server';
// import db from '../../../supabase'
//const API = require("../../backend/model/apiModel");

export async function GET(request: NextRequest, context: unknown ) {
  //const id = req.query?.id
  console.log(request)
  
  return NextResponse.json({ success: 'coming',test:'Paased', data: request.nextUrl })
  
}


