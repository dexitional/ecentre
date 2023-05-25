
export async function GET(request: Request, { params}:{ params: { id: string }} ) {
  const id = params.id;
  // ?action=form&serial=test ( Fetch for form population )
  // ?action=print&serial=test ( Fetch for Printview with 3rd party endpoints )
  
  // Fetch Application Data ( form, print )
  // Fetch Aspirant, Mate, Gurantor 1  & 2 - Biodata ( print )
  return new Response(JSON.stringify({ id }), { status: 200 });
}

export async function POST(request: Request) {
  const body = request.body;
  // Fetch CGPA
  return new Response(JSON.stringify({ body }), { status: 200 });
}

export async function DELETE(request: Request, { params}:{ params: { id: string }} ) {
  const id = params.id;
  return new Response(JSON.stringify({ id }), { status: 200 });
}

export async function PATCH(request: Request, { params}:{ params: { id: string }} ) {
  const id = params.id;
  const body = request.body;
  return new Response(JSON.stringify({ id,body }), { status: 200 });
}


