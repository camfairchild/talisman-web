import { NFTCard } from '@components/recipes/NFTCard'
import styled from '@emotion/styled'
import { HiddenDetails } from '@talismn/ui'
import { device } from '@util/breakpoints'
import { ReactNode } from 'react'

const ListGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;

  > div:nth-last-child(-n + 3) {
    display: none;
  }

  @media ${device.md} {
    grid-template-columns: repeat(2, 1fr);
    > div:nth-last-child(-n + 1) {
      display: block;
    }
  }
  @media ${device.lg} {
    grid-template-columns: repeat(3, 1fr);
    > div:nth-last-child(-n + 2) {
      display: block;
    }
  }
  @media ${device.xl} {
    grid-template-columns: repeat(4, 1fr);
    > div:nth-last-child(n) {
      display: block;
    }
  }
`

const HiddenNFTGrid = ({ overlay }: { overlay?: ReactNode }) => {
  return (
    <HiddenDetails hidden={true} overlay={overlay}>
      <ListGrid
        css={{
          opacity: '40%',
        }}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <NFTCard key={index} isBlank />
        ))}
      </ListGrid>
    </HiddenDetails>
  )
}

export default HiddenNFTGrid
