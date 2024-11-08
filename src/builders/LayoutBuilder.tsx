import { LayoutState } from "../data/states";

/**
 * Builder for Layout State
 *
 * {selectedPage: string, selectedView?: string}
 */
export class LayoutBuilder {
  private selectedPage: string = "";
  private selectedView?: string = undefined;

  public setSelectedPage(selectedPage: string) {
    this.selectedPage = selectedPage;
  }

  public setSelectedView(selectedView: string) {
    this.selectedView = selectedView;
  }

  public build(): LayoutState {
    return {
      selectedPage: this.selectedPage,
      selectedView: this.selectedView,
    };
  }
}
