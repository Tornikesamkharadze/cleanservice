import React from "react";
import styled from "styled-components";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { PiInstagramLogoThin } from "react-icons/pi";

const SocialPages = () => {
  return (
    <Container>
      <div className="f">
        <SocialLink href="https://www.instagram.com" target="_blank">
          <InstagramIconWrapper>
            <PiInstagramLogoThin size={30} style={{ color: "white" }} />
          </InstagramIconWrapper>
        </SocialLink>
        <SocialLink
          href="https://www.facebook.com"
          target="_blank"
          style={{ color: "white" }}
        >
          <FacebookIconWrapper>
            <FaFacebook size={30} />
          </FacebookIconWrapper>
        </SocialLink>
        <SocialLink
          href="https://web.whatsapp.com/"
          target="_blank"
          style={{ color: "white" }}
        >
          <WhatsappIconWrapper>
            <FaWhatsapp size={30} />
          </WhatsappIconWrapper>
        </SocialLink>
      </div>
    </Container>
  );
};

const Container = styled.div`
  background-color: rgb(238, 238, 238);
  padding: 50px;
  display: flex;
  justify-content: center;

  .f {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1320px;
    width: 100%;
  }

  @media screen and (max-width: 899px) {
    .f {
      flex-direction: column;
      align-items: center;
    }
  }
`;

const SocialLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 244px;
  padding: 15px;
  margin: 10px; /* Added margin */
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const InstagramIconWrapper = styled(IconWrapper)`
  background: linear-gradient(135deg, #f9ce34, #ee2a7b, #6228d7);
`;

const FacebookIconWrapper = styled(IconWrapper)`
  background: linear-gradient(135deg, #3b5998, #8b9dc3);
`;

const WhatsappIconWrapper = styled(IconWrapper)`
  background: linear-gradient(135deg, #25d366, #128c7e);
`;

export default SocialPages;
