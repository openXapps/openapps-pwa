/**
 *{
  "status": "success",
  "country": "South Africa",
  "countryCode": "ZA",
  "region": "WC",
  "regionName": "Western Cape",
  "city": "Cape Town",
  "zip": "7945",
  "lat": -33.9258,
  "lon": 18.4259,
  "timezone": "Africa/Johannesburg",
  "isp": "Cato Networks LTD",
  "org": "Capnet",
  "as": "AS13150 CATO NETWORKS LTD",
  "query": "159.117.232.28"
}
 */

type TGeoLocation = {
  status: string
  country: string
  countryCode: string
  region: string
  regionName: string
  city: string
  zip: string
  lat: string
  lon: string
  timezone: string
  isp: string
  org: string
  as: string
  query: string
}

export async function getIP(): Promise<TGeoLocation> {
  let ipAddress: { ip: string } = { ip: "" }
  let geoLocation: TGeoLocation = {
    status: "",
    country: "",
    countryCode: "",
    region: "",
    regionName: "",
    city: "",
    zip: "",
    lat: "",
    lon: "",
    timezone: "",
    isp: "",
    org: "",
    as: "",
    query: "",
  }

  const ipResponse = await fetch('https://api.ipify.org?format=json')
  if (ipResponse.ok) {
    ipAddress = await ipResponse.json()
    const geoResponse = await fetch(`http://ip-api.com/json/${ipAddress.ip}`)
    if (geoResponse.ok) {
      geoLocation = await geoResponse.json()
      console.log(geoLocation)
    }
  }

  return geoLocation

}