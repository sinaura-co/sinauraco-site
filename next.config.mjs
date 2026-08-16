/** @type {import('next').NextConfig} */
// Native Next.js on Vercel — never `output: 'export'` (it would block the
// phase-two creator/admin portals). See CLAUDE.md → STACK.
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
