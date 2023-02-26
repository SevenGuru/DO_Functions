// Import URL & Parse-Domain
// import { URL } from 'node:url';  // https://nodejs.org/api/url.html#urlhost
import { parseDomain } from 'parse-domain'; // https://www.npmjs.com/package/parse-domain

// // Import Redis
// // import { createClient } from 'redis'; // https://redis.io/
// // const redisClient = createClient();

// // // Try to connect to redis
// // redisClient.on('error', err => console.log('Redis Client Error', err));

// // Import Google's Web-Risk API
// const { WebRiskServiceClient, protos } = require("@google-cloud/web-risk"); // https://developers.google.com/safe-browsing/v4/lookup-api
// const client = new WebRiskServiceClient();

// Function to search URI
async function checkURI(uri) {
    // const request = {
    //     uri: uri,
    //     threatTypes: [ // Get the different threat protections
    //       protos.google.cloud.webrisk.v1.ThreatType.MALWARE,
    //       protos.google.cloud.webrisk.v1.ThreatType.SOCIAL_ENGINEERING,
    //       protos.google.cloud.webrisk.v1.ThreatType.UNWANTED_SOFTWARE,
    //     ],
    // };

    // strip link down to just the subdomain, domain, and TLD and check to see if it exist in redis
    const url = new URL(uri);
    const link = url.hostname; // Strips everything off except the 3 things needed

    const parseResult = parseDomain(link);
    const { subDomains, domain, topLevelDomains } = parseResult;
      
    const checkDomain = domain + "." + topLevelDomains;

    return { "body": checkDomain }

    // // call the WebRisk searchUris API.
    // const {threat} = (await client.searchUris(request))[0];
    // if (threat) {
    //     console.info(threat);

    //     // Connect to Redis
    //     await redisClient.connect();

    //     // Check to see if the domain exist in redis. If it returns null then it doesn't.
    //     if(await redisClient.LPOS("blacklist_domains", checkDomain) == null) {
    //         redisClient.lPush("blacklist_domains", checkDomain) // Add the domain to the blacklist as it is not clean
    //     }
    // } else {
    //     console.info('no threats found');

    //     // Connect to Redis
    //     await redisClient.connect();

    //     // Check to see if the domain exist in redis. If it returns null then it doesn't.
    //     if(await redisClient.LPOS("whitelist_domains", checkDomain) == null) {
    //         redisClient.lPush("whitelist_domains", checkDomain) // Add the domain to the whitelist as it is clean
    //     }
    // }
    // await redisClient.disconnect();
}

module.exports.main = checkURI;

// checkURI("http://aparat.com/")

// export { checkURI }