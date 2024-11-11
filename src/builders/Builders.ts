import {
  NavigationPageNames,
  NavigationViewNames,
  UndisplayedNavigationViewNames,
} from "../data/data";
import {
  ApplicationState,
  AuthState,
  HeaderState,
  LayoutState,
  TutopediaState,
} from "../data/states";
import { ApplicationBuilder } from "./ApplicationBuilder";
import { AuthBuilder } from "./AuthBuilder";
import { DataBuilder } from "./DataBuilder";
import { HeaderBuilder } from "./HeaderBuilder";
import { LayoutBuilder } from "./LayoutBuilder";
import { TutopediaBuilder } from "./TutopediaBuilder";

/**
 * Builders for diverse actions
 */
const buildTutopedia = (
  count: number,
  description: string,
  sender: string,
  routeURL: string,
  layout?: LayoutState,
  application?: ApplicationState,
  header?: HeaderState | undefined
) => {
  const topBuilder: TutopediaBuilder = new TutopediaBuilder();
  topBuilder.setCount(count);
  topBuilder.setDescription(description);
  topBuilder.setSender(sender);
  topBuilder.setRouteURL(routeURL);
  topBuilder.setLayout(layout);
  topBuilder.setApplication(application);
  topBuilder.setHeader(header);

  return topBuilder.build();
};

export const buildTutopediaForStartup = (
  count: number,
  description: string,
  sender: string,
  routeURL: string,
  user?: string,
  bucket?: string
): TutopediaState => {
  let headerBuilder = new HeaderBuilder();

  if (user) {
    headerBuilder.setUser(user);
  }

  if (bucket) {
    headerBuilder.setBucket(bucket);
  }

  return buildTutopedia(
    count,
    description,
    sender,
    routeURL,
    undefined,
    undefined,
    headerBuilder.build()
  );
};

export const buildTutopediaForServerCheckPage = (
  count: number,
  description: string,
  sender: string,
  routeURL: string,
  bucket?: string
): TutopediaState => {
  const appBuilder: ApplicationBuilder = new ApplicationBuilder();
  appBuilder.setApiURL("/find");

  const headerBuilder = new HeaderBuilder();
  if (bucket) {
    headerBuilder.setBucket(bucket);
  }

  const layoutBuilder: LayoutBuilder = new LayoutBuilder();
  layoutBuilder.setSelectedPage(NavigationPageNames.Home);
  layoutBuilder.setSelectedView(NavigationViewNames.All);

  return buildTutopedia(
    count,
    description,
    sender,
    routeURL,
    layoutBuilder.build(),
    appBuilder.build(),
    bucket ? headerBuilder.build() : undefined
  );
};

export const buildTutopediaForHome = (
  count: number,
  description: string,
  sender: string,
  routeURL: string,
  user?: string,
  bucket?: string
): TutopediaState => {
  const appBuilder: ApplicationBuilder = new ApplicationBuilder();
  appBuilder.setApiURL("/find");

  const layoutBuilder: LayoutBuilder = new LayoutBuilder();
  layoutBuilder.setSelectedPage(NavigationPageNames.Home);
  layoutBuilder.setSelectedView(NavigationViewNames.All);

  const headerBuilder: HeaderBuilder = new HeaderBuilder();
  if (user) {
    headerBuilder.setUser(user);
  }

  if (bucket) {
    headerBuilder.setBucket(bucket);
  }

  return buildTutopedia(
    count,
    description,
    sender,
    routeURL,
    layoutBuilder.build(),
    appBuilder.build(),
    headerBuilder.build()
  );
};

export const buildTutopediaForFindByKeyword = (
  count: number,
  description: string,
  sender: string,
  routeURL: string,
  keywords?: string[]
): TutopediaState => {
  const appBuilder: ApplicationBuilder = new ApplicationBuilder();
  appBuilder.setApiURL("/find/keywords/");

  if (keywords) {
    let dataBuilder: DataBuilder = new DataBuilder();

    dataBuilder.setKeywords(keywords);
    appBuilder.setData(dataBuilder.build());
  }

  const layoutBuilder: LayoutBuilder = new LayoutBuilder();
  layoutBuilder.setSelectedPage(NavigationPageNames.Find);

  return buildTutopedia(
    count,
    description,
    sender,
    routeURL,
    layoutBuilder.build(),
    appBuilder.build()
  );
};

export const buildTutopediaForCreate = (
  count: number,
  description: string,
  sender: string,
  routeURL: string,
  id?: number,
  reload?: boolean
): TutopediaState => {
  const dataBuilder: DataBuilder = new DataBuilder();
  dataBuilder.setUpdateMode(false);
  if (id) {
    dataBuilder.setUpdateMode(true);
    dataBuilder.setSearchId(id);
  }

  if (reload) {
    dataBuilder.setReload(reload);
  }

  const appBuilder: ApplicationBuilder = new ApplicationBuilder();
  appBuilder.setApiURL("/create");
  appBuilder.setData(dataBuilder.build());

  const layoutBuilder: LayoutBuilder = new LayoutBuilder();
  layoutBuilder.setSelectedPage(NavigationPageNames.Create);

  return buildTutopedia(
    count,
    description,
    sender,
    routeURL,
    layoutBuilder.build(),
    appBuilder.build()
  );
};

export const buildTutopediaForOCI = (
  count: number,
  description: string,
  sender: string,
  routeURL: string,
  bucketname?: string
): TutopediaState => {
  const appBuilder: ApplicationBuilder = new ApplicationBuilder();
  appBuilder.setApiURL("<<<unknown>>>");

  const headerBuilder: HeaderBuilder = new HeaderBuilder();
  if (bucketname) {
    headerBuilder.setBucket(bucketname);
  }

  const layoutBuilder: LayoutBuilder = new LayoutBuilder();
  layoutBuilder.setSelectedPage(NavigationPageNames.OCI);

  return buildTutopedia(
    count,
    description,
    sender,
    routeURL,
    layoutBuilder.build(),
    appBuilder.build(),
    bucketname ? headerBuilder.build() : undefined
  );
};

export const buildTutopediaForViewAllTutorials = (
  count: number,
  description: string,
  sender: string,
  routeURL: string,
  reload?: boolean | undefined
): TutopediaState => {
  const dataBuilder: DataBuilder = new DataBuilder();
  dataBuilder.setReset(true);

  if (reload) {
    console.log("[BUILDER] SET RELOAD");
    dataBuilder.setReload(reload);
  }

  const appBuilder: ApplicationBuilder = new ApplicationBuilder();
  appBuilder.setApiURL("/find");
  appBuilder.setData(dataBuilder.build());

  const layoutBuilder: LayoutBuilder = new LayoutBuilder();
  layoutBuilder.setSelectedPage(NavigationPageNames.Home);
  layoutBuilder.setSelectedView(NavigationViewNames.All);

  return buildTutopedia(
    count,
    description,
    sender,
    routeURL,
    layoutBuilder.build(),
    appBuilder.build()
  );
};

export const buildTutopediaForViewAllPublishedTutorials = (
  count: number,
  description: string,
  sender: string,
  routeURL: string,
  reload?: boolean | undefined
): TutopediaState => {
  const dataBuilder: DataBuilder = new DataBuilder();
  dataBuilder.setListMode(true);
  dataBuilder.setReset(true);

  if (reload) {
    console.log("[BUILDER] SET RELOAD");
    dataBuilder.setReload(reload);
  }

  const appBuilder: ApplicationBuilder = new ApplicationBuilder();
  appBuilder.setApiURL("/find/published");
  appBuilder.setData(dataBuilder.build());

  const layoutBuilder: LayoutBuilder = new LayoutBuilder();
  layoutBuilder.setSelectedPage(NavigationPageNames.Home);
  layoutBuilder.setSelectedView(NavigationViewNames.AllPub);

  return buildTutopedia(
    count,
    description,
    sender,
    routeURL,
    layoutBuilder.build(),
    appBuilder.build()
  );
};

export const buildTutopediaForViewAllNonPublishedTutorials = (
  count: number,
  description: string,
  sender: string,
  routeURL: string
): TutopediaState => {
  const dataBuilder: DataBuilder = new DataBuilder();
  dataBuilder.setListMode(false);
  dataBuilder.setReset(true);

  const appBuilder: ApplicationBuilder = new ApplicationBuilder();
  appBuilder.setApiURL("/find/published");
  appBuilder.setData(dataBuilder.build());

  const layoutBuilder: LayoutBuilder = new LayoutBuilder();
  layoutBuilder.setSelectedPage(NavigationPageNames.Home);
  layoutBuilder.setSelectedView(NavigationViewNames.NonPub);

  return buildTutopedia(
    count,
    description,
    sender,
    routeURL,
    layoutBuilder.build(),
    appBuilder.build()
  );
};

export const buildTutopediaForFindById = (
  count: number,
  description: string,
  sender: string,
  routeURL: string,
  tutorialId?: number
): TutopediaState => {
  const appBuilder: ApplicationBuilder = new ApplicationBuilder();
  appBuilder.setApiURL("/find");

  if (tutorialId) {
    const dataBuilder: DataBuilder = new DataBuilder();

    dataBuilder.setSearchId(tutorialId);
    appBuilder.setData(dataBuilder.build());
  }

  const layoutBuilder: LayoutBuilder = new LayoutBuilder();
  layoutBuilder.setSelectedPage(NavigationPageNames.Home);
  layoutBuilder.setSelectedView(UndisplayedNavigationViewNames.ById);

  return buildTutopedia(
    count,
    description,
    sender,
    routeURL,
    layoutBuilder.build(),
    appBuilder.build()
  );
};

export const buildTutopediaForDeleteAll = (
  count: number,
  description: string,
  sender: string,
  routeURL: string
): TutopediaState => {
  const appBuilder: ApplicationBuilder = new ApplicationBuilder();
  appBuilder.setApiURL("/find");

  const layoutBuilder: LayoutBuilder = new LayoutBuilder();
  layoutBuilder.setSelectedPage(NavigationPageNames.Home);
  layoutBuilder.setSelectedView(NavigationViewNames.All);

  return buildTutopedia(
    count,
    description,
    sender,
    routeURL,
    layoutBuilder.build(),
    appBuilder.build()
  );
};

export const buildTutopediaForPublishAll = (
  count: number,
  description: string,
  sender: string,
  routeURL: string
): TutopediaState => {
  const dataBuilder: DataBuilder = new DataBuilder();
  dataBuilder.setListMode(true);

  const appBuilder: ApplicationBuilder = new ApplicationBuilder();
  appBuilder.setApiURL("/find/published");
  appBuilder.setData(dataBuilder.build());

  const layoutBuilder: LayoutBuilder = new LayoutBuilder();
  layoutBuilder.setSelectedPage(NavigationPageNames.Home);
  layoutBuilder.setSelectedView(NavigationViewNames.AllPub);

  return buildTutopedia(
    count,
    description,
    sender,
    routeURL,
    layoutBuilder.build(),
    appBuilder.build()
  );
};

export const buildTutopediaForAdmin = (
  count: number,
  description: string,
  sender: string,
  routeURL: string,
  bucketname?: string
): TutopediaState => {
  const appBuilder: ApplicationBuilder = new ApplicationBuilder();
  appBuilder.setApiURL("<<<unknown>>>");

  const headerBuilder: HeaderBuilder = new HeaderBuilder();
  if (bucketname) {
    headerBuilder.setBucket(bucketname);
  }

  const layoutBuilder: LayoutBuilder = new LayoutBuilder();
  layoutBuilder.setSelectedPage(NavigationPageNames.OCI);

  return buildTutopedia(
    count,
    description,
    sender,
    routeURL,
    layoutBuilder.build(),
    appBuilder.build(),
    bucketname ? headerBuilder.build() : undefined
  );
};

export const buildAuth0 = (
  isAuthenticated: boolean,
  isLoading: boolean,
  user: string | undefined
): AuthState => {
  const authBuilder: AuthBuilder = new AuthBuilder();

  authBuilder.setIsAuthenticated(isAuthenticated);
  authBuilder.setIsLoading(isLoading);
  authBuilder.setUser(user);

  return authBuilder.build();
};

/**
 * This is for sending with navigate
 *
 * @param tstate Builds {state: {tutopedia: ...}}
 * @returns
 */
export const buildState = (tstate: TutopediaState): any => {
  let state = { state: { tutopedia: tstate } };
  return state;
};

/**
 * This is for setting location.state
 *
 * @param tstate
 * @returns
 */
export const buildStateWithoutStateKeyword = (tstate: TutopediaState): any => {
  let state = { tutopedia: tstate };
  return state;
};
