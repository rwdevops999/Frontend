/**
 * Builder for Application State
 *
 * {apiURL: string, data: DataState}
 */
import { ApplicationState, DataState } from "../data/states";

export class ApplicationBuilder {
  private apiURL: string = "";
  private data: DataState | undefined;

  public setApiURL(apiURL: string) {
    this.apiURL = apiURL;
  }

  public setData(data: DataState) {
    this.data = data;
  }

  public build(): ApplicationState {
    return {
      apiURL: this.apiURL,
      data: this.data,
    };
  }
}
