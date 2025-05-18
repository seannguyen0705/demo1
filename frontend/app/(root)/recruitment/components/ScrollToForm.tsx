'use client';

import { Button } from '@/components/ui/button';
import { Link as ScrollLink } from 'react-scroll';

export default function ScrollToForm() {
  return (
    <Button asChild size="lg" className="font-medium">
      <ScrollLink to="business-form" spy smooth offset={-100}>
        Đăng ký miễn phí
      </ScrollLink>
    </Button>
  );
}
