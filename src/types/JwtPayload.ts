export interface JwtPayload {
    userId?: string;
    sub?: string;
    roles?: string[];
    iat?: number;
    exp?: number;
}
  