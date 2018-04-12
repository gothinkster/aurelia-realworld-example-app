export function configure(config) {
  config.globalResources([
    './value-converters/date',
    './value-converters/format-html',
    './value-converters/keys',
  ]);
}
