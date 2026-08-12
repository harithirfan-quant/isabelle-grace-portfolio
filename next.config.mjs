/** @type {import('next').NextConfig} */
const securityHeaders = [
  // HTTPS-only: tell browsers to never use plain http for this host
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Stop content-type sniffing (prevents script-by-mime confusion)
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Refuse to be framed (clickjacking protection)
  { key: "X-Frame-Options", value: "DENY" },
  // Only send the origin (not the full path) to third parties
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable unused browser features (camera, mic, geolocation)
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), usb=()" },
];

const nextConfig = {
  reactStrictMode: true,
  images: {
    // EDIT THIS: add remote image domains here if you host avatar/screenshots externally
    remotePatterns: [],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
