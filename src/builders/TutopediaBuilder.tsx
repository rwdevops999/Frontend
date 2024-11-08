import {
  ApplicationState,
  HeaderState,
  LayoutState,
  SettingsState,
  TutopediaState,
} from "../data/states";

/**
 * Builder for Tutopedia State
 *
 * {description: string, sender: string, routeURL: string, header: HeaderState, settings: SettingState, layout: LayoutState, application: ApplicationState}
 */
export class TutopediaBuilder {
  private count: number = 0;
  private description: string = "";
  private sender: string = "";
  private routeURL: string = "";
  private header: HeaderState | undefined;
  private settings: SettingsState | undefined;
  private layout: LayoutState | undefined;
  private application: ApplicationState | undefined;

  public setCount(count: number): void {
    this.count = count;
  }

  public getCount(): number {
    return this.count;
  }

  public setDescription(description: string) {
    this.description = description;
  }

  public setSender(sender: string) {
    this.sender = sender;
  }

  public setRouteURL(routeURL: string) {
    this.routeURL = routeURL;
  }

  public setHeader(header: HeaderState | undefined) {
    this.header = header;
  }

  public setSettings(settings: SettingsState) {
    this.settings = settings;
  }

  public setLayout(layout: LayoutState | undefined) {
    this.layout = layout;
  }

  public setApplication(application: ApplicationState | undefined) {
    this.application = application;
  }

  public build(): TutopediaState {
    return {
      count: this.count,
      description: this.description,
      sender: this.sender,
      routeURL: this.routeURL,
      header: this.header,
      settings: this.settings,
      layout: this.layout,
      application: this.application,
    };
  }
}
