import { isAddress } from 'ethers/lib/utils';

export function shortenAddress(value: string | undefined, chars = 4): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (isAddress(value)) {
    return `${value.substring(0, chars + 2)}...${value.substring(42 - chars)}`;
  }

  const { length } = value;

  if (length <= chars * 2) {
    return value;
  }

  return `${value.substring(0, chars)}...${value.substring(length - chars)}`;
}
