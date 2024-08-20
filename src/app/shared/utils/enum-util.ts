export function getEnumAsString(stringEnum: string | number, enumType: any) {
  return enumType[stringEnum as keyof typeof enumType];
}
