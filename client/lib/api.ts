import { FetchError, FetchOptions, SearchParams } from "ohmyfetch";
import { IncomingMessage } from "http";
export interface AuthConfig {
  fetchOptions: FetchOptions;
  req?: IncomingMessage;
  token: (key, value) => Number | string | null;
}

const authConfigDefaults: AuthConfig = {
  fetchOptions: {},
  req: undefined,
  token: undefined,
};

export default class Api {
  public config: AuthConfig;

  constructor(config: AuthConfig) {
    this.config = { ...authConfigDefaults, ...config };
  }

  private fetchOptions(params?: SearchParams, method = "GET"): FetchOptions {
    const fetchOptions = this.config.fetchOptions;
    const token = this.config.token("auth", "token");

    fetchOptions.headers = {
      Accept: "application/json",
    };
    token ? (fetchOptions.headers.Authorization = `Bearer ${token}`) : null;

    fetchOptions.method = method;
    delete this.config.fetchOptions.body;
    delete this.config.fetchOptions.params;
    if (params)
      if (method === "POST" || method === "PUT")
        this.config.fetchOptions.body = params;
      else this.config.fetchOptions.params = params;
    return this.config.fetchOptions;
  }

  public async index<Results>(
    endpoint: string
  ): Promise<api.MetApiResults & { data: Results }> {
    try {
      return await $fetch<api.MetApiResults & { data: Results }>(
        "http://localhost/api/admin/gallery"
      );
    } catch (error) {}
  }

  public async get<Result>(
    endpoint: string,
    params?: SearchParams
  ): Promise<api.MetApiResponse & { data: Result }> {
    try {
      return await $fetch<api.MetApiResponse & { data: Result }>(
        endpoint,
        this.fetchOptions(params)
      );
    } catch (error) {}
  }

  public async store<Result>(
    endpoint: string,
    params?: SearchParams
  ): Promise<api.MetApiResponse> {
    try {
      return await $fetch(endpoint, this.fetchOptions(params, "POST"));
    } catch (error) {
      console.log(error);
    }
  }
}
