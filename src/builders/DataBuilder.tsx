import { DataState } from "../data/states";

/**
 * Builder for Data State
 *
 * {searchId?: number, listMode?: string, updateMode?: boolean}
 */
export class DataBuilder {
  private searchId?: number;
  private listMode?: boolean;
  private updateMode?: boolean;
  private reload?: boolean;
  private keywords?: string[];
  private reset?: boolean;

  public setSearchId(id: number) {
    this.searchId = id;
  }

  public setListMode(mode: boolean) {
    this.listMode = mode;
  }

  public setUpdateMode(mode: boolean) {
    this.updateMode = mode;
  }

  public setReload(reload: boolean) {
    this.reload = reload;
  }

  public setKeywords(keywords: string[]) {
    this.keywords = keywords;
  }

  public setReset(reset: boolean) {
    this.reset = reset;
  }

  public build(): DataState {
    return {
      searchId: this.searchId,
      listMode: this.listMode,
      updateMode: this.updateMode,
      reload: this.reload,
      keywords: this.keywords,
      reset: this.reset,
    };
  }
}
