import { NextResponse } from "next/server";
import axios from "axios";

const blocklistHeaders = [
  "accept",
  "cookie",
  "host",
  "postman-token",
  "cache-control",
  "connection",
  "accept-language",
  "x-forwarded-for",
  "x-forwarded-host",
  "origin",
  "x-forwarded-port",
  "x-forwarded-proto",
  "referrer",
  "X-InstanceId",
  "x-invoke-path",
  "transfer-encoding",
  "x-invoke-query",
  "x-middleware-invoke",
];

export async function GET(request) {
  try {
    const newUrl = request.nextUrl.pathname.concat(request.nextUrl.search);
    const hostId = request.headers.get("X-InstanceId");

    if (!hostId) {
      return NextResponse.json(
        {
          errorCode: "01",
          message: `X-InstanceId header is missing in the request.`,
        },
        { status: 400 },
      );
    }

    const modifiedHeaders = {};
    request.headers.forEach((value, key) => {
      if (!blocklistHeaders.includes(key)) {
        modifiedHeaders[key] = value;
      }
    });

    let payload = {
      baseURL: `https://${hostId}-admin.occa.ocs.oraclecloud.com`,
      url: newUrl,
      method: "get",
      headers: modifiedHeaders,
      responseType: "arraybuffer",
    };

    const storeApi = await axios.request(payload);
    const newHeaders = new Headers(storeApi.headers);
    newHeaders.delete("content-length");

    return NextResponse.json(
      { content: storeApi.data },
      { status: storeApi.data.statusCode, headers: newHeaders },
    );
  } catch (error) {
    return NextResponse.json(
      error.response?.data || { errorCode: "02", message: `${error.message}.` },
      { status: 400 },
    );
  }
}
