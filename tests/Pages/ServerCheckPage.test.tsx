import { renderRoute } from "../render/render";
import * as useServerConnectHook from "../../src/hooks/useServerConnect";
import { expectInDocumentByTestId, expectInDocumentByText } from "../testutils";
import {
  ROUTE_TUTOPEDIA,
  TUTOPEDIA_CONTENT_SERVER_CHECK_PAGE_LOADER,
} from "../../src/data/layout/layout";

const useServerConnectSpy = vi.spyOn(useServerConnectHook, "useServerConnect");

describe("ServerCheckPage", () => {
  it("should render the loader", () => {
    renderRoute(`${ROUTE_TUTOPEDIA}`);
    expectInDocumentByTestId(`${TUTOPEDIA_CONTENT_SERVER_CHECK_PAGE_LOADER}`);
  });

  it("should render `Connecting` if trying to connect", () => {
    useServerConnectSpy.mockReturnValue({
      connectionState: useServerConnectHook.ConnectionState.connecting,
    });

    renderRoute(`${ROUTE_TUTOPEDIA}`);

    expectInDocumentByText(/^Connecting$/);
  });

  it("should render `Connected` if connected", () => {
    useServerConnectSpy.mockReturnValue({
      connectionState: useServerConnectHook.ConnectionState.connected,
    });

    renderRoute(`${ROUTE_TUTOPEDIA}`);

    expectInDocumentByText(/^Connected$/);
  });

  it("should render `Error` if connecting failed", () => {
    useServerConnectSpy.mockReturnValue({
      connectionState: useServerConnectHook.ConnectionState.failed,
    });

    renderRoute(`${ROUTE_TUTOPEDIA}`);

    expectInDocumentByText(/^Error$/);
  });

  it("should render the retry button if connecting failed", () => {
    useServerConnectSpy.mockReturnValue({
      connectionState: useServerConnectHook.ConnectionState.failed,
    });

    renderRoute(`${ROUTE_TUTOPEDIA}`);

    expectInDocumentByText(/^Retry$/);
  });

  it("should render the to application button if connecting succeeded", () => {
    useServerConnectSpy.mockReturnValue({
      connectionState: useServerConnectHook.ConnectionState.connected,
    });

    renderRoute(`${ROUTE_TUTOPEDIA}`);

    expectInDocumentByText(/^To Application$/);
  });
});
