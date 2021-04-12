import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const LABELS = {
    "on-sale": {
      content: "Sale",
      backgroundColor: COLORS.secondary,
      textDecoration: "line-through",
      color: COLORS.gray[500],
    },
    "new-release": {
      content: "Just Released!",
      backgroundColor: COLORS.primary,
    },
    default: {
      display: "none",
      textDecoration: "none",
    },
  };

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Label
            style={{ "--backgroundColor": LABELS[variant].backgroundColor }}
          >
            {LABELS[variant].content}
          </Label>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price
            style={{
              "--color": LABELS[variant].color,
              "--textDecoration": LABELS[variant].textDecoration,
            }}
          >
            {formatPrice(price)}
          </Price>{" "}
          {salePrice ? <SalePrice>{formatPrice(salePrice)}</SalePrice> : null}
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  width: 340px;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Label = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  font-size: 14px;
  font-family: Raleway;
  line-height: 16px;
  padding: 11px 7px 9px 9px;
  border-radius: 2px;
  background-color: var(--backgroundColor);
  color: white;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  position: relative;
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: var(--textDecoration);
  color: var(--color);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  position: absolute;
  left: 90%;
  top: 95%;
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
