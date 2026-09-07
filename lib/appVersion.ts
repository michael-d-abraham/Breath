import * as Application from "expo-application";
import Constants from "expo-constants";

export type AppVersionMetadata = {
  version: string;
  buildNumber: string | null;
  versionLine: string;
};

/** Version + build for Settings footer — sourced from app config / native install. */
export function getAppVersionMetadata(): AppVersionMetadata {
  const version =
    Constants.expoConfig?.version ??
    Application.nativeApplicationVersion ??
    "—";

  const buildNumber =
    Application.nativeBuildVersion ??
    Constants.expoConfig?.ios?.buildNumber ??
    Constants.expoConfig?.android?.versionCode?.toString() ??
    null;

  const versionLine = buildNumber
    ? `Version ${version} (${buildNumber})`
    : `Version ${version}`;

  return { version, buildNumber, versionLine };
}
