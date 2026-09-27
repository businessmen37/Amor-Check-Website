// AmorCheck Europe-only access gate for Cloudflare Workers.
// Attach this Worker to amorcheck.com/* after the domain is using Cloudflare.
// Local development and unknown-country requests are allowed so the site can be tested.

const EUROPE = new Set([
  'AL','AD','AT','BY','BE','BA','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IS','IE','IT','XK','LV','LI','LT','LU','MT','MD','MC','ME','NL','MK','NO','PL','PT','RO','RU','SM','RS','SK','SI','ES','SE','CH','UA','GB','VA'
]);

export default {
  async fetch(request, env) {
    const country = request.cf && request.cf.country;

    if (!country || country === 'T1') {
      return env.ASSETS ? env.ASSETS.fetch(request) : fetch(request);
    }

    if (!EUROPE.has(country) || country === 'EG') {
      return new Response('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Unavailable</title><style>body{margin:0;display:grid;place-items:center;min-height:100vh;background:#0b1931;color:#fff;font-family:Arial,sans-serif}div{text-align:center;max-width:440px;padding:30px}h1{font-size:28px}p{color:#b8c4d1}</style></head><body><div><h1>Service unavailable in your region</h1><p>This service is not currently available from your location.</p></div></body></html>', {
        status: 451,
        headers: {'content-type':'text/html; charset=UTF-8','cache-control':'no-store','x-robots-tag':'noindex, nofollow'}
      });
    }

    return env.ASSETS ? env.ASSETS.fetch(request) : fetch(request);
  }
};
