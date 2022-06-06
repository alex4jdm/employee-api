export interface IMainInterface {
  bootstrap(appTag: string): Promise<void>;

  usePatches(): void;

  useInterceptors(): void;

  usePipes(): void;

  useModules(): void;

  useApiDoc(): void;

  useListeners(): void;
}
