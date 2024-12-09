import React from 'react';
import Link from 'next/link';
import { Box } from '@mui/material';
import PrivacyPolicy from '@/components/PrivacyPolicy';
import ShippingDeliveryPolicy from '@/components/ShippingDeliveryPolicy';
import TermConditionPolicy from '@/components/TermConditionPolicy';
import RefundReturnPolicy from '@/components/RefundReturnPolicy';
import WarrantyRegistration from '@/components/WarrantyRegistration';
import SupportTicket from '@/components/SupportTickets';
import TrackOrder from '@/components/TrackOrder';
import ContactUs from '@/components/Contact';

interface PolicyPageProps {
  params: { slug: string };
}

export default function PolicyPage({ params }: PolicyPageProps) {
  const { slug } = params;
  

  const renderPolicyComponent = (slug: string) => {
    switch (slug) {
    
      case 'warranty-registration':
        return <WarrantyRegistration />;
      case 'support-ticket':
        return <SupportTicket />;
      case 'track-order':
        return <TrackOrder />;
      case 'contact-us':
        return <ContactUs />;
      default:
        return <div>Policy not found.</div>;
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Box sx={{ marginBottom: '20px' }}>
        {renderPolicyComponent(slug)}
      </Box>
      <Box mt={4}>
        <Link href="/">Back to Home</Link>
      </Box>
    </Box>
  );
}
