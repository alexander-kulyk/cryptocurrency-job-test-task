import Image from "next/image";
import { classes } from "@/07.shared/lib";

export interface ITokenIconProps {
  src: string;
  symbol: string;
  size?: number;
  className?: string;
}

const TokenIcon: React.FC<ITokenIconProps> = ({
  src,
  symbol,
  size = 28,
  className,
}) => {
  return (
    <Image
      src={src}
      alt={symbol}
      width={size}
      height={size}
      className={classes("shrink-0 rounded-full object-cover", className)}
      unoptimized
    />
  );
};

export default TokenIcon;
