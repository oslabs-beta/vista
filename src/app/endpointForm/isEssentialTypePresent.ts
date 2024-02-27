export default function isEssentialTypePresent(
  types: any,
  essentialTypes: any,
) {
  return essentialTypes.every((essentialType: any) =>
    types.some((type: { name: any }) => type.name === essentialType),
  )
}
