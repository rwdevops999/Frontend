import { User } from "@auth0/auth0-react";
import { AuthState } from "../data/states";

/**
 * Builder for Data State
 *
 * {searchId?: number, listMode?: string, updateMode?: boolean}
 */
export class AuthBuilder {
  private isAuthenticated: boolean = false;
  private isLoading: boolean = false;
  private user: User | undefined;

  public setIsAuthenticated(authenticated: boolean) {
    this.isAuthenticated = authenticated;
  }

  public setIsLoading(mode: boolean) {
    this.isLoading = mode;
  }

  public setUser(user: string | undefined) {
    if (user) {
      this.user = new User();
      this.user.user = user;
    }
  }

  public build(): AuthState {
    return {
      isAuthenticated: this.isAuthenticated,
      isLoading: this.isLoading,
      user: this.user ? this.user : undefined,
    };
  }
}
