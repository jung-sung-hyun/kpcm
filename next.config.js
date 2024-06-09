// /** @type {import('next').NextConfig} */
// const nextConfig = {};
// export default nextConfig;

// const{createProxyMiddleware} = require("http-proxy-middleware")
// module.exports = function(app){
//     app.use(
//         "/",
//         createProxyMiddleware({
//             target: "http://localhost:5000",
//             changOrgin: treu
//         })
//     )
// }

//  module.exports = {
//  	eslint: {
//  	    ignoreDuringBuilds: true,
//  	  },	
//  	async rewrites() {
//  		return [
//  			{
//  				source: "/:path*",
//  				destination: "http://localhost:8080/:path*",
//  			},
//  		];
//  	}
//  }