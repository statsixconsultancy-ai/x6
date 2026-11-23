/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // `PREVIEW_EXPORT=1 npm run build` writes a static copy to ./out
  ...(process.env.PREVIEW_EXPORT ? { output: "export", images: { unoptimized: true } } : {}),
};
export default nextConfig;
