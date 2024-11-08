import { renderRoute } from "../render/render";
import * as useServerConnectHook from "../../src/hooks/useServerConnect";
import { expectInDocumentByTestId, expectInDocumentByText } from "../testutils";

const useServerConnectSpy = vi.spyOn(useServerConnectHook, "useServerConnect");

describe("ServerCheckPage", () => {
  it("should render the loader", () => {
    renderRoute("/");
    expectInDocumentByTestId("SERVERCHECK_PAGE_LOADER");
  });

  it("should render `Connecting` if trying to connect", () => {
    useServerConnectSpy.mockReturnValue({
      connectionState: useServerConnectHook.ConnectionState.connecting,
    });

    renderRoute("/");

    expectInDocumentByText(/^Connecting$/);
  });

  it("should render `Connected` if connected", () => {
    useServerConnectSpy.mockReturnValue({
      connectionState: useServerConnectHook.ConnectionState.connected,
    });

    renderRoute("/");

    expectInDocumentByText(/^Connected$/);
  });

  it("should render `Error` if connecting failed", () => {
    useServerConnectSpy.mockReturnValue({
      connectionState: useServerConnectHook.ConnectionState.failed,
    });

    renderRoute("/");

    expectInDocumentByText(/^Error$/);
  });

  it("should render the retry button if connecting failed", () => {
    useServerConnectSpy.mockReturnValue({
      connectionState: useServerConnectHook.ConnectionState.failed,
    });

    renderRoute("/");

    expectInDocumentByText(/^Retry$/);
  });

  it("should render the to application button if connecting succeeded", () => {
    useServerConnectSpy.mockReturnValue({
      connectionState: useServerConnectHook.ConnectionState.connected,
    });

    renderRoute("/");

    expectInDocumentByText(/^To Application$/);
  });
});
