import { NextFetchEvent, NextRequest, NextResponse} from 'next/server';

export function middleware(req: NextRequest) {
  const cookies = req.cookies;

  if(!cookies["token"] || !Boolean(cookies["token"])) {
    return NextResponse.redirect("/");
  };

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/subscription`, {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + cookies["token"]
    }
  }).then(res => {
    if(res.ok) {
      return res.json();
    };

    throw new Error(res.statusText);
  }).then(res => {
    if(res.haveSubscription) {
      return NextResponse.next();
    };

    return NextResponse.redirect("/plans");
  }).catch(() => {
    return NextResponse.redirect("/");
  });
};