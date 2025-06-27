"use client";

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share"; // Import social share buttons and icons

// Component for rendering social media share buttons for a given property
const ShareButtons = ({ property }) => {
  // Construct the full URL to share using the public domain and the property ID
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;

  return (
    <>
      {/* Section header */}
      <h3 className="text-xl font-bold text-center pt-2">
        Share This Property:
      </h3>

      {/* Container for share buttons, spaced and centered */}
      <div className="flex gap-3 justify-center pb-5">
        {/* Facebook share button with property name as quote and hashtag */}
        <FacebookShareButton
          url={shareUrl}
          quote={property.name}
          hashtag={`#${property.type.replace(/\s/g, "")}ForRent`}
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>

        {/* Twitter share button with title and hashtag */}
        <TwitterShareButton
          url={shareUrl}
          title={property.name}
          hashtags={[`${property.type.replace(/\s/g, "")}ForRent`]}
        >
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>

        {/* WhatsApp share button with custom separator */}
        <WhatsappShareButton
          url={shareUrl}
          title={property.name}
          separator=":: "
        >
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>

        {/* Email share button with subject and body content */}
        <EmailShareButton
          url={shareUrl}
          subject={property.name}
          body={`Check out this property listing: ${shareUrl}`}
        >
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
      </div>
    </>
  );
};

export default ShareButtons;
