import { NextResponse } from "next/server";

async function getCodefToken() {
  const clientId = process.env.CODEF_CLIENT_ID;
  const clientSecret = process.env.CODEF_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("CODEF 환경변수가 없습니다.");
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch("https://oauth.codef.io/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${auth}`,
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }).toString(),
    cache: "no-store",
  });

  const text = await response.text();
  console.log("토큰 응답 원문:", text);

  if (!response.ok) {
    return { error: "토큰 발급 실패", raw: text };
  }

  let data: any;
  try {
    data = JSON.parse(text);
  } catch {
    return { error: "토큰 응답이 JSON이 아닙니다.", raw: text };
  }

  if (!data.access_token) {
    return { error: "access_token이 없습니다.", raw: text };
  }

  return { accessToken: data.access_token };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { courtName, caseNumberYear, caseNumberNumber } = body;

    const tokenResult = await getCodefToken();

    if ("error" in tokenResult) {
      return NextResponse.json(
        {
          message: tokenResult.error,
          raw: tokenResult.raw,
        },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://development.codef.io/v1/kr/public/ck/auction-events/search",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenResult.accessToken}`,
        },
        body: JSON.stringify({
          organization: "0004",
          courtName,
          caseNumberYear,
          caseNumberNumber,
        }),
        cache: "no-store",
      }
    );

    const text = await response.text();
    console.log("경매 조회 응답 원문:", text);

    if (!response.ok) {
      return NextResponse.json(
        {
          message: "경매 조회 실패",
          raw: text,
        },
        { status: 500 }
      );
    }

    let result: any;
    try {
      result = JSON.parse(text);
    } catch {
      return NextResponse.json(
        {
          message: "경매 조회 응답이 JSON이 아닙니다.",
          raw: text,
        },
        { status: 500 }
      );
    }

    const product =
      result?.data?.resProductList?.[0] ||
      result?.resProductList?.[0];

    if (!product) {
      return NextResponse.json(
        {
          message: "조회된 물건 정보가 없습니다.",
          raw: result,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      useType: product.resUseType || "",
      address: product.resDetailList?.[0]?.resAddress || "",
      appraisalPrice: product.resValuationAmt || "",
      minimumPrice: product.resAmount || "",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "서버 오류",
      },
      { status: 500 }
    );
  }
}