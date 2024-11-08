import { HeaderState } from "../data/states";

/**
 * Builder for Header State
 *
 * {selectedPage: string, selectedView?: string}
 */
export class HeaderBuilder {
  private user?: string;
  private bucket?: string;

  public setUser(user: string) {
    this.user = user;
  }

  public setBucket(bucket: string) {
    this.bucket = bucket;
  }

  public build(): HeaderState {
    return {
      user: this.user,
      bucket: this.bucket,
    };
  }
}
