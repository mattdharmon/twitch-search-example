import axios from 'axios'

let options = {}

// Setting all the options to be built from the server side.
if {process.SERVER_BUILD} {
  // The auth should be stored in the ENV to prevent accidental
  // upload of private creds.
  options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
  options.headers = {
    'Client-ID': process.env.CLIENT_ID || ''
  }
}

export default axios.create(options)
