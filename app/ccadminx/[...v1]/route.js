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

    if (newUrl.includes(".zip")) {
      payload.responseType = "arraybuffer";
    }

    const adminXApi = await axios.request(payload);
    const newHeaders = new Headers(adminXApi.headers);
    newHeaders.delete("content-length");

    return NextResponse.json(adminXApi.data, {
      status: 200,
      headers: newHeaders,
    });
  } catch (error) {
    return NextResponse.json(
      error.response?.data || { errorCode: "02", message: `${error.message}.` },
      { status: 400 },
    );
  }
}

export async function POST(request) {
  try {
    const newUrl = request.nextUrl.pathname.concat(request.nextUrl.search);
    // Parsing the binary large object as it is into occ server
    const requestBody = await request.arrayBuffer();
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
      data: requestBody,
      method: "post",
      headers: modifiedHeaders,
    };

    const adminXApi = await axios.request(payload);
    const newHeaders = new Headers(adminXApi.headers);
    newHeaders.delete("content-length");

    return NextResponse.json(
      { ...adminXApi.data },
      { status: 200, headers: newHeaders },
    );
  } catch (error) {
    return NextResponse.json(
      error.response?.data || { errorCode: "02", message: `${error.message}.` },
      { status: 400 },
    );
  }
}

export async function PUT(request) {
  try {
    const newUrl = request.nextUrl.pathname.concat(request.nextUrl.search);
    const requestBody = await request.arrayBuffer();
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
      data: requestBody,
      method: "put",
      headers: modifiedHeaders,
    };

    const adminXApi = await axios.request(payload);
    const newHeaders = new Headers(adminXApi.headers);
    newHeaders.delete("content-length");

    return NextResponse.json(
      { ...adminXApi.data },
      { status: 200, headers: newHeaders },
    );
  } catch (error) {
    return NextResponse.json(
      error.response?.data || { errorCode: "02", message: `${error.message}.` },
      { status: 400 },
    );
  }
}

export async function DELETE(request) {
  try {
    const newUrl = request.nextUrl.pathname.concat(request.nextUrl.search);
    const requestBody = await request.arrayBuffer();
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
      data: requestBody,
      method: "delete",
      headers: modifiedHeaders,
    };

    const adminXApi = await axios.request(payload);
    const newHeaders = new Headers(adminXApi.headers);
    newHeaders.delete("content-length");

    return NextResponse.json(
      { ...adminXApi.data },
      { status: 200, headers: newHeaders },
    );
  } catch (error) {
    return NextResponse.json(
      error.response?.data || { errorCode: "02", message: `${error.message}.` },
      { status: 400 },
    );
  }
}

export async function PATCH(request) {
  try {
    const newUrl = request.nextUrl.pathname.concat(request.nextUrl.search);
    const requestBody = await request.arrayBuffer();
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
      data: requestBody,
      method: "patch",
      headers: modifiedHeaders,
    };

    const adminXApi = await axios.request(payload);
    const newHeaders = new Headers(adminXApi.headers);
    newHeaders.delete("content-length");

    return NextResponse.json(
      { ...adminXApi.data },
      { status: 200, headers: newHeaders },
    );
  } catch (error) {
    return NextResponse.json(
      error.response?.data || { errorCode: "02", message: `${error.message}.` },
      { status: 400 },
    );
  }
}
