module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/auction-app/app/api/auction-info/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$auction$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/auction-app/node_modules/next/server.js [app-route] (ecmascript)");
;
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
            Authorization: `Basic ${auth}`
        },
        body: new URLSearchParams({
            grant_type: "client_credentials"
        }).toString(),
        cache: "no-store"
    });
    const text = await response.text();
    console.log("토큰 응답 원문:", text);
    if (!response.ok) {
        return {
            error: "토큰 발급 실패",
            raw: text
        };
    }
    let data;
    try {
        data = JSON.parse(text);
    } catch  {
        return {
            error: "토큰 응답이 JSON이 아닙니다.",
            raw: text
        };
    }
    if (!data.access_token) {
        return {
            error: "access_token이 없습니다.",
            raw: text
        };
    }
    return {
        accessToken: data.access_token
    };
}
async function POST(req) {
    try {
        const body = await req.json();
        const { courtName, caseNumberYear, caseNumberNumber } = body;
        const tokenResult = await getCodefToken();
        if ("error" in tokenResult) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$auction$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: tokenResult.error,
                raw: tokenResult.raw
            }, {
                status: 500
            });
        }
        const response = await fetch("https://development.codef.io/v1/kr/public/ck/auction-events/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenResult.accessToken}`
            },
            body: JSON.stringify({
                organization: "0004",
                courtName,
                caseNumberYear,
                caseNumberNumber
            }),
            cache: "no-store"
        });
        const text = await response.text();
        console.log("경매 조회 응답 원문:", text);
        if (!response.ok) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$auction$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: "경매 조회 실패",
                raw: text
            }, {
                status: 500
            });
        }
        let result;
        try {
            result = JSON.parse(text);
        } catch  {
            return __TURBOPACK__imported__module__$5b$project$5d2f$auction$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: "경매 조회 응답이 JSON이 아닙니다.",
                raw: text
            }, {
                status: 500
            });
        }
        const product = result?.data?.resProductList?.[0] || result?.resProductList?.[0];
        if (!product) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$auction$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: "조회된 물건 정보가 없습니다.",
                raw: result
            }, {
                status: 404
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$auction$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            useType: product.resUseType || "",
            address: product.resDetailList?.[0]?.resAddress || "",
            appraisalPrice: product.resValuationAmt || "",
            minimumPrice: product.resAmount || ""
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$auction$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: error instanceof Error ? error.message : "서버 오류"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0ci9rs6._.js.map