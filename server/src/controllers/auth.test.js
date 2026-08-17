const test = require("node:test");
const assert = require("node:assert/strict");
const { createToken } = require("./auth");

test("createToken creates a JWT with a role and expiration claim", () => {
  const token = createToken({ _id: "user-123", role: "customer" });

  assert.equal(typeof token, "string");
  const parts = token.split(".");
  assert.equal(parts.length, 3);

  const payload = JSON.parse(
    Buffer.from(
      parts[1].replace(/-/g, "+").replace(/_/g, "/"),
      "base64",
    ).toString("utf8"),
  );

  assert.equal(payload.role, "customer");
  assert.equal(typeof payload.exp, "number");
  assert.ok(payload.exp > Date.now() / 1000);
});
