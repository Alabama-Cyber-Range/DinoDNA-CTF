import { NextResponse } from "next/server";

const VALID_USERNAME = "admin";
const VALID_PASSWORD = "dinosaur123";

export async function POST(request: Request) {
  const body = (await request.json()) as { username?: string; password?: string };
  const username = (body.username || "").toLowerCase().trim();
  const password = body.password || "";

  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    return NextResponse.json({
      ok: true,
      message: "Access granted",
    });
  }

  // Deliberately vulnerable response for training: never return credential lists in real systems.
  return NextResponse.json(
    {
      ok: false,
      message: "Password did not match any of the known passwords for this account.",
      knownPasswords: [
        "dinosaur123",
        "fossil2026",
        "trex-admin",
        "DINO{network_traces_reveal_truth}",
      ],
    },
    {
      status: 401,
      headers: {
        "cache-control": "no-store",
      },
    },
  );
}
