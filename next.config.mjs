/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'stage-app-profiles-germany.s3.eu-central-1.amazonaws.com',
            'stage-app-profiles-germany.s3.amazonaws.com'
        ],
    }
};

export default nextConfig;
