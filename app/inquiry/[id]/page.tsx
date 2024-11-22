import InquiryService from "@/src/api/services/inquiry.service";

export default function InquiryPage({ params }: { params: { id: string } }) {
  const inquiryId = params.id;

  return <InquiryService inquiryId={inquiryId} />;
}
