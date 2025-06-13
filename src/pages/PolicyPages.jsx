import React from "react";
import TermsAndPrivacy from "./TermsAndPrivacy";

import termsText from "../docs/terms";
import privacyText from "../docs/privacy";
import disclaimerText from "../docs/disclaimer";

export const TermsPage = () => (
  <TermsAndPrivacy title="Terms & Conditions" content={termsText} />
);

export const PrivacyPage = () => (
  <TermsAndPrivacy title="Privacy Policy" content={privacyText} />
);

export const DisclaimerPage = () => (
  <TermsAndPrivacy title="Disclaimer" content={disclaimerText} />
);
