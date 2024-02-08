import version1 from "./TermsAndConditions-1.0.0";
import version2, {PrivacyPolicy} from "./TermsAndConditions-2.0.0";

export default [
  {
    version: "1.0.0",
    terms: version1,
  },
  {
    version: "2.0.0",
    terms: version2,
    privacyPolicy: PrivacyPolicy,
  },
];
