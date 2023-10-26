import axios from "axios";

const axiosFest = axios.create({
    baseURL: "https://upfest.site",
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVwc2sxNDM3ODAxOSsyMDIzMDkwOUBpc2N0ZS1pdWwucHQiLCJpYXQiOjE2OTY4Njg5MDUsImV4cCI6MTcyODQwNDkwNX0.MycvgA666OFoa3u2K15jXSGSclikOfBEMFxtVa8D-go'
    },
})
export default axiosFest;