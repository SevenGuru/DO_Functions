import { parseDomain } from "parse-domain"; // https://www.npmjs.com/package/parse-domain
import { URL } from "url";

export function main(req) {
  console.log("URI payload is:", req.uri);
  const url = new URL(req.uri);
  const link = url.hostname; // Strips everything off except the 3 things needed

  const parseResult = parseDomain(link);
  const { subDomains, domain, topLevelDomains } = parseResult;

  const checkDomain = domain + "." + topLevelDomains;

  return { body: checkDomain };
}

if (process.env.TEST) main({ text: "hello" }).then(console.log);
