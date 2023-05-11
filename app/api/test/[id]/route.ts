import { NextRequest, NextResponse } from 'next/server';
// import db from '../../../supabase'
//const API = require("../../backend/model/apiModel");

export async function GET(request: NextRequest, context: { params: { id:string } }) {
  //const id = req.query?.id
  console.log(context.params)
  
  return NextResponse.json({ success: 'coming',test:'Paased', data: context.params })
  
}


