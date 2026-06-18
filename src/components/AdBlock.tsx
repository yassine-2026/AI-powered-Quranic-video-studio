import React from 'react';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';

interface AdBlockProps {
  format?: 'horizontal' | 'rectangle';
  className?: string;
}

export function AdBlock({ format = 'horizontal', className }: AdBlockProps) {
  const { t } = useTranslation();

  return (
    <div 
      className={cn(
        "bg-gray-50 border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm font-medium rounded-lg p-4 my-6",
        format === 'horizontal' ? "w-full h-[90px] md:h-[120px]" : "w-full max-w-[300px] h-[250px] mx-auto",
        className
      )}
    >
      <div className="text-center">
        <span className="block mb-1">{t('ad_space')}</span>
        <span className="text-xs opacity-70 cursor-help" title={t('ad_tooltip')}>
          [AdUnit: {format}]
        </span>
      </div>
    </div>
  );
}
