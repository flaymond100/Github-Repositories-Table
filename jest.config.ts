import type { Config } from "@jest/types";

export default async (): Promise<Config.InitialOptions> => {
  return {
    preset: "ts-jest",
    verbose: true,
    clearMocks: true,
    collectCoverage: true,
    setupFilesAfterEnv: ["./config/setupTest.ts"],
    snapshotSerializers: ["./node_modules/enzyme-to-json/serializer"],
    transform: {
      "^.+\\.(ts|tsx)?$": "ts-jest",
    },
    transformIgnorePatterns: ["node_modules/(?!variables/.*)"],
    moduleNameMapper: {
      "^variables$": "variables/dist/cjs",
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
        "./__mocks__/fileMock.ts",
      "\\.(css|scss)$": "identity-obj-proxy",
    },
  };
};
