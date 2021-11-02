interface base {
  common:string | undefined | boolean
}

const baseApi:base = {
  common: import.meta.env.VITE_APP_API_BASE,
}
export default baseApi;