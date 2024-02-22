/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                hostname: "openweathermap.org"
            }
        ]
    }
};

export default nextConfig;
