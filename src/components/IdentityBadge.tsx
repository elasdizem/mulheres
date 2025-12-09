import { Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IdentityBadgeProps {
  className?: string;
}

export const IdentityBadge = ({ className }: IdentityBadgeProps) => {
  return (
    <span className={cn('identity-badge', className)}>
      <Shield className="w-3 h-3" />
      Identidade Preservada
    </span>
  );
};
