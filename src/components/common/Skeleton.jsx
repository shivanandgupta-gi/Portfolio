import { memo } from 'react';

function Skeleton({ width = '100%', height = '20px', borderRadius = '8px', className = '' }) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{ width, height, borderRadius }}
    />
  );
}

export const SkeletonCard = memo(function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <Skeleton height="200px" borderRadius="16px 16px 0 0" />
      <div style={{ padding: '24px' }}>
        <Skeleton width="40%" height="12px" />
        <Skeleton width="70%" height="20px" className="skeleton-mt" />
        <Skeleton width="100%" height="14px" className="skeleton-mt" />
        <Skeleton width="100%" height="14px" />
        <Skeleton width="60%" height="14px" />
      </div>
    </div>
  );
});

export default Skeleton;
